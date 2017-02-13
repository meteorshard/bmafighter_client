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

  // 管理员页面
  bindAdminTap: function () {
    wx.navigateTo({
      url: '../admin/admin'
    })
  },

  onLoad: function () {
    console.log('index onLoad')

    loadLoginData(this, 10)
  },

})

function loadLoginData(that, timeoutsec){
  /* index页面载入时加载u_id和用户信息
   * 需要等待网络访问返回查找结果
   * 循环递归调用，每0.1秒检查一次
   * 如果需要的信息都已取得，则更新页面
  */
  // 显示加载提示
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    mask: true,
    duration: 100000
  })

  var u_id = app.globalData.u_id
  var userInfo = app.globalData.userInfo

  // 如果所需信息已取得，就更新页面
  if (u_id && userInfo){
    console.log('更新页面显示数据')
    that.setData({
      u_id: u_id,
      userInfo: userInfo
    })
    wx.hideToast()

    // 把用户数据更新到服务器
    console.log('把用户数据更新到服务器')
    wx.request({
      url: app.globalData.boloUrl + 'member/',
      method: 'POST',
      data: {
        'u_id': u_id,
        'nickname': userInfo.nickName,
        'sex': userInfo.gender
      },
      success: function(){
        console.log('把用户数据更新到服务器 - OK')
      }
    })

    return
  }
  // 如果超时就返回
  else if (timeoutsec <= 0){
    console.log('Request time out.')
    return
  }
  var secleft = timeoutsec - (100 / 1000)
  console.log('Time left: ' + secleft)

  // 递归
  setTimeout(function(){
    loadLoginData(that, secleft)
  },100)
}

