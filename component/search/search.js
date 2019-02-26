Component({
    data: {
        type: ''
    },
    methods: {
        click(e) {
            if (e.currentTarget.id == '1') {
                this.setData({
                    type: 'q'
                })
            } else if (e.currentTarget.id == '2') {
                this.setData({
                    type: 'tag'
                })
            } else {
                this.setData({
                    type: ''
                })
            }
        },
        search(e) {
            const val = e.detail.value
            var target = `../list/list?id=0&type=${this.data.type}&val=${val}`
            console.log(target);
            wx.navigateTo({
                url: target
            })
        }
    },
})