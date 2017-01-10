import xFetch from '../util/xFetch';
import qs from 'qs';

/**
 * 查询服务列表
 */
export async function queryUsers(params) {
  return xFetch(`/api/services/list?${qs.stringify(params)}`);
}
/**
 * 新增服务
 */
export async function addUser(params) {
  return xFetch('/api/services/add', {
    method: 'POST',
    body: qs.stringify(params)
  });
}
