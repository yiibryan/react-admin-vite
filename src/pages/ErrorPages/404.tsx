/* 404 NotFound */

import { Button } from "antd";
import Img from "@/assets/img/error.gif";
import {useNavigate} from "react-router-dom";
import "./index.less";

export default function NotFound() {
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate("/login");
  };
  return (
    <div className="page-error">
      <div>
        <div className="title">404</div>
        <div className="info">Oh dear</div>
        <div className="info">这里什么也没有</div>
        <Button className="backBtn" type="primary" ghost onClick={gotoHome}>
          返回登录页面
        </Button>
      </div>
      <img src={Img + `?${Date.now()}`} alt="" />
    </div>
  );
}
