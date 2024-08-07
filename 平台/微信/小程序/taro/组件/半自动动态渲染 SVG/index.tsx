// https://juejin.cn/post/7347905080508678171?searchId=2024070913523997E50509D73E5C77BF1F
// https://juejin.cn/post/6989620511579832328?searchId=202407091457485DCBA6CC351C3C889F7A

// TextEncoder 垫片
import "fastestsmallesttextencoderdecoder"
// import * as encoding from "text-encoding";

import Taro from "@tarojs/taro"
import { renderToString } from "react-dom/server"
import "@tarojs/taro/html5.css"

// 1. 使用：Component2SVGBase64(<ManualAddressIcon fill={fileColor}></ManualAddressIcon>)
// 2. 开发环境需要打开 mini.debugReact，生产环境不需要
export const Component2SVGBase64 = (Component: JSX.Element) => {
  return stringToBase64(renderToString(Component))
}

function base64ToString(base64: string) {
  base64 = base64.replace("data:image/svg+xml;base64,", "")
  const buffer = Taro.base64ToArrayBuffer(base64)

  return new TextDecoder().decode(buffer)
}

function stringToBase64(html: string) {
  const arrayBuffer = new TextEncoder().encode(html)
  const base64 = Taro.arrayBufferToBase64(arrayBuffer)

  // 构造 data:image/svg+xml 格式的 URL
  return `data:image/svg+xml;base64,${base64}`
}
