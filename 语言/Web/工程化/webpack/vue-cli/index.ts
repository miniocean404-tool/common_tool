import path from "path"

// https://github.com/nuxt/nuxt/issues/9223
// nuxt2 只需要添加 build 下的 transpile,在 transpile 中添加需要处理的 esModule 的包即可
// vue 添加 babel-loader 处理 es 文件
function add_babel(config: any) {
  const esLIbs = [({ isClient }) => isClient && "@svgdotjs/svg.js","change-case"]

  config.module.rules.push({
    test: /\.m?jsx?$/i,
    include: esLIbs.map((lib) => path.resolve(__dirname, "node_modules", lib)),
    use: [
      {
        loader: "babel-loader",
        options: {
          babelrc: false,
          presets: [["@babel/preset-env"]],
        },
      },
    ],
  })
}
