// 字符串必须添加 xmlns="http://www.w3.org/2000/svg"
const svg = `<svg style="background-color:#fff;" xmlns="http://www.w3.org/2000/svg" height="144" width="144"><path d="m71.05 23.68c-26.06 0-47.27 21.22-47.27 47.27s21.22 47.27 47.27 47.27 47.27-21.22 47.27-47.27-21.22-47.27-47.27-47.27zm-.07 4.2a3.1 3.11 0 0 1 3.02 3.11 3.11 3.11 0 0 1 -6.22 0 3.11 3.11 0 0 1 3.2-3.11zm7.12 5.12a38.27 38.27 0 0 1 26.2 18.66l-3.67 8.28c-.63 1.43.02 3.11 1.44 3.75l7.06 3.13a38.27 38.27 0 0 1 .08 6.64h-3.93c-.39 0-.55.26-.55.64v1.8c0 4.24-2.39 5.17-4.49 5.4-2 .23-4.21-.84-4.49-2.06-1.18-6.63-3.14-8.04-6.24-10.49 3.85-2.44 7.85-6.05 7.85-10.87 0-5.21-3.57-8.49-6-10.1-3.42-2.25-7.2-2.7-8.22-2.7h-40.6a38.27 38.27 0 0 1 21.41-12.08l4.79 5.02c1.08 1.13 2.87 1.18 4 .09zm-44.2 23.02a3.11 3.11 0 0 1 3.02 3.11 3.11 3.11 0 0 1 -6.22 0 3.11 3.11 0 0 1 3.2-3.11zm74.15.14a3.11 3.11 0 0 1 3.02 3.11 3.11 3.11 0 0 1 -6.22 0 3.11 3.11 0 0 1 3.2-3.11zm-68.29.5h5.42v24.44h-10.94a38.27 38.27 0 0 1 -1.24-14.61l6.7-2.98c1.43-.64 2.08-2.31 1.44-3.74zm22.62.26h12.91c.67 0 4.71.77 4.71 3.8 0 2.51-3.1 3.41-5.65 3.41h-11.98zm0 17.56h9.89c.9 0 4.83.26 6.08 5.28.39 1.54 1.26 6.56 1.85 8.17.59 1.8 2.98 5.4 5.53 5.4h16.14a38.27 38.27 0 0 1 -3.54 4.1l-6.57-1.41c-1.53-.33-3.04.65-3.37 2.18l-1.56 7.28a38.27 38.27 0 0 1 -31.91-.15l-1.56-7.28c-.33-1.53-1.83-2.51-3.36-2.18l-6.43 1.38a38.27 38.27 0 0 1 -3.32-3.92h31.27c.35 0 .59-.06.59-.39v-11.06c0-.32-.24-.39-.59-.39h-9.15zm-14.43 25.33a3.11 3.11 0 0 1 3.02 3.11 3.11 3.11 0 0 1 -6.22 0 3.11 3.11 0 0 1 3.2-3.11zm46.05.14a3.11 3.11 0 0 1 3.02 3.11 3.11 3.11 0 0 1 -6.22 0 3.11 3.11 0 0 1 3.2-3.11z"/><path d="m115.68 70.95a44.63 44.63 0 0 1 -44.63 44.63 44.63 44.63 0 0 1 -44.63-44.63 44.63 44.63 0 0 1 44.63-44.63 44.63 44.63 0 0 1 44.63 44.63zm-.84-4.31 6.96 4.31-6.96 4.31 5.98 5.59-7.66 2.87 4.78 6.65-8.09 1.32 3.4 7.46-8.19-.29 1.88 7.98-7.98-1.88.29 8.19-7.46-3.4-1.32 8.09-6.65-4.78-2.87 7.66-5.59-5.98-4.31 6.96-4.31-6.96-5.59 5.98-2.87-7.66-6.65 4.78-1.32-8.09-7.46 3.4.29-8.19-7.98 1.88 1.88-7.98-8.19.29 3.4-7.46-8.09-1.32 4.78-6.65-7.66-2.87 5.98-5.59-6.96-4.31 6.96-4.31-5.98-5.59 7.66-2.87-4.78-6.65 8.09-1.32-3.4-7.46 8.19.29-1.88-7.98 7.98 1.88-.29-8.19 7.46 3.4 1.32-8.09 6.65 4.78 2.87-7.66 5.59 5.98 4.31-6.96 4.31 6.96 5.59-5.98 2.87 7.66 6.65-4.78 1.32 8.09 7.46-3.4-.29 8.19 7.98-1.88-1.88 7.98 8.19-.29-3.4 7.46 8.09 1.32-4.78 6.65 7.66 2.87z" fill-rule="evenodd" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/></svg>`

await svg2png({ svg, scale: 10, filename: "rust" })

async function svg2png({ svg, scale, filename }) {
  const utf8 = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  const base64 = `data:image/svg+xml;base64,${window.btoa(encodeURIComponent(svg))}`

  const image = await svgRender2Image({ src: utf8 })
  const base64Url = image2CanvasPngBase64(image, scale)
  download(filename, base64Url)
}

// 将 svg 渲染到图片上
function svgRender2Image({ src, crossOrigin }) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    if (crossOrigin) {
      image.setAttribute("crossorigin", "anonymous") // 允许跨域
    }

    image.src = src
    image.onload = function () {
      resolve(image)
    }
  })
}

// 下载图片
function downloadImage(filename, url) {
  const image = new Image()
  image.src = url
  image.onload = function () {
    const base64 = image2CanvasPngBase64(image, 1)
    download(filename, base64)
  }
}

// 将图片放大后转为 canvas base64 图片
function image2CanvasPngBase64(image, scale = 1) {
  scale = window.devicePixelRatio * scale

  const canvas = document.createElement("canvas")
  canvas.width = image.width * scale
  canvas.height = image.height * scale

  const ctx = canvas.getContext("2d")
  ctx?.scale(scale, scale)

  ctx && ctx.drawImage(image, 0, 0, image.width, image.height)
  return canvas.toDataURL("image/png")
}

function download(filename, url) {
  const a = document.createElement("a")
  a.href = url
  a.download = `${filename}.png`
  a.click()
}

// 只适合设置了跨域或本地图片
export const getURLImageBase64 = (src, cb) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = `${src}?${Math.random()}` // 处理缓存
    img.crossOrigin = "anonymous" // 支持跨域图片

    img.onload = function () {
      const base64 = image2CanvasPngBase64(img, 1)
      resolve(base64)
    }
  })
}
