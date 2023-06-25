import React, {useEffect, useMemo, useRef} from 'react';
import JsQRCode from 'qrcode';

type NumberRange<
  L extends number,
  H extends number,
  CArr extends any[] = [],
  OArr extends unknown[] = [unknown],
  R extends number = H
> = H extends CArr['length']
  ? R
  : L extends CArr['length']
    ? NumberRange<OArr['length'], H, [any, ...CArr], [unknown, ...OArr], L | R>
    : NumberRange<L, H, [...CArr, any], [unknown, ...OArr]>;

type QrCodeColor = {
  dark: string;
  light: string;
}
export interface QrCodeProp {
  value: string;
  tag?: string;
  version?: number,
  errorCorrectionLevel?: "low"|"medium"|"quartile"|"high"|"L"|"M"|"Q"|"H";
  maskPattern?: NumberRange<0, 7>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  toSJISFunc?: Function;

  //Renderers options
  margin?: number;
  scale?: number;
  width?: number;
  color?: QrCodeColor;
}
const QrCode:React.FC<QrCodeProp> = (props) => {
  const defaultProps = {
    tag: 'canvas',
    margin: 4,
    scale: 4,
    width: 120,
    color: {
      dark: '#000000ff',
      light: '#ffffffff'
    }
  }

  const {value, tag, ...option} = useMemo(()=> ({...defaultProps, ...props}), [defaultProps, props])
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const tagRef = useRef<HTMLElement>(null);

  useEffect(()=>{
    if(tag && value) {
      if (tag === 'canvas') {
        JsQRCode.toCanvas(canvasRef.current, value, option, (error) => {
          if (error) {
            throw error;
          }
        });
      } else if (tag === 'img') {
        JsQRCode.toDataURL(value, option, (error, url) => {
          if (error) {
            throw error;
          }
          if(imgRef.current){
            imgRef.current.src = url;
          }
        });
      } else {
        JsQRCode.toString(value, option, (error, string) => {
          if (error) {
            throw error;
          }
          if(tagRef.current){
            tagRef.current.innerHTML = string;
          }
        });
      }
    }
  }, [tag, value, option])

  let renderNode;
  if (tag === 'canvas') {
    renderNode = <canvas ref={canvasRef} />
  } else if (tag === 'img') {
    renderNode = <img ref={imgRef} alt="" style={{ verticalAlign: 'top'}} />
  } else{
    const Tag = tag;
    renderNode = <Tag ref={tagRef} style={{ display: 'inline-block'}} />
  }
  return renderNode;
}
export default QrCode;
