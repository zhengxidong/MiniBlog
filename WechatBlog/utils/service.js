/**
 * 此文件管理项目所有接口
 */
import { get, post, put, del } from './network';

/**
 * 服务器根域名
 * 试玩更多接口看这里
 * http://jsonplaceholder.typicode.com/
 * @type {string}
 */
//export const API_SERVER_NAME = 'http://lumen.test.site:6060/api/v1';  //开发
//export const API_SERVER_NAME = 'http://192.168.1.100:6060/api/v1';
export const API_SERVER_NAME = 'http://mini.itellyou.site/api/v1';  //正式
/**
 * 获取文章列表
 */
//export const getPhoto = (id) => get(`${API_SERVER_NAME}/photos/${id}`);

export const getArticleBycateId = (cateId) => get(`${API_SERVER_NAME}/article/${cateId}`);
export const getArticleDetailByArticleId = (articleId) => get(`${API_SERVER_NAME}/article/detail/${articleId}`);