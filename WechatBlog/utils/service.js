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
export const API_ROOT = 'http://lumen.test.site:6060/api/v1';
//export const API_ROOT = 'http://192.168.1.100:6060/api/v1';

/**
 * 获取文章列表
 */
//export const getPhoto = (id) => get(`${API_ROOT}/photos/${id}`);

export const getArticleBycateId = (cateId) => get(`${API_ROOT}/article/${cateId}`);
