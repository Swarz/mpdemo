const app = getApp()
Component({
  properties: {
    slides: Array
  },
  data: {
    city: ''
  },
  attached() {
    this.setData({
      city: app.globalData.city
    })
  }
  // methods: {
  //   getChange(e) {
  //     this.triggerEvent('myevent', {
  //       id: e.currentTarget.id
  //     });
  //   }
  // },
  // data: {
  //   slides: []
  // },
  // methods: {
  //   catch () {
  //     this.setData({
  //       slides: app.globalData.api_list[0].slice(0, 5)
  //     })
  //   }
  // }

})