// pages/admin/admin.js
var app = getApp()
var tempData = []

Page({
  data:{
    search_result: null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
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
  searchConfirm: function(e){
    var that = this
    wx.request({
      url: app.globalData.boloUrl + 'member/search?' + e.detail.value,
      method: 'GET',
      success: function(res){
        that.setData({
          search_result: res
        })
      }
    })
  },
  update: function(e){
    var isFound = false
    var elementName = e.currentTarget.id.split('|')
    var elementId = elementName[0]
    var elementContent = elementName[1]
    for (var i=0, l=tempData.length; i<l; i++){
      if (elementName[0] == tempData[i].u_id){
        tempData[i][elementName[1]] = e.detail.value
        isFound = true
      }
    }
    if (isFound == false){
      var newData = {
        'u_id': elementName[0],
        elementContent: e.detail.value
      }
      tempData.push(newData)
    }
    console.log(tempData)
  },
  adminEditUserInfoTap: function(e){
    console.log('u_id: ' + e.currentTarget.id + ' tapped.')
    wx.navigateTo({
      url: '../adminedituserinfo/adminedituserinfo?u_id=' + e.currentTarget.id
    })
  },
  submit: function(e){
  }
})
