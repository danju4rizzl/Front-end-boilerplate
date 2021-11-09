// Fisher-Yates algorithm https://stackoverflow.com/a/2450976/3473971
export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function replaceItemAtIndex<T>(
  arr: Array<T>,
  index: number,
  newValue: T,
): Array<T> {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
