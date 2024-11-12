/**
 * base64 加密
 * @param str
 * @returns
 */
export function base64EncodeUnicode(str: string) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode(Number("0x" + p1))
    }),
  )
}

/**
 * base64 解密
 * @param str
 * @returns
 */
export function base64DecodeUnicode(str: string) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join(""),
  )
}
