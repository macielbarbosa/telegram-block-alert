export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const formatReward = (number) => (number / Math.pow(10, 18)).toFixed(3)

const formatTimeProperty = (property) => (property < 10 ? '0' + property : property)

export const currentTime = () => {
  const date = new Date()
  return `${formatTimeProperty(date.getHours())}:${formatTimeProperty(date.getMinutes())}:${formatTimeProperty(
    date.getSeconds(),
  )}`
}
