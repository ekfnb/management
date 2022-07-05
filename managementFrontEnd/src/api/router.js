import $ from 'jquery'
export const Url = "http://192.168.43.107:3009"
export const ajax=(params)=>{
    //判断url中是否有/my/的私有请求路径，有带上请求头
    let headers = {...params.headers};
    if(params.url.includes("/my/")){
        headers["Authorization"] = sessionStorage.getItem("token")
    }
    //定义公共的url
    const baseUrl = Url;
    return new Promise((resolve,reject) => {
        $.ajax({
            ...params,
            headers:headers,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
        });
    })
}
