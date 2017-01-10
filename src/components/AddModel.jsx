import React from "react";
import { Input, Button, Select, Form, Modal } from "antd";
const FormItem = Form.Item;
const createForm = Form.create;
const Option = Select.Option;

const AddModal = ({form, data, onOkClick, onCancelClick, checkServiceNameExists}) => {
  const {getFieldProps} = form;

  const handleOk = () => {
    const d = form.getFieldsValue();
    const id = data
      ? data.id
      : null;
    onOkClick({
      ...d,
      id
    });
  }
  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 14
    }
  }
  const {name, desc, type} = (data || {
    type: "public"
  });
  const nameProps = getFieldProps('name', {
    rules: [
      {
        required: true,
        min: 5,
        message: '服务名称至少为 5 个字符'
      }, {
        validator: checkServiceNameExists
      }
    ],
    initialValue: name
  });
  const width = {
    width: 200
  }
  return (
    <Modal title="登录" visible onOk={handleOk} onCancel={onCancelClick}>
      <Form horizontal>
        <FormItem id="control-input" label="服务名称" {...formItemLayout}>
          <Input id="control-input" {...nameProps} placeholder="请输入服务名称。。。"/>
        </FormItem>
        <FormItem id="control-textarea" label="描述" {...formItemLayout}>
          <Input type="textarea" id="control-textarea" rows="3" {...getFieldProps('desc', {initialValue: desc})}/>
        </FormItem>
        <FormItem id="select" label="类型" {...formItemLayout}>
          <Select id="select" size="large" {...getFieldProps('type', {initialValue: type})} style={width}>
            <Option value="privary">私有</Option>
            <Option value="public">公开</Option>
            <Option value="protected">团队内部</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
}

export default createForm()(AddModal);
