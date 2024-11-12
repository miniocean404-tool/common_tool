/**
 * 设计模式：单例模式
 * @param fn
 * @returns
 * @example
 * ```ts
 * // 传入任意函数得到一个可以获取这个函数 单例对象 的函数，使用 instance(params)
 * const instance = getInstanceWrapper(() => {})
 * ```
 * @example
 * ```ts
 * // ESM 默认导出其他地方导入也是单例
 * export default {}
 * ```
 */
export const getInstanceWrapper = <T extends (...args: any) => any>(fn: Function) => {
  let instance: ReturnType<T>

  return function (this: any, ...res: Parameters<T>): ReturnType<T> {
    if (!instance) instance = fn.apply(this, res)
    return instance
  }
}
