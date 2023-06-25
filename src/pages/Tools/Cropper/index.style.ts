import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 120px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 60px;
  overflow: hidden;
  display: inline-block;
  background-color: #fff;
  position: relative;

  .upload-file-input {
    display: none;
    opacity: 0.0001;
  }

  .img-operation {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    background-color: rgba(0,0,0,0.1);
    display: none;
    
    .icon{
      cursor: pointer;
      color: #666;
    }
  }
  &:hover .img-operation{
    display: flex;
  }

  .img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: center;

    .img {
      height: 100%;
    }
  }
`
