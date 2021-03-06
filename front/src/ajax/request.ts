// 重写axios
import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosPromise,
} from "axios";
import { message as messageAlert } from "antd";

export interface ResponseData {
  code: 0 | 1 | -1;
  message: string;
  data: any;
}

class HttpRequest {
  // 合并配置项
  private mergeConfig(...configs: AxiosRequestConfig[]): AxiosRequestConfig {
    return Object.assign({}, ...configs);
  }

  // 设置get请求别名
  public get(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    const newConfig = this.mergeConfig(config, { url, data, method: "GET" });
    return this.request(newConfig);
  }

  // 设置post请求别名
  public post(
    url: string,
    params: any = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    const newConfig = this.mergeConfig(config, { url, params, method: "POST" });
    console.log(newConfig);
    return this.request(newConfig);
  }

  // 构建请求
  public request(config: AxiosRequestConfig): AxiosPromise {
    // 1.创建请求
    const instance: AxiosInstance = axios.create();
    // 2.添加拦截
    this.interceptor(instance);
    // 3.发送请求
    return instance(config);
  }

  // 添加拦截
  private interceptor(instance: AxiosInstance) {
    // 拦截请求
    instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const encryptToken: string | null = localStorage.getItem("LOGIN_TOKEN");
        // 添加token校验
        if (encryptToken) config.headers["auth-token"] = encryptToken;

        config.baseURL = "http://localhost:3000";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 拦截响应
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const {
          data: { code, message },
        } = response;
        if (code === 0) {
          //成功
        } else {
          // 失败
          //UI提示用户请求失败
          messageAlert.error(message, 0.5);
        }
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

export default HttpRequest;
