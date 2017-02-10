// userscan.js

var app = getApp()

Page({
  data: {
    url: ""
  },

  onLoad: function(){
    var url = 'https://boluogedou.com/api/qrcode/checkin/?u_id='
    var u_id = app.globalData.u_id
    url = url + u_id
    this.setData({
      url: url
    })
  }
})
