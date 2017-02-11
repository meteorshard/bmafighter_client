//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    u_id: null
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 用户点击扫码
  bindUserScan: function () {
    wx.navigateTo({
      url: '../userscan/userscan'
    })
  },

  // 管理员扫码
  bindAdminScan: function () {
    wx.navigateTo({
      url: '../adminscan/adminscan'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      typeof userInfo == "number" && that.setData({
        u_id: userInfo
      })

      if (typeof userInfo == "object") {
        that.setData({
          userInfo:userInfo
        })

        // 更新服务器上的用户信息
        wx.request({
          url: 'https://boluogedou.com/api/member/',
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          data: {
            'u_id': that.data.u_id,
            'nickname': that.data.userInfo.nickName,
            'sex': that.data.userInfo.gender
          },
          success: function(){
            console.log('update success')
          }
        })
      }
    })
  }
})
