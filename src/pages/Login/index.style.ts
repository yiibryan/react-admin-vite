import styled from 'styled-components';
import bg from '@/assets/img/logo_bg.png'

export const Page = styled.div`
  position: relative;
  margin: 0 auto;
  background: url(${bg}) center center no-repeat;
  background-size: cover;
  height: 100vh;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .main-content {
    width: 900px;
    height: 540px;
    background: linear-gradient(to left bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5));
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    
    header{
      flex: 1;

      .logo-wrapper {
        text-align: center;
        padding-top: 150px;
      }

      h2.title {
        margin: 0 auto;
        text-align: center;
        font-size: 28px;
        color: #3E7CE6;
        font-weight: bold;
        padding-top: 40px;
      }

      p {
        padding-top: 56px;
        text-align: center;

        a {
          color: #3E7CE6;
          font-size: 16px;
          display: inline-block;

          .icon{
            position: relative;
            top: 1px;
            margin-right: 10px;
          }
        }
      }
    }
  }
`;

export const Box = styled.div`
  width: 450px;
  margin: 0 auto;
  padding: 48px 60px 0;
  border-radius: 0 12px 12px 0;
  background-color: #fff;
  
  .sub-title{
    text-align: center;
  }

  h3 {
    display: inline-block;
    color: #4389F2;
    font-size: 26px;
    font-weight: normal;
    height: 54px;
    //border-bottom: 3px solid #4389F2;
    margin: 0 auto 20px;
  }

  .icon {
    color: #3E7CE6;
    font-size: 20px;
  }

  .summary {
    font-size: 14px;
    text-align: center;
    padding-bottom: 10px;
  }

  .form-command-judge {
    display: flex;
    justify-content: space-between;
    padding: 25px 0 20px;
  }

  .ant-form-item-control-input {
    min-height: 16px;
  }

  .ant-checkbox-inner {
    border-radius: 2px;
  }

  .form-command {
    padding-top: 10px;
  }
`
export const VerifyContainer = styled.div`
  display: flex;

  .field-verify-container {
    flex: 1;

    .field-verify-text {
      border-radius: 4px 0 0 4px;
    }
  }

  .field-verify {
    width: 126px;
    height: 60px;
    overflow: hidden;
    border: 1px solid #d9d9d9;
  }
`
