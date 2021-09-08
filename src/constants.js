import { TELEGRAM_BOT_TOKEN } from '../private.js'

const URL_TELEGRAM_BASE = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`
export const URL_TELEGRAM_SEND_MESSAGE = URL_TELEGRAM_BASE + '/sendMessage'
export const URL_TELEGRAM_GET_UPDATES = URL_TELEGRAM_BASE + '/getUpdates'

export const ETHERSCAN_API = 'https://api.etherscan.io/api'
