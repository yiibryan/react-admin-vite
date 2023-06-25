import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

import DocTitle from "@/components/DocTitle";
import ScrollToTop from '@/hooks/ScrollTop'

import BasicLayout from "@/layouts/BasicLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import NoMatch from "@/pages/ErrorPages/404";

dayjs.locale('zh-cn');

function App() {
  return (
    <BrowserRouter basename={import.meta.env.VITE_PUBLIC_PATH}>
      <ScrollToTop />
      <Routes>
        <Route index path="/" element={<DocTitle title={'首页'} Component={Landing} />} />
        <Route path="/login" element={<DocTitle title={'登录'} Component={Login} />} />
        <Route path="/404" element={<DocTitle title={'404'} Component={NoMatch} />} />
        <Route path="/*" element={<BasicLayout />} />
        <Route path='*' element={<Navigate to='/404' replace={true} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
