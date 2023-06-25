import {useNavigate, useSearchParams} from 'react-router-dom';
import {useLocation} from 'react-use';

function QueryContainer() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const {pathname} = useLocation();

  return (
    <>
      <p>链接：{pathname}</p>
      <p>参数：{searchParams.get('postId')}</p>
      <button onClick={() => navigate('/about')}>About</button>
    </>
  );
}

export default QueryContainer;
