import xFetch, { get, post } from '../util/xFetch';
import { API } from '../constants';

// 查询服务列表
export const query = async ({ page, size, key }) => get(API.SERVICES_QUERY, { page, size, key });
// 新增、修改
export const save = async data => post(API.SERVICES_SAVE, data);
// 删除
export const remove = async ({ id }) => post(API.SERVICES_REMOVE, { id });
// 查询详情
export const queryDetail = async ({ id }) => get(API.SERVICES_QUERY_DETAIL, { id });
