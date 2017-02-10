//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (loginres) {
          // 登录到菠萝服务器
          wx.request({
            url: 'https://boluogedou.com/api/member/login',
            method: 'GET',  
            data: {
              'code': loginres.code
            },
            success: function (bolores) {
              that.globalData.u_id = bolores.data.u_id
              typeof cb == "function" && cb(that.globalData.u_id)
            }
          })
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    u_id:null
  }
})
