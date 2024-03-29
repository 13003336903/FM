//官网配置： https://cli.vuejs.org/zh/config/#filenamehashing
var webpack = require('webpack');
const path = require('path');
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  //部署应用包时的基本URL，如果是生产环境，部署到 /cli-study/dist 路径；如果是开发环境，部署到根路径
  publicPath: !debug
    ? '/cli-study/dist'
    : '/',
  //输出文件路径
  outputDir: 'dist',
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的Vue构建版本，设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  runtimeCompiler: true,
  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],
  // 生产环境不需要sourceMap
  productionSourceMap: false,

  // 官网：https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
  // 更多配置参考：https://www.jb51.net/article/150844.htm
  configureWebpack: config => {
    Object.assign(config, { // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
    })
  },

  // webpack的链式操作，允许对内部的 webpack 配置进行更细粒度的修改
  // 参考： https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7
  chainWebpack: (config) => {
    if (debug) {
      // 本地开发配置
    }
    else {
      // 生产开发配置
    }
  },

  // css的相关配置
  css: {
  },
  //所有 webpack-dev-server 的选项都支持
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 3000,
    https: false,
    hotOnly: false,
    proxy: {
      '/album/': {
        target: "https://ma.rbc.cn/",
        changeOrigin: true
      },
      '/app/': {
        target: "https://ma.rbc.cn/",
        changeOrigin: true
      },
      '/radio/': {
        target: "https://ma.rbc.cn/",
        changeOrigin: true
      },
    }
  },

  pluginOptions: {},
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  }
}