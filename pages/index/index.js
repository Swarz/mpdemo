//index.js
//获取应用实例
import douban from '../../utils/douban'
const app = getApp()
Page({
  data: {
    nowPage: "first",
    pageName: ['first', 'search', 'mine'],
    loading: true,
    loadTxt: '加载中...',
    nowIndex: 0,
    slides: [],
    mineHide: false,
    tabBar: [{
        "iconClass": "icon-listgrid",
        "text": "榜单",
        "tapFunction": "toFirst",
        "active": "active"
      },
      {
        "iconClass": "icon-i-search",
        "text": "搜索",
        "tapFunction": "toSecond",
        "active": ""
      },
      {
        "iconClass": "icon-user-o",
        "text": "我",
        "tapFunction": "toSecond",
        "active": ""
      }
    ]
  },
  onLoad: function () {
    // const first = this.selectComponent("#first")
    if (app.globalData.city) {
      console.log('i1', app.globalData.city);
      this.get_in_theaters(app.globalData.city)
    } else {
      app.loactionCallback = res => {
        console.log('i2', this);
        this.get_in_theaters(res)
      }
    }

  },
  get_in_theaters(city) {
    const that = this
    const count = app.globalData.count
    const search = {
      city: city
    }
    douban.find(1, 1, count, search)
      .then(d => {
        // console.log(d);
        if (!d.subjects) {
          //没有新数据了
          wx.showToast({
            title: '8好意思\n数次次数用完，请整点后访问~',
            icon: 'none',
            duration: 5000
          })
          that.setData({
            loading: false
          })
        } else {
          var fd = d.subjects.slice(0, 5)
          fd.forEach((element, index) => {
            fd[index].images.large = element.images.large.replace('s_ratio_poster', 'l')
          });
          app.globalData.api_list[1].num++
          app.globalData.api_list[1].item = d.subjects
          that.setData({
            slides: fd,
            loading: false
          })
        }
      })
      .catch(e => {
        that.setData({
          loading: false
        })
        console.log(e);
      })
  },
  changPage(e) {
    var id = e.currentTarget.id
    this.setData({
      nowPage: this.data.pageName[id],
      nowIndex: id
    })
  },
  fatherEvent(e) {
    this.setData({
      mineHide: e.detail.mineC
    })
  }
})