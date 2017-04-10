import { service } from '../api';

export default {
  namespace: 'services',
  state: {
    list: {
      items: [],
      total: null,
      page: null,
      size: 10,
      key: null
    }
  },
  reducers: {
    queryListSuccess(state, { payload }) {
      return {
        ...state,
        list: {
          ...state.list,
          ...payload
        }
      };
    }
  },
  effects: {
    * queryList({ payload: { page, size, key } }, { call, put }) {
      const { jsonResult } = yield call(service.query, { page, size, key });
      yield put({
        type: 'queryListSuccess',
        payload: {
          items: jsonResult.data,
          total: jsonResult.total,
          page,
          key
        }
      });
    },
    * remove({ payload: id }, { call, put }) {
      yield call(service.remove, id);
      yield put({ type: 'reload' });
    },
    * save({ payload: values }, { call, put }) {
      yield call(service.save, values);
      yield put({ type: 'reload' });
    },
    * reload(action, { put, select }) {
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/services') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    }
  }
};
