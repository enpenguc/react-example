import qs from 'qs';
import xFetch from '../util/xFetch';

/**
 * 查询用户列表
 */
export async function queryUsers(params) {
  return xFetch(`/api/users/list?${qs.stringify(params)}`);
}
/**
 * 新增一个用户
 */
export async function addUser(params) {
  return xFetch('/api/users/add', {
    method: 'POST',
    body: qs.stringify(params)
  });
}
