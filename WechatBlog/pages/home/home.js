//var musicUrl = 'http://www.ytmp3.cn/down/49676.mp3'
//var musicUrl = 'https://www.itellyou.site/MoveYourBody.mp3'
//var musicUrl = 'https://www.itellyou.site/pianai.mp3'
var host = 'https://www.itellyou.site/'
var musicUrlArr = ['MoveYourBody.mp3','49676.mp3','pianai.mp3'];

//产生随机数
var rand = Math.round(Math.random() * (musicUrlArr.length - 1));
console.log('随机数：' + rand)
var musicUrl = host + musicUrlArr[rand];
console.log('随机音乐：'+musicUrl)
//获取音频上下文
const backgroundAudioManager = wx.getBackgroundAudioManager();

Page({

    /**
     * 页面的初始数据
     */
	data: {

    //页面初始化配置 
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    // 音乐初始化配置
    initPlayingMusic: true, //默认页面加载播放音乐
    isPlayingMusic: false,
    music_url: musicUrl,    //音乐地址
		isLoadedAll: false,
		musicIndex: null,
		videoIndex: null,
		currentTabsIndex: 0,
		pageIndex: 1,
		videoList: [
			{
				'coverimg':"https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description':"这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。这是第一个示例，这是第一个示例，这是第一个示例，这是第一个示例。",
				'id':"41",
        'resource_add':"http://itellyou.site/yufang.mp4",
				'title':" 第三期 Beatles 02",
				'type':"1"
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "",
				'id': "42",
				'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
				'title': " 第三期 Beatles 02",
				'type': "1"
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "",
				'id': "43",
				'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
				'title': " 第三期 Beatles 02",
				'type': "1"
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "",
				'id': "44",
				'resource_add': "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400",
				'title': " 第三期 Beatles 02",
				'type': "1"
			},
		],
		audioList:[
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，",
				'id': "50",
				'resource_add': "http://zhangmenshiting.qianqian.com/data2/music/6c2983881c95968fbb0f4fd334c5d526/599527734/599527734.mp3?xcode=7c9d9130f46d992ba0cc505dc0621a48",
				'title': "音频1",
				'type': "1"	
			},
			{
				'coverimg': "https://goss.veer.com/creative/vcg/veer/800water/veer-146156021.jpg",
				'description': "这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，这是第1个示例音频，",
				'id': "51",
				'resource_add': "http://zhangmenshiting.qianqian.com/data2/music/6c2983881c95968fbb0f4fd334c5d526/599527734/599527734.mp3?xcode=7c9d9130f46d992ba0cc505dc0621a48",
				'title': "音频2",
				'type': "1"
			}
		]
	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
    var that = this
		//加载数据
    console.log("onLoad")
    wx.playBackgroundAudio({
      dataUrl: musicUrl,
      title: '',
      coverImgUrl: ''
    })
		//这里数据写死，假装我是在服务器拿到的数据

    //监听音乐停止
    wx.onBackgroundAudioStop(function(){
      console.log('音乐已经停止')
      // that.setData({
      //   isPlayingMusic: false
      // })
    });
    //获取系统信息 
    wx.getSystemInfo( {

      success: function ( res ) {
        that.setData( {
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
	},
  onShow: function (){

    wx.getBackgroundAudioPlayerState({
      success:function(res){
        console.log('音乐播放状态:'+res.status)
        if(res.status != 1)
        {
          wx.playBackgroundAudio({
            dataUrl: musicUrl,
            title: '',
            coverImgUrl: ''
          });
        }
      }
    });
    
  },
	//tap切换
	onTabsItemTap: function (event) {
		var index = event.currentTarget.dataset['index'];
		this.setData({
			currentTabsIndex: index
		});
		//tab切换时停止音乐播放
		backgroundAudioManager.stop();

		//tab切换时停止视频播放
		var videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex);
		videoContextPrev.stop();

		//将当前播放视频、音频的index设置为空
		this.setData({
			musicIndex: null,
			videoIndex: null,
		})
	},
	//展开
	//原本没有upStatus这个字段，所以默认值为false
	upDown(event) {
		var index = event.currentTarget.dataset['index'];
		this.data.videoList[index].upStatus = !this.data.videoList[index].upStatus;
		this.setData({
			videoList: this.data.videoList
		})
	},
	//播放音频
	musicPlay(event) {
		var src = event.currentTarget.dataset['src'];
		var index = event.currentTarget.dataset['index'];
		this.setData({
			musicIndex: index,
			audioSrc: src
		});
		
		backgroundAudioManager.src = src;
		backgroundAudioManager.play()

	},
	//停止音频
	musicPause(event) {
		this.setData({
			musicIndex: null
		});
		backgroundAudioManager.pause();
	},
	//播放视频
	videoPlay(event) {
		var length = this.data.videoList.length;
		var index = event.currentTarget.dataset['index'];

		if (!this.data.videoIndex) { // 没有播放时播放视频
			this.setData({
				videoIndex: index
			})
			var videoContext = wx.createVideoContext('video' + index)
			videoContext.play()
		} else {
			//停止正在播放的视频
			var videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex)
			videoContextPrev.stop()
			//将点击视频进行播放
			this.setData({
				videoIndex: index
			})
			var videoContextCurrent = wx.createVideoContext('video' + index)
			videoContextCurrent.play()
		}
	},
  
  //播放音乐
  play: function(event){
    console.log(event)

    if (this.data.isPlayingMusic){
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
      
    }else{
      console.log('停止')
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: true,
        initPlayingMusic: false
      })

      // wx.playBackgroundAudio({
      //   dataUrl: this.data.music_url,
      //   title: '',
      //   coverImgUrl: ''
      // })
      // this.setData({
      //   isPlayingMusic: false,
      //   initPlayingMusic: false
      // })
    }
  },

	// onReachBottom: function () {
	// 	if (!this.data.isLoadedAll) {
	// 		this.data.pageIndex++;
	// 		this._loadData(this.data.id, this.data.pageIndex);
	// 	}
	// }

    /***********************选项卡操作*****************************/
    //滑动切换tab 
    bindChange: function (e) {

    var that = this;
    that.setData( { currentTab: e.detail.current });

  },
  //点击tab切换 
  swichNav: function (e) {

    var that = this;

    if ( this.data.currentTab === e.target.dataset.current ) {
      return false;
    } else {
      that.setData( {
        currentTab: e.target.dataset.current
      })
    }
  }
})