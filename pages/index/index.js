
const app = getApp()

Page({
  data: {
    ads: []
  },
  onLoad(){
    wx.request('https://clicliad.deno.dev/ad').then(res=>{
      console.log(res)
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