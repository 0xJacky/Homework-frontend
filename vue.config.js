const webpack = require('webpack')

module.exports = {
    pages: {
        surface: {
            // pages 的入口
            entry: 'src/pages/surface/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Homework',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'surface']
        },
        student: {
            entry: 'src/pages/student/main.js',
            template: 'public/index.html',
            filename: 'student.html',
            title: 'Homework | 学生',
            chunks: ['chunk-vendors', 'chunk-common', 'student']
        },
        teacher: {
            entry: 'src/pages/teacher/main.js',
            template: 'public/index.html',
            filename: 'teacher.html',
            title: 'Homework | 教师',
            chunks: ['chunk-vendors', 'chunk-common', 'teacher']
        },
        admin: {
            entry: 'src/pages/admin/main.js',
            template: 'public/index.html',
            filename: 'admin.html',
            title: 'Homework | 管理系统',
            chunks: ['chunk-vendors', 'chunk-common', 'admin']
        }
    },
    devServer: {
        proxy: {
            '/download': {
                target: 'https://homework.jackyu.cn/',
                changeOrigin: true,
                pathRewrite: {
                    '^/download': '/'
                }
            },
            '': {
                target: 'https://homework.jackyu.cn/api'
            }
        }
    },

    productionSourceMap: false,

    css: {
        loaderOptions: {
            css: {},
            postcss: {},
            less: {
                javascriptEnabled: true
            },
            scss: {}
        },
        extract: false
    },

    configureWebpack: config => {
        config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
        if (process.env.NODE_ENV === 'production') {
            config.performance = {
                hints: 'warning',
                // 入口起点的最大体积
                maxEntrypointSize: 50000000,
                // 生成文件的最大体积
                maxAssetSize: 30000000,
                // 只给出 js 文件的性能提示
                assetFilter: function (assetFilename) {
                    return assetFilename.endsWith('.js')
                }
            }
        }
    },

    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => {
                options.compiler = require('vue-template-babel-compiler')
                return options
            })
    }
}
