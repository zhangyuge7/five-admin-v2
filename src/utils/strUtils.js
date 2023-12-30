/**
 * 字符串通配符匹配校验
 *
 * ? 字符匹配任何单个字符。
 * * 字符匹配任何字符序列。
 * match('h*lo','hello')
 * @param {*} first
 * @param {*} second
 * @returns boolean
 */
export function match(first, second) {
  if (first.length === 0 && second.length === 0)
    return true

  if (first.length === second.length) {
    let s = ''
    for (let i = 0; i < first.length; i++)
      s = `${s}?`
    if (first === s)
      return true
  }
  if (first.length > 1 && first[0] === '*'
        && second.length === 0)
    return false

  if ((first.length > 1 && first[0] === '?')
        || (first.length !== 0 && second.length !== 0
            && first[0] === second[0])) {
    return match(first.substring(1),
      second.substring(1))
  }

  if (first.length > 0 && first[0] === '*') {
    return match(first.substring(1), second)
            || match(first, second.substring(1))
  }

  return false
}
