/**
 * 将数组中的所有数，根据最大值最小值，归一化为 min 到 max 之间
 * @param target
 * @param min
 * @param max
 * @returns
 */
function normalizeArrs(target: number[], min = -1, max = 1) {
  let arrMax = Math.max(...target)
  let arrMin = Math.min(...target)

  arrMax = arrMax > Math.abs(arrMin) ? arrMax : Math.abs(arrMin)
  arrMin = -arrMax

  return target.map((t) => {
    return ((max - min) * (t - arrMin)) / (arrMax - arrMin) + min
  })
}

/**
 * 将数组的范围的值（两个值）归一化
 * @param arr
 * @returns
 */
export function normalizeDouble(arr: [number, number]) {
  let num = 0

  for (let i = 0; i < arr.length; i++) {
    num += arr[i] * arr[i]
  }

  const middle = Math.sqrt(num)

  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] / middle
  }

  return arr
}
