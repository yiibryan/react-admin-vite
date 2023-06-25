import React, { useEffect } from "react";
import { Form, Input, message, Modal, Select } from "antd";
import { userAdd, userUpdate, roleListData } from "@/api/config";

function AddModal(props) {
  const formRef = React.createRef();
  console.log(props.data);
  const { Option } = Select;
  const { data } = props;
  const [roleList, setRoleList] = React.useState([]); // 角色
  // 标题
  const formateTitle = () => {
    let title = "";
    if (data.userId) {
      title += "编辑";
    } else {
      title += "新增";
    }
    return title;
  };
  useEffect(() => {
    roleData(); // 获取角色列表
    if (data.userId) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = (e) => {
    let roleArr = [];
    if (data.userDrs && data.userDrs.length > 0) {
      data.userDrs.map((item) => {
        roleArr.push(item.roleId);
        return item;
      });
    }
    data.roleTypes = roleArr;
    data.state = data.translation.stateStr === "启用" ? "00002" : "00003";
    formRef.current?.setFieldsValue(data);
  };
  // 提交
  const beforeSave = (e) => {
    formRef.current
      ?.validateFields()
      .then((values) => {
        let roleAndDeps = [];
        if (values.roleTypes.length > 0) {
          values.roleTypes.map((item) => {
            roleAndDeps.push({ departmentId: "", roleId: item });
            return item;
          });
        }
        data.userId
          ? (values.userDrs = roleAndDeps)
          : (values.roleAndDeps = roleAndDeps);
        saveData({ ...values });
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  // 新增
  const saveData = (values) => {
    (data.userId ? userUpdate(values, data.userId) : userAdd(values)).then(
      (res) => {
        if (res.success) {
          message.success("操作成功");
          formRef.current.resetFields();
          props.save();
        } else {
          message.error(res.msg);
        }
      }
    );
  };
  // 全部角色获取
  const roleData = (values) => {
    roleListData().then((res) => {
      if (res.success) {
        setRoleList(res.data);
      }
    });
  };
  const setRole = (e) => {
    console.log(e);
  };

  return (
    <Modal
      className="addModal"
      title={formateTitle()}
      visible
      onOk={() => beforeSave()}
      onCancel={() => props.close()}
    >
      <Form
        initialValues={data}
        ref={formRef}
        name="dynamic_rule"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          name="phone"
          label="手机号码"
          rules={[
            {
              required: true,
              message: "请输入11位手机号码",
              validator(_, value) {
                let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
                if (!reg.test(value)) {
                  return Promise.reject("账号只能是11位手机号");
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="请输入手机号码" />
        </Form.Item>

        {props.data.userId ? null : (
          <Form.Item
            name="password"
            label="登录密码"
            hasFeedback
            rules={[
              {
                required: true,
                message: "请输入登录密码",
              },
            ]}
          >
            <Input.Password placeholder="请输入登录密码" />
          </Form.Item>
        )}
        {props.data.userId ? null : (
          <Form.Item
            name="repass"
            label="确认密码"
            hasFeedback
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "请输入确认密码",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("输入密码不一致！");
                },
              }),
            ]}
          >
            <Input.Password placeholder="请输入确认密码" />
          </Form.Item>
        )}
        <Form.Item
          name="fullName"
          label="姓名"
          rules={[
            {
              required: true,
              message: "请输入姓名",
            },
          ]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          name="username"
          label="昵称"
          rules={[
            {
              required: true,
              message: "请输入昵称",
            },
          ]}
        >
          <Input placeholder="请输入昵称" />
        </Form.Item>

        <Form.Item
          name="sex"
          label="性别"
          hasFeedback
          rules={[{ required: true, message: "请选择性别" }]}
        >
          <Select placeholder="请选择">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="roleTypes"
          label="角色"
          rules={[{ required: true, message: "请选择角色", type: "array" }]}
        >
          <Select
            onChange={(e) => setRole(e)}
            mode="multiple"
            placeholder="请选择"
          >
            {roleList.map((item) => (
              <Select.Option key={item.roleId} value={item.roleId}>
                {item.roleName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="state"
          label="状态"
          hasFeedback
          rules={[{ required: true, message: "请选择状态" }]}
        >
          <Select placeholder="请选择">
            <Option value="00002">启用</Option>
            <Option value="00003">禁用</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
export default AddModal;
