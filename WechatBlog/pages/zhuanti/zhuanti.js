import { getArticleBycateId } from "../../utils/service";

var host = 'https://www.itellyou.site/wx-mini/'
var musicUrlArr = ['MoveYourBody.mp3', '49676.mp3', 'pianai.mp3'];

//产生随机数
var rand = Math.round(Math.random() * (musicUrlArr.length - 1));
console.log('随机数：' + rand)
var musicUrl = host + musicUrlArr[rand];
console.log('随机音乐：' + musicUrl)
//获取音频上下文
const backgroundAudioManager = wx.getBackgroundAudioManager();


Page({
  data: {
    showLoading: true,
    // 音乐初始化配置
    initPlayingMusic: true, //默认页面加载播放音乐
    isPlayingMusic: false,
    music_url: musicUrl,    //音乐地址
    menuList: [{
      name: "全部",
      id:1
    },{
      name: "前端",
      id: 2
    }, {
      name: "后端",
      id: 3
    }, {
      name: "移动端",
      id: 4
    }, {
      name: "服务器运维",
      id: 5
    }
    ],
    //初始化示例数据
    // postsList: [
    //   {
    //     id: 0,
    //     post_medium_image: 'test.png', //封面图片
    //     title: {
    //       rendered: 'test'             //标题
    //     },
    //     excerpt: {
    //       rendered: '1233333333333333333333333333333333333333333333333333333333'              //简介内容
    //     },
    //     category_name: 'php',          //分类
    //     date: '2018-08-08',            //日期
    //     total_comments: 3,             //评论总数
    //     pageviews: '3',                //浏览总数
    //     like_count: 33                 //赞总数
    //   },
    //   {
    //     id: 1,
    //     post_medium_image: 'test.png',
    //     title: {
    //       rendered: 'test'
    //     },
    //     excerpt: {
    //       rendered: '123'
    //     },
    //     category_name: 'git',
    //     date: '2018-08-08',
    //     total_comments: 3,
    //     pageviews: '3',
    //     like_count: 33
    //   }
    // ], 
    cateId:1,
    // 0 -64 0 64 128
    tabScroll: 0,
    currentTab: 0,
    windowHeight: '',
    windowWidth: ''
  },
  onLoad: function () {
    

    var that = this
    that.getArticleBycateId();

    //console.log(e.detail.current)
    // wx.showToast({
    //   title: '加载中',
    //   icon: 'loading',
    //   mask: true
    // });

    //加载数据
    console.log("onLoad")
    wx.playBackgroundAudio({
      dataUrl: musicUrl,
      title: '',
      coverImgUrl: ''
    });

    //监听音乐停止
    wx.onBackgroundAudioStop(function () {
      console.log('音乐已经停止')
      // that.setData({
      //   isPlayingMusic: false
      // })
      
    });

    wx.getSystemInfo({  // 获取当前设备的宽高，文档有
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    });
    
    that.setData({
      showLoading:false
    });
    //wx.hideToast();

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
    // wx.setNavigationBarTitle({ //修改标题文字
    //   title: ''
    // })
    
  },
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
  changeContent: function (e) {
    var realCateIds = [1,2,3,4,5]; //真实的文章分类id值
    var current = e.detail.current // 获取当前内容所在index,文档有
    console.log('当前菜单索引id:'+current)
    console.log('匹配值:' + realCateIds[current])  
    // wx.showLoading({
    //   title: '加载中',
    //   mask:true
    // })
    //console.log(this.data.windowWidth)
    var tabWidth = this.data.windowWidth / 5
    //console.log(tabWidth)
    //console.log(this.data.postsList)
    //console.log(this.data.postsList[current])
    // if (this.data.postsList[current] == 'undefined')
    // {

    // }
    // else{
    //   var neData = [this.data.postsList[current]];

    // }
    var tabScroll = (current - 2) * tabWidth
    //console.log(tabScroll)

    this.setData({
      //更新对应栏目的文章
      //postsList: neData,
      currentTab: current,
      tabScroll: tabScroll
    })
    
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
  getArticleBycateId : function (){

    getArticleBycateId(1).then(data => this.setData({ postsList: data }));;
    //console.log(artocleList);
    //wx.hideLoading();
    
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