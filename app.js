//app.js
var QQMapWX = require('./utils/qqmap-wx-jssdk.min.js')
var qqmapsdk
App({
  onLaunch: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'MEIBZ-UTCAJ-5DUFD-KSM6T-2AYJF-5YBUC'
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        //获取用户位置
        if (res.authSetting['scope.userLocation']) {
          //已授权
          console.log('sq');

          this.getLocation()
        } else {
          //请求授权
          console.log('qq');

          const that = this
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              that.getLocation()
            },
            fail(e) {
              console.log(e);
              that.alt(e.errMsg)
            }
          })
        }
      }
    })
  },
  getLocation() {
    const that = this
    console.log('getLoc', )
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res.latitude, res.longitude);
        that.getLocal(res.latitude, res.longitude)
      },
      fail(e) {
        console.log(e);
        that.alt(e.errMsg)
        that.alt("定位失败，默认北京")
        that.globalData.city = '北京'
        if (that.loactionCallback) {
          that.loactionCallback("北京")
        }
      }
    })
  },
  getLocal: function (latitude, longitude) {
    const that = this
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        var city = res.result.address_component.city
        that.globalData.city = city
        if (that.loactionCallback) {
          that.loactionCallback(city)
        }
      },
      fail: function (res) {
        console.log('mapsdk fail', res)
        that.alt(res.message)
        that.alt("定位失败，默认北京")
        that.globalData.city = '北京'
        if (that.loactionCallback) {
          that.loactionCallback("北京")
        }
      },
      complete: function (res) {
        // console.log(res)
      }
    })
  },
  alt(e) {
    wx.showModal({
      title: '提示',
      content: e,
      showCancel: false, //是否显示取消按钮
      confirmText: "是", //默认是“确定”
      confirmColor: '#333', //确定文字的颜色
      success: function (res) {}
    })
  },
  globalData: {
    userInfo: null,
    city: null,
    count: 20,
    api_list: [{
        item: [],
        num: 1
      },
      {
        item: [],
        num: 1
      },
      {
        item: [],
        num: 1
      },
      {
        item: [],
        num: 1
      }
    ]
  }
})