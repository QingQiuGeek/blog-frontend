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
    '/api': {
      // 换成https，编辑器上传图片功能就报错
      target: 'http://127.0.0.1:8081',
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
      schemaPath: 'http://47.97.220.175:8081/api/v2/api-docs',
    },
  ],
});
