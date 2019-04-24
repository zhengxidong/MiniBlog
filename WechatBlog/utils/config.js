

var API_DOMAIN = "https://mini.itellyou.site/api/v1"; //配置api域名
//var RESOURCE_DOMAIN = "https://mini.itellyou.site/resources"; // 配置资源域名（图片，音乐等）


//var MUSIC_INIT_DATA = ['MoveYourBody.mp3', 'flames.mp3', 'pianai.mp3']; //配置音乐

var MUSIC_INIT_DATA = [
  'http://m10.music.126.net/20190425022532/00f86bb5a358516dfec64babe5d1aad7/ymusic/9a73/f8e4/de87/b1a871efe9687010bc55678843ca4369.mp3',  //老街
'http://m10.music.126.net/20190425023320/070eb48693f89eaf4794b640fe1d409d/ymusic/2f43/79c5/bd3c/7fe89e927098b086e99223a996189cba.mp3', //偏爱
'http://m10.music.126.net/20190425023412/9ea4d7a01a33214dd9c10dbd7801e9be/ymusic/85e4/fab2/c586/6de438c206892cdca82e937b7170d618.mp3',  //自动弃权
'http://m10.music.126.net/20190425033450/943a675abac4d7c2b0970517c021ba88/ymusic/93f8/a975/62eb/44ca4550b76b1a9846aa4a97d149b12f.mp3'   //冷雨夜 贝司 
]; //配置音乐


var TAB_INIT_DATA = [{name: "全部",id:1}, {name: "前端",id: 2}, {name: "后端",id: 3}, {name: "移动端",
id: 4}, {name: "服务器运维",id: 5}];  //配置专题初始化数据

export default {
  getApiDomain: API_DOMAIN,
  //getResourceDomain: RESOURCE_DOMAIN,
  getMusicInitData: MUSIC_INIT_DATA,
  getTabInitData: TAB_INIT_DATA
}