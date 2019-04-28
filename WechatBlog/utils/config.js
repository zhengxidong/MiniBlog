
var DOMAIN = "https://itellyou.site";  //web站点域名
var API_DOMAIN = "https://mini.itellyou.site/api/v1"; //配置api域名
var RESOURCE_DOMAIN = "https://mini.itellyou.site/resources"; // 配置资源域名（图片，音乐等）

var MINAPPTYPE = "1";//小程序的类型，如果是企业小程序请填：0 ，如果是个人小程序请填：1
//var MUSIC_INIT_DATA = ['MoveYourBody.mp3', 'flames.mp3', 'pianai.mp3']; //配置音乐

//配置音乐
var MUSIC_INIT_DATA = [
'b1a871efe9687010bc55678843ca4369.mp3',  //老街
'M5000007kTiZ1kWBvK.mp3',                //午夜的怨曲
'85e4_fab2_c586_6de438c206892cdca82e937b7170d618.mp3',  //自动弃权
'93f8_a975_62eb_44ca4550b76b1a9846aa4a97d149b12f.mp3'   //冷雨夜 贝司 
]; 


var TAB_INIT_DATA = [{name: "全部",id:1}, {name: "前端",id: 2}, {name: "后端",id: 3}, {name: "移动端",
id: 4}, {name: "服务器运维",id: 5}];  //配置专题初始化数据

export default {
  getDomain: DOMAIN,
  getApiDomain: API_DOMAIN,
  getResourceDomain: RESOURCE_DOMAIN,
  getMusicInitData: MUSIC_INIT_DATA,
  getTabInitData: TAB_INIT_DATA,
  getMinAppType: MINAPPTYPE,
}