import douban from '../../utils/douban'
Page({
  data: {
    det: {},
    t_img_h: '',
    stars: [],
    disHC: '',
    showFlg: '',
    dp_show: null,
    // animationData: '',
    starClass: ['icon-star', 'icon-star-half', 'icon-starno'],
    loading: true
  },
  onLoad(params) {
    const that = this
    douban.findOne(params.id)
      .then(d => {
        if (d.id == params.id) {
          that.com_data(d)
        } else {
          that.setData({
            loading: false
          })
          wx.showToast({
            title: '8好意思\n介个数据坏掉鸟~',
            icon: 'none',
            duration: 5000
          })
        }
      })
      .catch(e => {
        wx.showToast({
          title: '8好意思\n程序出错鸟~',
          icon: 'none'
        })
        console.error(e)
      })
  },
  ts() {
    this.setData({
      showFlg: 'f-photo',

    })
  },
  te() {
    this.setData({
      showFlg: ''
    })
  },
  ds() {
    this.setData({
      disHC: 'abstractO',
      showFlg: 'abstract'
    })
    // this.absAni()
  },
  de() {
    this.setData({
      disHC: '',
      showFlg: ''
    })
  },
  dpshow(e) {
    const id = e.currentTarget.id
    if (this.data.dp_show == id) {
      this.setData({
        dp_show: null
      })
    } else {
      this.setData({
        dp_show: id
      })
    }
  },
  // absAni() {
  //   var animation = wx.createAnimation({
  //     duration: 1500,
  //     timingFunction: "ease-out",
  //     delay: 0,
  //     transformOrigin: "50% 50%",
  //   })
  //   animation.translateY(20).step();
  //   this.setData({
  //     animationData: animation.export(),
  //   })

  // },
  com_data(d) {
    //图片地址转换
    var fd = d
    fd.images.large = fd.images.large.replace('s_ratio_poster', 'l')
    //start class 计算
    var starC = this.data.starClass
    var starArr = ['', '', '', '', '']
    var score = d.rating.average / 2
    starArr.forEach((e, i) => {
      starArr[i] = i <= score - 1 ? starC[0] : (i <= score - 0.5 ? starC[1] : starC[2])
    })

    this.setData({
      det: fd,
      loading: false,
      stars: starArr
    })
  }
})