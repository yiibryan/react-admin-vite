import React from 'react'
import { Form, Input, message, Modal } from 'antd'
import { userUpdate } from '@/api/config'

function PasswordModal (props) {
  const formRef = React.createRef()
  const {
    form,
    data
  } = props

  // 提交
  const beforeSave = e => {
    formRef.current.validateFields()
      .then(values => {
        console.log('表单值：', values)
        saveData({ ...values })
      })
      .catch(info => {
        console.log('Validate Failed:', info)
      })

  }

  const saveData = values => {
    userUpdate(values, data.userId).then(res => {
      if (res.success) {
        message.success('操作成功')
        props.save()
      } else {
        message.error(res.error)
      }
    })
  }

  return (
    <Modal className="addModal"
           title='修改密码' visible onOk={() => beforeSave()} onCancel={() => props.close()}
    >
      <Form form={form} initialValues={data} ref={formRef} name="dynamic_rule" labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}>
        <Form.Item

          name="username"
          label="昵称"
        >
          <Input placeholder="昵称" readOnly />
        </Form.Item>
        <Form.Item
          name="password"
          label="登录密码"
          rules={[
            {
              required: true,
              message: '请输入登录密码'
            }
          ]}
        >
          <Input.Password placeholder="请输入登录密码" />
        </Form.Item>
        <Form.Item
          name="repass"
          label="确认密码"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: '请再次输入登录密码'
            },
            ({ getFieldValue }) => ({
              validator (_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('两次密码不一致请检查!'))
              }
            })
          ]}
        >
          <Input.Password placeholder="请输入确认密码" />
        </Form.Item>
      </Form>
    </Modal>
  )

}

export default PasswordModal
