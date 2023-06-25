import React, {memo, useEffect, useRef} from 'react';
import JsBarcode from 'jsbarcode';

interface BarCodeProps {
  value: string;
  tag?: string;
  format?: string;
  width?: number;
  height?: number;
  displayValue?: boolean;
  fontOptions?: string;
  font?: string;
  textAlign?: string;
  textPosition?: string;
  textMargin?: number;
  fontSize?: number;
  background?: string;
  lineColor?: string;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

const BarCode: React.FC<BarCodeProps> = memo((props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const {value, tag, ...option} = {
    format: 'CODE128',
    tag: 'canvas',
    width: 2,
    height: 100,
    displayValue: true,
    fontOptions: '',
    font: 'monospace',
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontSize: 20,
    background: '#ffffff',
    lineColor: '#000000',
    margin: 10,
    ...props
  }

  useEffect(() => {
    if (value && tag) {
      if (tag === 'svg') {
        new JsBarcode(svgRef.current, value, option);
      } else if (tag === 'img') {
        new JsBarcode(imgRef.current, value, option);
      } else {
        new JsBarcode(canvasRef.current, value, option);
      }
    }
  }, [value, tag, option])

  let renderNode;
  if (tag === 'svg') {
    renderNode = <svg ref={svgRef}/>
  } else if (tag === 'img') {
    renderNode = <img ref={imgRef} alt="" style={{verticalAlign: 'top'}}/>
  } else {
    renderNode = <canvas ref={canvasRef}/>
  }
  return renderNode;
})
export default BarCode;


