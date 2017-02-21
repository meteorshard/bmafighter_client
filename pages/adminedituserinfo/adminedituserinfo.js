// pages/adminedituserinfo/adminedituserinfo.js
var app = getApp()

Page({
  data:{
    userInfoBolo: null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    wx.request({
      url: app.globalData.boloUrl + "member/search",
      method: "GET",
      data: options,
      success: function(res){
        that.setData({
          userInfoBolo: res.data[0]
        })
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  localconfirm:function(e){
    // 用户在输入框点击小键盘的完成
    var updatedUserInfoBolo = this.data.userInfoBolo
    updatedUserInfoBolo[e.currentTarget.id] = e.detail.value
    this.setData({
      userInfoBolo: updatedUserInfoBolo
    })
  },
  uploadNewData:function(e){
    // 点击更新数据按钮，上传修改后的数据
    console.log('更新用户数据')
    var that = this
    wx.request({
      url: app.globalData.boloUrl + 'member/',
      method: 'POST',
      data: that.userInfoBolo,
      success: function(){
        console.log('更新用户数据 - OK')
      }
    })
  }
})
