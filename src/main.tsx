import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {App as AntdApp,ConfigProvider} from "antd";
import {store} from "@/redux/store.ts";
import AuthContextProvider from "@/context/AuthContext";
import EscapeAntd from "@components/EscapeAntd.tsx";
import App from './App.tsx'
import zhCN from "antd/locale/zh_CN";
import 'virtual:svg-icons-register'
import './index.css'

ReactDOM.createRoot(document.getElementById('application') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            // colorPrimary: '#00b96b',
          },
        }}
      >
        <AuthContextProvider>
          <AntdApp>
            <EscapeAntd />
            <App />
          </AntdApp>
        </AuthContextProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
