//app.js
App({
  onLaunch: function () {
    var that = this

    // 微信登录
    wx.login({
      // 微信登录成功
      success: function(wxloginres){
        // 拿code到菠萝服务器换取u_id
        console.log('拿code到菠萝服务器换取u_id')
        if (wxloginres.code){
          wx.request({
            url: that.globalData.boloUrl + 'member/login',
            method: 'GET',
            data: {
              'code': wxloginres.code
            },
            success: function(bolouidres){
              // 如果拿到u_id了就写入缓存
              console.log('拿code到菠萝服务器换取u_id - OK')
              if (bolouidres.data.u_id){
                that.globalData.u_id = bolouidres.data.u_id
              }
            }
          })
        }

        // 到微信服务器取用户信息
        wx.getUserInfo({
          success: function(wxUserInfoRes){
            that.globalData.userInfo = wxUserInfoRes.userInfo
          }
        })
      }
    })
  },

  globalData: {
    boloUrl: 'https://boluogedou.com/api/',
    u_id: null,
    userInfo: null
  }
})
