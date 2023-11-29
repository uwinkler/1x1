export function shuffle<T>(array: T[]) {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = shuffledArray[i]
    shuffledArray[i] = shuffledArray[j]
    shuffledArray[j] = temp
  }
  return shuffledArray
}

export function randomNumbers({
  startWith = [],
  length = 5
}: { startWith?: number[]; length?: number; max?: number } = {}) {
  const randomNumbers: number[] = [...startWith]
  while (randomNumbers.length < length) {
    const randomNumber = Math.floor(Math.random() * 10 + 1)
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber)
    }
  }
  return randomNumbers
}
