import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  presets: [require.resolve('umi-presets-pro')],
  antd: {
    //开启该配置以修改界面主题
    configProvider: {},
    theme: {},
    // dark: true,
  },
  access: {},
  proxy: {
    '/proxy': {
      target: 'https://cn.bing.com',
      changeOrigin: true, // 避免 CORS 问题
      pathRewrite: { '^/proxy': '' }, // 将 /proxy 重写为根路径
      secure: false, // 使用 HTTP 而不是 HTTPS（因为 Bing 是 HTTPS）
    },
    '/api': {
      // 换成https，编辑器上传图片功能就报错
      target: 'http://47.97.220.175:8081',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
      secure: true,
    },
    '/ai': {
      target: 'https://spark-api-open.xf-yun.com',
      changeOrigin: true,
      pathRewrite: { '^/ai': '' },
      secure: false,
    },
  },
  model: {},
  initialState: {},

  //构建时配置，''直接拿到后端返回的最原始的数据。https://umijs.org/docs/max/request
  request: { dataField: '' },
  dva: {},
  esbuildMinifyIIFE: true,
  layout: {
    title: '博客',
  },
  analytics: {
    ga_v2: 'G-abcdefg', // google analytics 的 key (GA 4)
    baidu: 'baidu_tongji_key',
  },
  routes,
  npmClient: 'npm',
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'http://127.0.0.1:8081/api/v3/api-docs',
    },
  ],
});
