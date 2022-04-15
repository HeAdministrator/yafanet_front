import axios from "axios";

const service = axios.create({

    //url = base URL + request url
    baseURL : "http://127.0.0.1:8089",
    //baseURL : "http://api.yafanet.cn",

    //配置请求超时时间
    timeout : 500000

})

export default service