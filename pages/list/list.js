//list.js
import douban from '../../utils/douban'
const app = getApp();
Page({
  data: {
    list: [],
    id: [],
    search: {},
    loading: true,
    hasMore: true,
    loadTxt: '加载中...',
    footerTipType: '',
    titleList: ['', '正在热映', '即将上映', 'TOP 250'],
    count: 20
  },
  onLoad(params) {
    const id = params.id
    var search = ''
    //设置标题
    wx.setNavigationBarTitle({
      title: this.data.titleList[id]
    })
    //设置搜索参数，并清空
    if (id == 0) {
      search = JSON.parse(`{"${params.type}":"${params.val}"}`)
      app.globalData.api_list[id].item = []
      app.globalData.api_list[id].num = 1
    }
    this.setData({
      id,
      search
    })
    //已请求数据
    if (app.globalData.api_list[id].num > 1 && id > 0) {
      this.setData({
        list: app.globalData.api_list[id].item,
        loading: false
      })
    } else {
      this.loadMore()
    }
  },
  onReachBottom() {
    if (this.data.footerTipType != 'end') {
      this.setData({
        footerTipType: 'load'
      })
      this.loadMore()
    }
  },
  loadMore() {
    const that = this
    const id = that.data.id
    douban.find(id, app.globalData.api_list[id].num++, that.data.count, that.data.search)
      .then(d => {
        if (d.subjects) {
          if (d.subjects.length == 0) {
            //没有新数据了
            that.setData({
              hasMore: false,
              loading: false,
              footerTipType: 'end'
            })
          } else {
            app.globalData.api_list[id].item = app.globalData.api_list[id].item.concat(d.subjects)
            that.setData({
              list: app.globalData.api_list[id].item,
              loading: false,
              footerTipType: ''
            })
          }
        } else {
          wx.showToast({
            title: '8好意思\n介个数据坏掉鸟~',
            icon: 'none',
            duration: 5000
          })
          that.setData({
            hasMore: false,
            loading: false,
          })
        }

      })
      .catch(e => {
        that.setData({
          hasMore: false,
          loading: false,
        })
        wx.showToast({
          title: '8好意思\n程序出错鸟~',
          icon: 'none'
        })
        console.error(e)
      })

  }
})