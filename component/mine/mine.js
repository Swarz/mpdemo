const app = getApp()
Component({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        city: '',
        cityClick: 0,
        hideClick: 0,
        showm: true
    },
    attached() {
        this.setData({
            city: app.globalData.city
        })
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true,

                    })
                }
            })
        }

    },
    methods: {
        getUserInfo(e) {
            console.log(e);
            app.globalData.userInfo = e.detail.userInfo
            this.setData({
                userInfo: e.detail.userInfo,
                hasUserInfo: true
            })
        },
        c_click() {
            this.setData({
                cityClick: this.data.cityClick + 1
            })
            if (this.data.cityClick > 2) {
                this.setData({
                    cityClick: 0
                })
                wx.showToast({
                    title: '嘿嘿嘿~点也没用~~',
                    icon: 'none',
                    duration: 3000
                })
            }
        },
        h_click() {
            console.log(this.data.hideClick);
            this.setData({
                hideClick: this.data.hideClick + 1
            })
            if (this.data.hideClick == 7) {
                this.triggerEvent('sonEvent', {
                    mineC: true
                })
            }
            if (this.data.hideClick == 15) {
                wx.showToast({
                    title: '+W gaochongle',
                    icon: 'none',
                    duration: 3000
                })
            }
        },
        tshow() {
            if (this.data.hideClick > 6) {
                this.triggerEvent('sonEvent', {
                    mineC: false
                })
            }
            this.setData({
                showm: false
            })
        }
    },

})