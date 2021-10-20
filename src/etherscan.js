import axios from 'axios'
import { ETHERSCAN_TOKEN } from '../private.js'
import { defaultRequestTimeout, ETHERSCAN_API } from './constants.js'

export const getBlockNumber = async () => {
  const timestamp = String(Date.now()).substring(0, 10)
  const {
    data: { result: number },
  } = await axios.get(
    `${ETHERSCAN_API}?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${ETHERSCAN_TOKEN}`,
    { timeout: defaultRequestTimeout },
  )
  if (!number) {
    throw new Error('Erro ao obter o blockNumber atual.')
  }
  return number
}

export const getBlock = async (number) => {
  const {
    data: { result: block },
  } = await axios.get(
    `${ETHERSCAN_API}?module=block&action=getblockreward&blockno=${number}&apikey=${ETHERSCAN_TOKEN}`,
    { timeout: defaultRequestTimeout },
  )
  return block
}
