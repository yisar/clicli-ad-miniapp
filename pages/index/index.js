
const app = getApp()

Page({
  data: {
    ads: [],
    url: null,
    display: 'a motal'
  },
  onLoad() {
    wx.request('https://clicliad.deno.dev/ad').then(res => {
      this.setData({
        ads: res.data
      })
    })
  },

  openUrl(e) {
    const url = e.dataset.url
    this.setData({
      url,
      display: 'b motal'
    })
  },

  close(){
    this.setData({
      display: 'a motal'
    })
  },

  toast() {
    wx.showToast({
      title: 'qq群975551446',
      success: () => {
        console.log('success')
      }
    })
  }
})