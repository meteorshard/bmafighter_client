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

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      typeof userInfo == "number" && that.setData({
        u_id: userInfo
      })
      typeof userInfo == "object" && that.setData({
        userInfo:userInfo
      })
    })
  }
})
