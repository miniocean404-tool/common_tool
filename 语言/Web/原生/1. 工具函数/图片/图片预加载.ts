/**
 * 函数的作用就是提前预加载图片，在展示的时候可以直接显示，而不用等待图片加载
 * 浏览器并发限制最大就是 6，为了防止影响主页面加载，可以限制预加载图片的数量
 * @param images
 * @param max
 * @example
 * 例如：预加载后使用此方法加载图片会立即显示
 * ```js
 * const button = document.getElementById("load")
 *             button.onclick = () => {
 *                 images.forEach(src => {
 *                     const img = document.createElement("img")
 *                     img.src = src
 *                     document.body.appendChild(img)
 *                 })
 *             }
 * ```
 * 测试图片地址：
 * ```js
 * const images = [
 *  "https://picsum.photos/200",
 *  "https://picsum.photos/201",
 *  "https://picsum.photos/202",
 *  "https://picsum.photos/203",
 *  "https://picsum.photos/204",
 *  "https://picsum.photos/205",
 *  "https://picsum.photos/206",
 *  "https://picsum.photos/207",
 *  "https://picsum.photos/208",
 *  "https://picsum.photos/209",
 *  "https://picsum.photos/210",
 *  "https://picsum.photos/211",
 *  "https://picsum.photos/212",
 *  "https://picsum.photos/213",
 *  "https://picsum.photos/214",
 * ]
 * ```
 */
function preLoadImages(images: string[], max = 3) {
  let _images: string[] | null = [...images]

  const load = () => {
    const src = _images?.shift() || ""

    return new Promise((resolve, reject) => {
      const link = document.createElement("link")
      link.rel = "preload"
      // 表示链接元素要预加载的内容类型
      link.as = "image"
      link.href = src
      document.body.appendChild(link)
      link.onload = resolve
      link.onerror = reject

      setTimeout(reject, 10 * 1000)
      return
    })
  }

  function loadMax() {
    load().finally(() => {
      if (_images?.length) {
        loadMax()
      } else {
        _images = null
      }
    })
  }

  for (let i = 0; i < max; i++) {
    loadMax()
  }
}
