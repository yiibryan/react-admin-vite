import {Button} from 'antd'
import {useNavigate} from 'react-router-dom'
import {Header, Logo} from './index.style'
import logo from '@/assets/img/logo.svg';

function Landing() {
  console.log('app load');
  const navigate = useNavigate();
  const goDashboard = ()=>{
    navigate('/login')
  }

  return (
    <Header>
      <Logo src={logo} alt="logo" />
      <div className="user-info">
        <Button type="primary" onClick={goDashboard} >登录</Button>
      </div>
    </Header>
  );
}

export default Landing;
