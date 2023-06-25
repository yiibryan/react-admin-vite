import styled from "styled-components";

export const SocialContainer = styled.div`

  .social-line {
    line-height: 20px;
    text-align: center;
    display: flex;
    align-content: center; //主轴居中对齐
    align-items: center; //交叉轴的中点对齐
    color: #8C92A4;

    &:before, &:after {
      display: block;
      content: "";
      height: 1px;
      flex: 1;
      background-color: #CCCCCC;
    }

    .text-muted {
      padding: 0 10px;
    }
  }

  .social-auth-list {
    display: flex;
    font-size: 32px;
    justify-content: center;
    margin:0;
    padding: 15px 0 0;
    line-height: 1;
    list-style: none;
    
    li + li {
      margin-left: 48px;
    }
    .social-icon{
      cursor: pointer;
    }

    .social-github {
      color: #0a0203;
    }

    .social-dingding,
    .social-alipay{
      color: #3795F9;
    }
    .social-wechat{
      color: #52c41a;
    }
    .social-qq{
      color: #3795F9;
    }
}
`
