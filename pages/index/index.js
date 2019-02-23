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
    const that = this
    douban.find(1)
      .then(d => {
        // console.log(d);

        if (!d.subjects) {
          //没有新数据了
          wx.showToast({
            title: '8好意思\n介个数据坏掉鸟~',
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
        console.log(e)
        that.setData({
          loading: false
        })

        wx.showToast({
          title: '8好意思\程序出错鸟~',
          icon: 'none',
          duration: 5000
        })


      })
  },
  changPage(e) {
    var id = e.currentTarget.id
    this.setData({
      nowPage: this.data.pageName[id],
      nowIndex: id
    })
  }
})