import React, { Component } from 'react';
import { Input, Button, Table, Popconfirm } from 'antd';
import { connect } from 'dva'
import { withRouter } from 'dva/router'
import qs from 'qs';
// import AddModal from '../components/services/AddModal';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editRecord: null
    }
  }
  componentDidMount() {
    this.queryList();
  }
  componentWillReceiveProps(props) {
    if (this.props.location.query !== props.location.query) {
      this.queryList({ ...props.location.query });
    }
  }
  queryList = (query = this.props.location.query) => {
    this.props.queryList({ ...query });
  }
  //
  handleSaveService = (data) => {
    if (data.id) {
      this.props.updateService(data);
    } else {
      this.props.addService(data);
    }
    this.hideModal();
  }
  // 修改
  handleEdit = (record) => {
  }
  handleRemove(id) {
    this.props.delService(id);
  }
  showModal = () => {
  }
  hideModal = () => {
  }
  checkServiceNameExists = (rule, value, callback) => {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (this.checkNameExists(value)) {
          callback([new Error('抱歉，此服务名称已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }
  checkNameExists(name) {
    const services = this.props.data.services;
    if (!services) {
      return false;
    }
    return services.some(item => item.name === name);
  }
  changeQuery = (params) => {
    const { pathname, query } = this.props.location;
    const q = {
      ...query,
      ...params
    }
    this.context.router.push(`${pathname}?${qs.stringify(q)}`)
  }
  render() {
    const { list, loading } = this.props;
    const { page, size, key } = this.props.location.query;
    const columns = [
      {
        title: '服务名称',
        dataIndex: 'name',
        key: 'name'
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      }, {
        title: '描述',
        dataIndex: 'desc',
        key: 'desc'
      }, {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record, index) => {
          return (
            <div className="rcb-table-operation">
              <a onClick={this.handleEdit.bind(this, record)}>修改</a>
              <Popconfirm title="确定要删除此服务吗?" onConfirm={this.handleRemove.bind(this, record.id)}>
                <a>删除</a>
              </Popconfirm>
            </div>
          );
        }
      }
    ];

    // const modalProps = {
    //   data: this.state.editRecord,
    //   onOkClick: this.handleSaveService,
    //   onCancelClick: this.hideModal,
    //   checkServiceNameExists: this.checkServiceNameExists
    // }
    const pagination = {
      current: parseInt(list.page, 10),
      total: list.total,
      pageSize: parseInt(size, 10),
      showSizeChanger: true,
      onShowSizeChange: (pageIndex, pageSize) => {
        // console.log(this.props, this.context.router);
        this.changeQuery({ page: 1, size: pageSize });
        // this.props.queryList({ size });
      },
      onChange: (pageIndex) => {
        this.changeQuery({ page: pageIndex });
        // this.props.queryList({ page });
      }
    };

    // <h3>服务列表</h3>
    return (
      <div>
        <div className="rcb-line">
          <Button type="primary" onClick={this.showModal}>添加服务</Button>
        </div>
        <Table dataSource={list.items} columns={columns} rowKey="id" pagination={pagination} />
      </div>
    )
  }
}
Services.contextTypes = {
  router: React.PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    list: state.services.list,
    loading: !!state.loading.models.services
  }
}

function dispatchToProps(dispatch) {
  return {
    queryList(payload = {}) {
      dispatch({
        type: 'services/queryList',
        payload
      })
    }
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps, dispatchToProps)(withRouter(Services));
