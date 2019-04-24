import { getArticleDetailByArticleId } from "../../utils/service";
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isloading: true,
    //article将用来存储towxml数据
    article: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    if (options.id == '')
    {
      console.log('文章id不能为空');
      return false;
    }
    console.log('查看文章详情，id为: ' + options.id)
    self.fetchDetailData(options.id);

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
    
  },

  //获取文章内容
  fetchDetailData: function (id) {

    console.log('获取到文章id：' + id);

    var self = this;
    var res;
    var _displayLike = 'block';

    
//     var data = `<table>
// <thead>
// <tr>
// <th>文件类型</th>
// <th>执行动作</th>
// <th>命令</th>
// </tr>
// </thead>
// <tbody>
// <tr>
// <td>.tar</td>
// <td>解压</td>
// <td>tar xvf FileName.tar</td>
// </tr>
// <tr>
// <td>.tar</td>
// <td>打包</td>
// <td>tar cvf FileName.tar DirName</td>
// </tr>
// <tr>
// <td>.gz</td>
// <td>解压1</td>
// <td>gunzip FileName.gz</td>
// </tr>
// <tr>
// <td>.gz</td>
// <td>解压2</td>
// <td>gzip -d FileName.gz</td>
// </tr>
// <tr>
// <td>.gz</td>
// <td>压缩</td>
// <td>gzip FileName</td>
// </tr>
// <tr>
// <td>.tar.gz 和 .tgz</td>
// <td>解压</td>
// <td>tar zxvf FileName.tar.gz</td>
// </tr>
// <tr>
// <td>.tar.gz 和 .tgz</td>
// <td>压缩</td>
// <td>tar zcvf FileName.tar.gz DirName</td>
// </tr>
// <tr>
// <td>.bz2</td>
// <td>解压1</td>
// <td>bzip2 -d FileName.bz2</td>
// </tr>
// <tr>
// <td>.bz2</td>
// <td>解压2</td>
// <td>bunzip2 FileName.bz2</td>
// </tr>
// <tr>
// <td>.bz2</td>
// <td>压缩</td>
// <td>bzip2 -z FileName</td>
// </tr>
// <tr>
// <td>.tar.bz2</td>
// <td>解压</td>
// <td>tar jxvf FileName.tar.bz2</td>
// </tr>
// <tr>
// <td>.tar.bz2</td>
// <td>压缩</td>
// <td>tar jcvf FileName.tar.bz2 DirName</td>
// </tr>
// <tr>
// <td>.bz</td>
// <td>解压1</td>
// <td>bzip2 -d FileName.bz</td>
// </tr>
// <tr>
// <td>.bz</td>
// <td>解压2</td>
// <td>bunzip2 FileName.bz</td>
// </tr>
// <tr>
// <td>.tar.bz</td>
// <td>解压</td>
// <td>tar jxvf FileName.tar.bz</td>
// </tr>
// <tr>
// <td>.Z</td>
// <td>解压</td>
// <td>uncompress FileName.Z</td>
// </tr>
// <tr>
// <td>.Z</td>
// <td>压缩</td>
// <td>compress FileName</td>
// </tr>
// <tr>
// <td>.tar.Z</td>
// <td>解压</td>
// <td>tar Zxvf FileName.tar.Z</td>
// </tr>
// <tr>
// <td>.tar.Z</td>
// <td>压缩</td>
// <td>tar Zcvf FileName.tar.Z DirName</td>
// </tr>
// <tr>
// <td>.zip</td>
// <td>解压</td>
// <td>unzip FileName.zip</td>
// </tr>
// <tr>
// <td>.zip</td>
// <td>压缩</td>
// <td>zip FileName.zip DirName</td>
// </tr>
// <tr>
// <td>.rar</td>
// <td>解压</td>
// <td>rar x FileName.rar</td>
// </tr>
// <tr>
// <td>.rar</td>
// <td>压缩</td>
// <td>rar a FileName.rar DirName</td>
// </tr>
// </tbody>
// </table>
// <p>转载地址：<a href="https://blog.csdn.net/aishangyutian12/article/details/53442742">https://blog.csdn.net/aishangyutian12/article/details/53442742</a></p>`;
    //将markdown内容转换为towxml数据

    //console.log(articleDetail);
    
    //let test;
    getArticleDetailByArticleId(id).then(data => {
      console.log(data)
      console.log('文章标题' + data.articleTitle)
      console.log('文章详情：' + data.articleContent)
      let articleData = app.towxml.toJson(
        data.articleContent,               // `markdown`或`html`文本内容
        'markdown'              // `markdown`或`html`
      );

      articleData = app.towxml.initData(articleData, {
        base: 'https://xxx.com/',    // 需要解析的内容中相对路径的资源`base`地址
        app: self                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
      });

      //设置文档显示主题，默认'light'
      articleData.theme = 'light';

      //设置数据
      self.setData({
        article: articleData,
        isloading: false
      });

      //文章数据
      var initData = {
        data: {
          arrticleTitle: data.articleTitle,
          category_name: 'php',
          pageviews: 4
        }
      };
      var _likeCount = 1;
      self.setData({
        detail: initData.data,
        //detail: response.data,
        likeCount: _likeCount,
        detailDate: '2018',
        total_comments: 3,
        //postID: id,
        display: 'block',
      });
    });

    //console.log(test);
    // let tet = getArticleDetailByArticleId(id);
    // console.log(tet)
    // let b = tet.then( data => {
    //   data
    // });
    
    // let articleData = app.towxml.toJson(
    //   '',               // `markdown`或`html`文本内容
    //   'markdown'              // `markdown`或`html`
    // );

    //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
    // articleData = app.towxml.initData(articleData, {
    //   base: 'https://xxx.com/',    // 需要解析的内容中相对路径的资源`base`地址
    //   app: self                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
    // });

    //设置文档显示主题，默认'light'
    //articleData.theme = 'light';

    //设置数据
    // self.setData({
    //   article: articleData,
    //   isloading: false
    // });

    //文章数据
    // var initData = {
    //   data: {
    //     title: {
    //       rendered: 'test'
    //     },
    //     category_name: 'php',
    //     pageviews: 4
    //   }
    // };
    // var _likeCount = 1;
    // self.setData({
    //   detail: initData.data,
    //   //detail: response.data,
    //   likeCount: _likeCount,
    //   detailDate: '2018',
    //   total_comments: 3,
    //   //postID: id,
    //   display: 'block',
    // });

    
  },
  
})