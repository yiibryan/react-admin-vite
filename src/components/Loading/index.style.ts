import styled, { keyframes } from 'styled-components'

const antSpinMove = keyframes`
  to {
    opacity: 1;
  }
`

const antRotate = keyframes`
  to {
    transform: rotate(405deg);
  }
`

export const LoadingWrapper = styled.div`
    min-height: 240px;
  
  .spin-wrapper {
    display: block;
    width: 160px;
    height: 160px;
    text-align: center;
    margin: 0 auto;
    padding-top: 30px;
    .load-text {
      font-size: 14px;
      color: #1890ff;
      opacity: 0.5;
      padding-top: 10px;
    }
  }
  .ant-spin-dot {
    position: relative;
    display: inline-block;
    font-size: 20px;
    width: 60px;
    height: 60px;
  }
  .ant-spin-dot-spin {
    transform: rotate(45deg);
    animation: ${antRotate} 1.2s linear infinite;
  }
  .ant-spin-dot-item {
    position: absolute;
    display: block;
    width: 24px;
    height: 24px;
    background-color: #1890ff;
    border-radius: 100%;
    transform: scale(0.75);
    transform-origin: 50% 50%;
    opacity: 0.3;
    animation: ${antSpinMove} 1s linear infinite alternate;
  }
  .ant-spin-dot{
    .ant-spin-dot-item:first-child {
      top: 0;
      left: 0;
    }
    .ant-spin-dot-item:nth-child(2) {
      top: 0;
      right: 0;
      animation-delay: 0.4s;
    }
    .ant-spin-dot-item:nth-child(3) {
      right: 0;
      bottom: 0;
      animation-delay: 0.8s;
    }
    .ant-spin-dot-item:nth-child(4) {
      bottom: 0;
      left: 0;
      animation-delay: 1.2s;
    }
  } 
`
