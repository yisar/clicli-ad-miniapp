// pages/index/index.js
Page.id = "2";
var app = getApp();
Page({
  data: {
    ads: []
  },
  onLoad() {
    wx.request("https://clicliad.deno.dev/ad").then((res) => {
      console.log(res);
    });
  },
  toast() {
    wx.showToast({
      title: "qq\u7FA4975551446",
      success: () => {
        console.log("success");
      }
    });
  }
});


