import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import { connect } from 'dva'
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
    this.props.queryList();
  }
  // 添加
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
  render() {
    const { list, loading } = this.props;
    const dataSource = list.items;

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
            <div>
              <a onClick={this.handleEdit.bind(this, record)}>修改</a>
              <a onClick={this.handleRemove.bind(this, record.id)}>删除</a>
            </div>
          );
        }
      }
    ];

    const modalProps = {
      data: this.state.editRecord,
      onOkClick: this.handleSaveService,
      onCancelClick: this.hideModal,
      checkServiceNameExists: this.checkServiceNameExists
    }
    return (
      <div>
        <h3>服务列表</h3>
        <Table dataSource={dataSource} columns={columns} />
        <Button type="primary" onClick={this.showModal}>添加服务</Button>
      </div>
    )
  }
}

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
export default connect(mapStateToProps, dispatchToProps)(Services);
