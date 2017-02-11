//adminscan.js
Page({
  onLoad: function(){
    wx.scanCode({
      success: function(res){
        console.log(res)
        wx.navigateBack({
          delta: 1
        })
      },
      fail: function(){
        console.log('failed')
      }
    })
  }
})
