const api_url = 'https://douban.uieee.com/v2/movie/'
const pageType = ['search', 'in_theaters', 'coming_soon', 'top250']

function fetchApi(type, params) {
    //Promise实例用匿名函数接受一个操作函数
    //操作函数的成功状态返回函数用变量resolve代替，失败状态用reject
    //Promise接收两个变量，并分别用.then .catch 返回给实例
    //return 层层返回给方法函数
    return new Promise((resolve, reject) => {
        console.log(`${api_url}${type}`);
        console.log(params);
        wx.request({
            url: `${api_url}/${type}`, //es6拼接变量和字符串,总体用``包裹,变量用 ${变量}
            method: 'GET',
            data: params,
            header: {
                "Content-Type": "application/texts"
            },
            success: resolve,
            fail: reject
        })
    })
}

function find(id, page = 1, count = 20, search = '') {
    const params = {
        start: (page - 1) * count,
        count: count
    }
    //fetchApi第二个参数返回request的data参数
    //search存在就和params组合，否则就是params
    return fetchApi(pageType[id], search ? Object.assign(search, params) : params)
        .then(res => res.data)
}

function findOne(id) {
    return fetchApi('subject/' + id)
        .then(res => res.data)
}

module.exports = {
    find,
    findOne
}