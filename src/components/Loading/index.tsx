import {LoadingWrapper} from './index.style'

const Loading = () => {
  return (
    <LoadingWrapper>
      <div className="spin-wrapper">
          <span className="ant-spin-dot ant-spin-dot-spin">
            <i className="ant-spin-dot-item"/>
            <i className="ant-spin-dot-item"/>
            <i className="ant-spin-dot-item"/>
            <i className="ant-spin-dot-item"/>
          </span>
      </div>
    </LoadingWrapper>
    /*<div className="loading">
      <img src={ImgLoading} alt="" />
      <div>加载中...</div>
    </div>*/
  );
}

export default Loading;
