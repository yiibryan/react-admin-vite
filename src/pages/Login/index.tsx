import { login } from '@/api'
import { routers } from '@/routes'
import { LockOutlined, MailOutlined, MobileOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
import logoGuoJiu from '@/assets/img/logo-gj.png'
import SocialOauth from '@/components/SocialOauth'
import VerifyCode from '@/components/VerifyCode'
import { generateChildRouters, getLeafPath, timeFix } from '@/utils'
import { ACCESS_MENU, ACCESS_TOKEN, ACCESS_USER_INFO } from '@/utils/constant.ts'
import { Button, Form, Input, message, notification } from 'antd'
import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import { Box, Page, VerifyContainer } from './index.style'
import {getAppEnvConfig} from "@/utils/env";
import {finalize} from "rxjs";
import {AuthContext} from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verifyCodeRef = useRef();
  const [loading, setLoading] = useState(false);
  // const [loginError, setLoginError] = useState<boolean>(false);
  const { onLoggedIn } = useContext(AuthContext);

  const {
    VITE_GLOB_APP_TITLE,
  } = getAppEnvConfig();
  const [imageDeviceId, setImageDeviceId] = useState("");

  const changeImageDeviceId = useCallback((deviceId: string) => setImageDeviceId(deviceId), [])

  useEffect(
    () => {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.clear();
    },
    []
  );

  const openNotification = () => {
    const args = {
      message: "登录成功",
      description: `${timeFix()}，欢迎回来`,
      duration: 1.5,
    };
    notification.success(args);
  };

  const getAuthThirdPart = useCallback((type: string, redirectUrl: string) => {
    console.log('third', type, redirectUrl);
  }, []);

  // const reset = () => verifyCodeRef.current?.reset();

  const goNext = () => {
    let redirect = searchParams.get('redirect');
    const tempRouters = generateChildRouters(routers);
    localStorage.setItem(ACCESS_TOKEN, '1');
    localStorage.setItem(ACCESS_USER_INFO, JSON.stringify({fullName: 'admin'}))
    localStorage.setItem(ACCESS_MENU, JSON.stringify(tempRouters));
    if (!!redirect &&  redirect !== '/' && redirect !== 'undefined'){
      redirect = decodeURIComponent(redirect);
      navigate(redirect);
    } else {
      console.log('getLeafPath', getLeafPath(tempRouters));
      navigate(getLeafPath(tempRouters));
    }
  }

  const onFinish = (values) => {
    goNext();
    if (loading) {
      return;
    }
    setLoading(true);
    const {username, password, imageCode} = values;
    login(username, password, imageCode, imageDeviceId)
      .pipe(
        finalize(() => {
          setLoading(false);
        })
      )
      .subscribe({
        next: (res) => {
          if (res && res.success) {
            openNotification();
            onLoggedIn(res);
            goNext();
          } else {
            message.error(res.msg || "登录失败").then(() => {
              // verifyCodeRef.current?.reset();
            });
          }
        },
        error: (err: Error) => {
          message.error("登录出现错误。").then(() => {
            console.log(err.message);
            // verifyCodeRef.current.reset();
          });
        },
      });
  };


  return (
    <Page>
      <div className="main-content">
        <header>
          <div className="logo-wrapper">
            <img className="logo-gj" src={logoGuoJiu} alt="国久大数据" />
          </div>
          <h2 className="title">{VITE_GLOB_APP_TITLE}</h2>
          <p>
            <a href="mailto:superadmin@gjbigdata.com">
              <MailOutlined className="icon" />
              联系管理员
            </a>
          </p>
        </header>
        <Box>
          <div className="sub-title">
            <h3>账号登录</h3>
          </div>
          <Form
            name="signIn"
            layout="vertical"
            initialValues={{}}
          >
            <Form.Item
              name="username"
              messageVariables={{ label: "请输入手机号码" }}
              rules={[{ required: true, message: "请输入手机号码" }]}
            >
              <Input
                size="large"
                prefix={<MobileOutlined className="icon" />}
                placeholder="用户名"
                autoComplete="off"
              />
            </Form.Item>

            <Form.Item
              name="password"
              messageVariables={{ label: "请输入登录密码" }}
              rules={[{ required: true, message: "请输入登录密码" }]}
            >
              <Input.Password
                size="large"
                visibilityToggle={false}
                prefix={<LockOutlined className="icon"/>}
                placeholder="密码"
                autoComplete="off"
              />
            </Form.Item>

            <VerifyContainer>
              <Form.Item
                className="field-verify-container"
                name="imageCode"
                messageVariables={{ label: "请输入校验码" }}
                rules={[{ required: true, message: "请输入校验码" }]}
              >
                <Input
                  className="field-verify-text"
                  size="large"
                  prefix={
                    <SafetyCertificateOutlined className="icon" />
                  }
                  placeholder="校验码"
                  autoComplete="off"
                  maxLength={4}
                />
              </Form.Item>
              <VerifyCode
                ref={verifyCodeRef}
                width={126}
                height={40}
                onChange={changeImageDeviceId}
              />
            </VerifyContainer>

            <div className="form-command">
              <Button
                type="primary"
                block
                size="large"
                loading={loading}
                htmlType="submit"
                onClick={onFinish}
              >
                登录
              </Button>

              <div className="form-command-judge">
                <span>没有帐号？<Link to="/register">注册用户</Link></span>
                <span>已有帐号，<Link className="login-form-forgot" to="/password/find">忘记密码？</Link></span>
              </div>

              <SocialOauth getAuthThirdPart={getAuthThirdPart} />
            </div>
          </Form>
        </Box>
      </div>
    </Page>
  );
}

export default Login;
