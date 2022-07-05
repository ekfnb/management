export const URL = 'http://192.168.1.4:3009'
//定义计算请求数据
// let ajaxTimec = 0;
export const request=(params)=>{
  //判断url中是否有/my/的私有请求路径，有带上请求头
  let header = {...params.header};
  if(params.url.includes("/my/")){
    header["Authorization"] = wx.getStorageSync('token')
  }
  // ajaxTimec++;
  //显示加载中的效果
  // wx.showLoading({
  //   title: '加载中',
  //   mask:true
  // });
  //定义公共的url
  const baseUrl = URL;
  return new Promise((resolve,reject) => {
    wx.request({
      ...params,
      header:header,
      url:baseUrl+params.url,
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        // ajaxTimec--;
        // if(ajaxTimec === 0){
        //   //关闭等待图标
        //   wx.hideLoading({
        //     noConflict:false,
        //     success:function(){},
        //     fail:function(){},
        //     complete:function(){}
        //   })
        // }
      }
    });
  })
}