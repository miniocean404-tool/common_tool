export const resp = {
  success: <T>(data: T, message: string = "成功") => ({ code: 200, data, message }),
  successMsg: (message: string = "成功") => ({ code: 200, data: null, message }),
  fail: (code: number, message: string = "失败") => ({ code, data: null, message }),
  failMsg: (message: string) => ({ code: 400, data: null, message }),
}
