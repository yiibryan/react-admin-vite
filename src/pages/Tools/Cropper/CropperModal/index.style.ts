import styled from "styled-components";

export const WrapperCropper = styled.div`
  display: flex;
  
  .cropper-container{
    width: 748px;
  }
  .preview-container{
    flex: 1;
    padding-left: 24px;
    
    h3{
      margin: 0;
      font-size: 14px;
      padding-bottom: 6px;
    }
    section{
      padding-bottom: 15px;
    }
    
    .cropper-preview{
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 60px;
      border: 1px solid #ccc;
      
      &.mini{
        width: 60px;
        height: 60px;
        border-radius: 30px;
      }
    }
  }
`;
export const ToolBar = styled.div`
  background-color: rgba(0, 0, 0, .5);
  color: #fff;
  height: 2rem;
  z-index: 2015;
  display: flex;
  margin: 4px auto 0;
  width: 14rem;
  
  .toolbar__button{
    background-color: transparent;
    border-width: 0;
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: .875rem;
    height: 2rem;
    text-align: center;
    width: 2rem;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: #0074d9;
      color: #fff;
    }
  }
`;
