
import axios from 'axios';

const config = {
  timeout: 60000,
  withCredentials: true        // 访问线上api时axios发送跨域请求时需要设置这个参数
}

if(process.env.NODE_ENV === 'development') {
  // 开发环境
} else if(process.env.NODE_ENV === 'production') {
  // 生产环境
  config.baseURL = "https://c.y.qq.com";   //这里是线上api请求地址
}

export const server = axios.create(config);