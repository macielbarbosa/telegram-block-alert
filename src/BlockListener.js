import { getBlock } from './etherscan.js'
import { DiscordBot } from './discord.js'
import * as Telegram from './telegram.js'
import { currentTime, formatReward } from './utils.js'

export class BlockListener {
  constructor(number, wallet) {
    this.number = number
    this.wallet = wallet
  }

  checkNextBlock = async () => {
    try {
      const block = await getBlock(this.number)
      if (!block.blockNumber) return
      console.log(`${currentTime()} - ${block.blockNumber}`)
      this.number++
      const { blockMiner, blockNumber, blockReward } = block
      if (blockMiner === this.wallet) {
        console.log('Novo bloco:', block)
        this.alert({ number: blockNumber, reward: formatReward(blockReward) })
      }
      const uncle = block.uncles.find(({ miner }) => miner === this.wallet)
      if (uncle) {
        console.log('Novo uncle:', block)
        this.alert({ number: blockNumber, reward: formatReward(uncle.blockreward), isUncle: true })
      }
    } catch (_) {
      console.warn('Erro ao verificar o bloco')
    }
  }

  alert = async (block) => {
    await Telegram.alertBlock(block)
    await DiscordBot.alertBlock(block)
  }
}
