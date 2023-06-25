import {getVerifyCode} from '@/api'
import {CODE_DEBOUNCE, CODE_RANDOM_LEN} from '@utils/constant'
import {forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState} from 'react'
import styled from "styled-components";
import placeholderCode from '@/assets/img/code_placeholder.png';
import {randomString} from '@/utils';
import {debounce} from 'throttle-debounce'
import {AxiosError} from "axios";

type CodeWrapperProp = {
  width: number;
  height: number;
}
type VerifyCodeProps = {
  width: number;
  height: number;
  onChange: (num: string) => void;
};

const CodeWrapper = styled.div<CodeWrapperProp>`
  overflow: hidden;
  width: ${props => (props.width + "px")};
  height: ${props => (props.height + "px")};
  border-radius: 0 4px 4px 0;

  img {
    width: 100%;
    height: 100%;
    float: left;
  }
`

const VerifyCode = memo(forwardRef((props:VerifyCodeProps, ref) => {
  const [codeSrc, setCodeSrc] = useState(placeholderCode)
  const {width, height, onChange } = props

  const getVCode = debounce(CODE_DEBOUNCE, useCallback(()=>{
    const randomNum = randomString(CODE_RANDOM_LEN)
    getVerifyCode(width, height, {imageDeviceId: randomNum }).then((res: any) => {
      if(res) {
        // const blob = new Blob([res.data], {type: 'image/jpeg'});
        // const imageUrl = (window.URL || window.webkitURL).createObjectURL(blob);
        // setCodeSrc(imageUrl)

        const reader = new FileReader()
        reader.readAsDataURL(res.data)
        reader.onload = (e) => {
          setCodeSrc(e.target!.result as string)
        }
        onChange(randomNum)
      }
    }).catch((err: AxiosError) => {
      console.log(err)
    });
  },[height, width, onChange]))

  useImperativeHandle(ref, () => ({
    reset: () => getVCode()
  }));

  useEffect(
    () => getVCode(),
    // eslint-disable-next-line
    []
  );

  return (
    <CodeWrapper width={width} height={height}>
      <img src={codeSrc} alt="验证码" onClick={getVCode} />
    </CodeWrapper>
  );
}));
export default VerifyCode;
