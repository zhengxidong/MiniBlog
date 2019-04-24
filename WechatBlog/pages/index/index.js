import config from "../../utils/config";
import { getArticleBycateId } from "../../utils/service";

//随机播放音乐
var randNumber = Math.round(Math.random() * (config.getMusicInitData.length - 1));
//var musicUrl = config.getResourceDomain + '/'+ config.getMusicInitData[randNumber];
var musicUrl = config.getMusicInitData[randNumber];
console.log(musicUrl)
//var musicUrl = '';

const backgroundAudioManager = wx.getBackgroundAudioManager();  //获取音频上下文

Page({
  data: {
    //showLoading: true,    //设置loading加载
    // 音乐初始化配置
    initPlayingMusic: true, //默认页面加载播放音乐
    isPlayingMusic: false,
    music_url: musicUrl,    //音乐地址
    //初始化选项卡数据
    menuList: config.getTabInitData,
    cateId:1,
    // 0 -64 0 64 128
    tabScroll: 0,
    currentTab: 0,
    windowHeight: '',
    windowWidth: ''
  },
  onLoad: function () {
    var that = this
    //加载数据
    console.log("onLoad")
    wx.showLoading({
      title: '加载中...',
      mask:true
    });
    
    that.getArticleListBycateId(1);  //默认获取全部文章数据

    wx.playBackgroundAudio({
      dataUrl: musicUrl,
      title: '',
      coverImgUrl: ''
    });

    //监听音乐停止
    wx.onBackgroundAudioStop(function () {
      console.log('音乐已经停止')
    });

    wx.getSystemInfo({  // 获取当前设备的宽高，文档有
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    });

    //2秒后解除加载
    setTimeout(function(){
      wx.hideLoading();
    },3000);

  },
  onShow: function () {
    
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        console.log('音乐播放状态:' + res.status)
        if (res.status != 1) {
          wx.playBackgroundAudio({
            dataUrl: musicUrl,
            title: '',
            coverImgUrl: ''
          });
        }
      }
    });
    
  },
  onReady: function () {

  },
  onHide: function (e) {
    console.log(e)
  },
  //点击切换选项卡
  clickMenu: function (e) {
    var current = e.currentTarget.dataset.current //获取当前tab的index
    var cateId = e.currentTarget.dataset.cateid   //获取分类id
    console.log('点击获取分类id：' + cateId)
    var tabWidth = this.data.windowWidth / 5 // 导航tab共5个，获取一个的宽度
    this.setData({
      tabScroll: (current - 2) * tabWidth //使点击的tab始终在居中位置
    })
    if (this.data.currentTab == current) {
      return false
    } else {
      this.setData({ currentTab: current })
    }
  },
  //切换选项卡
  changeContent: function (e) {

    wx.showLoading({
      title:'加载中',
      mask:true
    })

    var realCateIds = [1,2,3,4,5]; //真实的文章分类id值
    var current = e.detail.current // 获取当前内容所在index,文档有
    //console.log('当前菜单索引id:'+current)
    //console.log('匹配值:' + realCateIds[current]) 
    //console.log('切换获取数据')
    var cateId = realCateIds[current];
    this.getArticleListBycateId(cateId);

    var tabWidth = this.data.windowWidth / 5

    this.setData({
        currentTab: current,
        tabScroll: (current - 2) * tabWidth
    });

    setTimeout(function(){
      wx.hideLoading();
    },1500)
    
  },
  //播放音乐
  play: function (event) {
    console.log(event)

    if (this.data.isPlayingMusic) {
      console.log('播放')
      wx.playBackgroundAudio({
        dataUrl: this.data.music_url,
        title: '',
        coverImgUrl: ''
      })
      this.setData({
        isPlayingMusic: false,
        initPlayingMusic: false
      })

    } else {
      console.log('停止')
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: true,
        initPlayingMusic: false
      })
    }
  },
  //按分类获取文章列表
  getArticleListBycateId : function (id){
    getArticleBycateId(id).then(data => this.setData({ postsList: data }));
  },
  // 跳转至查看文章详情
  redictDetail: function (e) {
    console.log('文章id' + e.currentTarget.id);
    var id = e.currentTarget.id,
      url = '../detail/detail?id=' + id;
    wx.navigateTo({
      url: url
    })
  },
})