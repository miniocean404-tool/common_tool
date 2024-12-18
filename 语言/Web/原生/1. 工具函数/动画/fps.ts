// 文章：https://juejin.cn/post/7447341630489886729?share_token=c3c6c7b1-db70-41cb-9eaa-2e6b7bd4f415
export type ICallBack = (currentFps?: number) => void

/**
 * 计算 n 秒内的平均帧率
 * @param n
 * @returns
 * @example
 * 调用函数，例如计算 5 秒的平均 FPS:
 * calculateAverageFps(5)
 */
export const calculateAverageFps = (n = 5) => {
  let _res: (value: any) => void
  const p = new Promise((resolve) => {
    _res = resolve
  })
  let frames = 0
  const startTime = performance.now()
  function rafLoop() {
    frames += 1
    if (performance.now() - startTime < n * 1000) {
      requestAnimationFrame(rafLoop)
    } else {
      const elapsed = (performance.now() - startTime) / 1000
      const fps = Math.round(frames / elapsed)
      _res(fps)
    }
  }
  requestAnimationFrame(rafLoop)
  return p
}

/**
 * 帧率限制
 * @returns
 */
export const fpsLimiter = () => {
  /**
   * 以预期的帧率执行回调
   * @param cb
   * @param fps
   * @returns
   */
  const startExpectFps = (cb: ICallBack, fps: number) => {
    let stop = false
    let rafId = 0
    let frameCount = 0
    const fpsInterval = 1000 / fps
    let now = 0
    let then = Date.now()
    const startTime = then
    let delta
    let currentFps

    function loop() {
      if (stop) {
        return
      }
      rafId = requestAnimationFrame(loop)
      now = Date.now()
      delta = now - then
      if (delta > fpsInterval) {
        then = now - (delta % fpsInterval)
        if (cb) {
          const sinceStart = now - startTime
          currentFps = Math.round((1000 / (sinceStart / ++frameCount)) * 100) / 100
          cb(currentFps)
        }
      }
    }

    const stopFps = () => {
      stop = true
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
    loop()

    return stopFps
  }

  /**
   * 以系统的帧率执行回调
   * @param cb
   * @returns
   */
  const startSysFps = (cb: ICallBack) => {
    let stop = false
    let rafId = 0

    const loop = async () => {
      if (stop) {
        return
      }
      rafId = requestAnimationFrame(loop)
      cb && cb()
    }

    const stopFps = () => {
      stop = true
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
    loop()
    return stopFps
  }

  /***
   * raf 控制 requestAnimationFrame 执行频率 = Min (系统，60)
   * 为了兼容部分帧率为 120fps 的系统
   */
  const raf = async (cb: ICallBack) => {
    const expFps = 60
    return calculateAverageFps().then((sysFps: any) => {
      if (sysFps > expFps) {
        return startExpectFps(cb, expFps)
      } else {
        return startSysFps(cb)
      }
    })
  }

  return { raf, startExpectFps, startSysFps }
}
