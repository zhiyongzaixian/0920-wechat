// pages/detail/detail.js
let listDatas = require('../../datas/list-data.js');
let appData = getApp(); // 获取App的实例
console.log(appData, typeof appData);

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: {},
    isCollected: false,
    isPlay: false
  },
  handleCollection(){
    let isCollected = !this.data.isCollected;
    this.setData({
      isCollected
    })

    // 显示提示
    let title = isCollected?"收藏成功": "取消收藏";
    wx.showToast({
      title
    })
    // 缓存数据到本地
    // 思路: 将页面下标和对应的状态整合到一起
    // 结论: {0: true, 1: false, 2: true}
    let index = this.data.index;
    // 获取本地缓存的数据


    let obj = wx.getStorageSync('isCollected');
    console.log(obj, '----');
    // 对用户没有缓存过状态的时候做的预处理
    obj = obj?obj:{};
    obj[index] = isCollected;
    wx.setStorage({
      key: 'isCollected',
      data: obj
    })
  },
  handleMusicPlay(){
    let isPlay = !this.data.isPlay;
    this.setData({
      isPlay
    })
    let { dataUrl, title, coverImgUrl} = this.data.detailObj.music;
    if(isPlay){
      // 音乐播放
      wx.playBackgroundAudio({
        dataUrl,
        title,
        coverImgUrl
      })

    }else {
      // 音乐暂停
      wx.pauseBackgroundAudio()
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { // options的默认值是空对象
      console.log(options);
      let index = options.index;
      
      // 更新detailObj的状态
      this.setData({
        detailObj: listDatas.list_data[index],
        index
      }, () => {
        console.log('xxx');
      })
      console.log(this.data.index);
      
      // 读取本地缓存的数据
    let oldObj = wx.getStorageSync('isCollected')
    if(oldObj[index]){
      this.setData({
        isCollected: true
      })
    }

    // 判断当前的页面是否在播放音乐
    if(appData.data.isMusicPlay && appData.data.pageIndex === index){
      this.setData({
        isPlay: true
      })
    }


    // 监听音乐的播放和暂停
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放');
      this.setData({
        isPlay: true
      })
      // 修改app中缓存的状态值
      appData.data.isMusicPlay = true;
      appData.data.pageIndex = index;
    })

    wx.onBackgroundAudioPause(() => {
      console.log('音乐暂停');
      this.setData({
        isPlay: false
      })

      // 修改app中缓存的状态值
      appData.data.isMusicPlay = false;
    })
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})