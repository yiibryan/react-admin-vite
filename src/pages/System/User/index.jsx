import { getUserList } from '@/api/config'
import { randomString } from '@/utils'
import { ManOutlined, WomanOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import AddModal from './Modal/AddModal' // 用户新增弹框
import PasswordModal from './Modal/PasswordModal' //修改密码
import DelModal from '@components/Modal/DelModal' // 删除弹框
import { PageMainContent } from '@/style/index.style'
import { Form, Input, Button, Table, Space, message, Tag, Tooltip } from 'antd'
import '../index.less'

function UserContainer (props) {
  // 定义局部状态
  const [listData, setListData] = React.useState([]) // 列表数据获取
  const [total, setTotal] = React.useState(0) // 数据总条数
  const [pageSize, setPageSize] = React.useState(10) //分页
  const [current, setCurrent] = React.useState(1) // 页码
  const [currentItem, setCurrentItem] = React.useState(null) // 选中数据
  const [searchPrm, setSearchPrm] = React.useState({})
  const [addVisible, setAddVisible] = React.useState(false) // 用户新增弹框
  const [passVisible, setPassVisible] = React.useState(false) //用户密码弹框
  const [delVisible, setDelVisible] = React.useState(false) // 用户删除弹框
  const [loading, setLoading] = React.useState(false) // 表格加载状态
  const [form] = Form.useForm()
  /**
   * 获取列表数据
   */
  const getInitData = (e) => {
    setLoading(true)
    const page = {
      pageNum: current,
      pageSize: pageSize
    }
    let params = { ...searchPrm, ...page }
    getUserList(params)
      .then((res) => {
        if (res.success) {
          setListData(res.data)
          setTotal(res.totalRecords)
        } else {
          message.error(res.msg)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  /**条件查询 */
  const searchPrmInit = (val) => {
    setSearchPrm(val)
  }
  const onReset = () => {
    form.resetFields()
    setSearchPrm({})
  }

  const addRecord = () => {
    setCurrentItem(null)
    setAddVisible(true)
  }

  /**分页*/
  const pageSelect = (page) => {
    setCurrent(page)
  }

  /**分页条数 */
  const pageSizeSelect = (page, pageSize) => {
    setPageSize(pageSize)
  }

  useEffect(() => {
    getInitData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPrm, pageSize, current])

  const saveData = (item) => {
    console.log(item)
  }
  const delInitData = (item) => {
    console.log(item)
  }

  // 运营账号  用户管理
  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 80,
      render: (text, record, index) => (current -1) * pageSize + index + 1
    },
    { title: '姓名', width: 120, dataIndex: 'fullName', key: 'userId' },
    { title: '用户名', width: 120, dataIndex: 'username' },
    {
      title: '性别', width: 80, align: 'center', dataIndex: 'sex',
      render: text => {
        if(text === '男')
          return (
            <Tooltip placement="top" title={text}>
              <ManOutlined style={{fontSize: '16px', color:'#87d068'}} />
            </Tooltip>
          )
        else if(text === '女')
          return (
            <Tooltip placement="top" title={text}>
              <WomanOutlined style={{fontSize: '16px', color:'red'}} />
            </Tooltip>
          )
        return '-';
      }
    },
    {
      title: '手机号', width: 160, dataIndex: 'phone',
      render: text => <b>{text}</b>
    },
    {
      title: '角色',
      dataIndex: 'userDrs',
      render: (text) => {
        let userRole = new Set();
        text.forEach(item => {
          userRole.add(item['roleName']);
        })
        let userRoleList = Array.from(userRole);
        return userRoleList && userRoleList.length > 0 ?
          <>
            {
              userRoleList.map(item => <Tag color="orange" key={randomString(32)}>{item}</Tag>)
            }
          </>
          : '-'
      }
    },
    {
      title: '状态',
      width: 80,
      align: 'center',
      dataIndex: ['translation', 'stateStr'],
      render: text => {
        if (text === '启用') {
          return <Tag color="#87d068">{text}</Tag>
        } else if (text === '停用') {
          return <Tag color="red">{text}</Tag>
        }
        return '-'
      }
    },
    {
      title: '操作',
      render: (text, record) => (
        <Space size="middle" className="operation">
          <span
            onClick={() => {
              setCurrentItem(record)
              setAddVisible(true)
            }}
          >
            编辑
          </span>
          <span
            onClick={() => {
              setCurrentItem(record)
              setPassVisible(true)
            }}
          >
            修改密码
          </span>
          {/*<span onClick={ () => {
           setCurrentItem(record);
           setDelVisible(true)
           }}>删除</span >*/}
        </Space>
      )
    }
  ]

  return (
    <PageMainContent>
      <div className="top-bar">
        <div className="title">用户管理</div>

        <Form
          className="common-form"
          form={form}
          layout={'inline'}
          onFinish={searchPrmInit}
        >
          <Form.Item name="fullName">
            <Input placeholder="姓名" />
          </Form.Item>
          <Form.Item name="phone">
            <Input placeholder="手机号" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={addRecord}
            >
              新增
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table
        columns={columns}
        loading={loading}
        dataSource={listData}
        className="common-table"
        bordered
        rowKey={(record) => record.userId}
        pagination={{
          showQuickJumper: true,
          showTotal: (total) => {
            return `共${total}条`
          },
          current,
          pageSize,
          total,
          onChange: pageSelect,
          onShowSizeChange: pageSizeSelect
        }}
      />
      {addVisible ? (
        <AddModal
          save={(item) => {
            getInitData()
            saveData(item)
            setAddVisible(false)
          }}
          data={currentItem}
          close={() => {
            setAddVisible(false)
            setCurrentItem({})
          }}
        />
      ) : null}

      {passVisible ? (
        <PasswordModal
          save={(item) => {
            getInitData()
            setPassVisible(false)
          }}
          data={currentItem}
          close={() => {
            setPassVisible(false)
            setCurrentItem({})
          }}
        />
      ) : null}

      {delVisible ? (
        <DelModal
          save={(item) => {
            delInitData(item)
          }}
          data={currentItem}
          type="userDel"
          close={() => {
            setDelVisible(false)
            setCurrentItem({})
          }}
        >确定是否删除</DelModal>
      ) : null}
    </PageMainContent>
  )
}

export default React.memo(UserContainer)
