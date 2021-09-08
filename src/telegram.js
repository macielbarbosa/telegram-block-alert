import axios from 'axios'
import {
  TELEGRAM_ENGLISH_CHAT_ID,
  TELEGRAM_PORTUGUESE_CHAT_ID,
  TELEGRAM_INFORMATION_CHAT_ID,
  TELEGRAM_SPANISH_CHAT_ID,
} from '../private.js'
import { URL_TELEGRAM_SEND_MESSAGE } from './constants.js'
import { enumLanguage, strings } from './strings.js'

export const sendMessage = async (text, chat_id) => {
  try {
    await axios.post(URL_TELEGRAM_SEND_MESSAGE, {
      chat_id,
      text,
      parse_mode: 'HTML',
    })
  } catch (error) {
    console.warn('Telegram - Falha ao enviar mensagem. chat_id =', chat_id)
    throw error
  }
}

const messageBlock = ({ number, reward, isUncle }, language) =>
  `🎉 <b>${strings[isUncle ? 'newUncle' : 'newBlock'][language]} 🎉</b>

🔷 ${strings.block[language]}: <a href='https://etherscan.io/block/${number}'>${number}</a>
💰 ${strings.reward[language]}: <b>${reward}</b> ETH`

export const alertBlock = async (block) => {
  const englishNewBlockMessage = messageBlock(block, enumLanguage.en)
  const portugueseNewBlockMessage = messageBlock(block, enumLanguage.pt)
  const spanishNewBlockMessage = messageBlock(block, enumLanguage.sp)
  await sendMessage(englishNewBlockMessage, TELEGRAM_ENGLISH_CHAT_ID)
  await sendMessage(portugueseNewBlockMessage, TELEGRAM_PORTUGUESE_CHAT_ID)
  await sendMessage(portugueseNewBlockMessage, TELEGRAM_INFORMATION_CHAT_ID)
  await sendMessage(spanishNewBlockMessage, TELEGRAM_SPANISH_CHAT_ID)
}
