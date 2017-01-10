import React, {Component} from "react";
import {Input, Button, Table} from "antd";
import {connect} from 'react-redux'
import {services as actions} from '../store/actions'
import AddModal from '../components/services/AddModal';

class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editRecord: null
    }
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
    this.setState({editRecord: record});
    this.showModal();
  }
  handleRemove(id) {
    this.props.delService(id);
  }
  showModal = () => {
    this.setState({visible: true});
  }
  hideModal = () => {
    this.setState({visible: false, editRecord: null});
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
    const {data, loading} = this.props;
    const dataSource = data.services;

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
    const elemAddModal = this.state.visible
      ? <AddModal {...modalProps}/>
      : <div></div>;
    return (
      <div>
        <h3>服务列表</h3>
        <Table dataSource={dataSource} columns={columns}/>
        <Button type="primary" onClick={this.showModal}>添加服务</Button>
        {elemAddModal}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {data: state.services}
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(mapStateToProps, {...actions})(Services);
// export default connect(mapStateToProps, {getServices, addService, updateService, delService})(Services);
