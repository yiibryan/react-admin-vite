import QrCode from './components/QrCode'
import BarCode from './components/BarCode'
import QRCode from 'qrcode.react';
import QRLogo from '@assets/img/favicon.png';

const CodeContainer = () => {
  const number = "90010231234"
  const url = "https://www.jianshu.com/u/992656e8a8a6";

  const changeCanvasToPic = ()=>{
    const img = new Image();
    const canvasImg = document.getElementById('qrCode') as HTMLCanvasElement; // 获取canvas类型的二维码
    if(canvasImg){
      img.src = canvasImg.toDataURL('image/png'); // 将canvas对象转换为图片的data url
    }

    // const svgImg = document.getElementById('svgCode').outerHTML;
    // img.src = 'data:image/svg+xml,'+encodeURIComponent(svgImg);
    const downLink = document.getElementById('down_link')  as HTMLAnchorElement;
    if(downLink){
      downLink.href = img.src;
      downLink.download = '二维码'; // 图片name
    }
  }

  return (
    <>
      <div>
        <BarCode value={number}/>
        <BarCode value={number} tag="svg"/>
        <BarCode value={number} tag="img" />
      </div>
      <div>
        <QrCode value={number}/>
        <QrCode value={number} tag="span"/>
        <QrCode value={number} tag="img"/>
      </div>
      <div>
        <QRCode
          id="qrCode"
          value={url}
          size={200} // 二维码的大小
          fgColor={'#000000'} // 二维码的颜色
          bgColor={'#ffffff'}
          style={{ margin: 'auto' }}
          includeMargin={true}
          imageSettings={{ // 二维码中间的logo图片
            src: QRLogo,
            height: 40,
            width: 40,
            excavate: true, // 中间图片所在的位置是否镂空
          }}
        />
        <QRCode
          id='svgCode'
          value={url}
          size={200} // 二维码的大小
          fgColor="#000000" // 二维码的颜色
          bgColor={'#ffffff'}
          style={{ margin: 'auto' }}
          renderAs={'svg'}
          includeMargin={true}
          imageSettings={{ // 二维码中间的logo图片
            src: QRLogo,
            height: 40,
            width: 40,
            excavate: true, // 中间图片所在的位置是否镂空
          }}
        />
      </div>
      <div>
        <a id="down_link" onClick={changeCanvasToPic}>
          点击下载
        </a>
      </div>
    </>
  );
}

export default CodeContainer;
