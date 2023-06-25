import {Modal} from 'antd'
import {useCallback, useEffect, useRef, useState} from 'react'
import Cropper, {ReactCropperElement} from 'react-cropper' // 引入Cropper
import Draggable from 'react-draggable'
import 'cropperjs/dist/cropper.css' // 引入Cropper对应的css
import {ToolBar, WrapperCropper} from './index.style'
import SvgIcon from "@components/SvgIcon";

// import useEventListener from '@hooks/useEventListener'
interface CropperModalProps {
  fileModalVisible: boolean;
  uploadedImageFile: File |null,
  onClose: () => void;
  onSubmit: (blob:Blob) => void;
}

const CropperModal: React.FC<CropperModalProps> =
  ({
     fileModalVisible,
     uploadedImageFile,
     onClose,
     onSubmit
   }) => {
    const [src, setSrc] = useState<string>()
    const cropperRef = useRef<ReactCropperElement>(null)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
      if(uploadedImageFile){
        const fileReader = new FileReader()
        fileReader.onload = () => {
          const dataURL = fileReader.result as string
          setSrc(dataURL)
        }
        fileReader.readAsDataURL(uploadedImageFile)
      }
    }, [uploadedImageFile])


    /*useEventListener('keyup', (e)=>{
      console.log(e.key);
      switch(e.key) {

      }
    })*/

    const handleSubmit = useCallback(() => {
      // let filename = uploadedImageFile.name
      const imageElement = cropperRef.current;
      if(!imageElement) return;
      const cropper = imageElement.cropper;
      console.log('正在上传图片', cropperRef.current)
      // TODO: 这里可以尝试修改上传图片的尺寸
      cropper.getCroppedCanvas().toBlob(async blob => {
        // // 创造提交表单数据对象
        // const formData = new FormData()
        // // 添加要上传的文件
        // formData.append('file', blob, filename)
        // 提示开始上传 (因为demo没有后端server, 所以这里代码我注释掉了, 这里是上传到服务器并拿到返回数据的代码)
        // this.setState({submitting: true})
        // 上传图片
        // const resp = await http.post(url, formData)
        // 拿到服务器返回的数据(resp)
        // console.log(resp)
        // 提示上传完毕
        // this.setState({submitting: false})

        //把选中裁切好的的图片传出去
        blob && onSubmit(blob)

        // 关闭弹窗
        onClose()
      })
    }, [onClose, onSubmit])

    const handleCropperAction = (action) => {
      const imageElement = cropperRef.current;
      if(!imageElement) return;
      const cropper = imageElement.cropper;
      switch (action) {
        case 'move':
        case 'crop':
          cropper.setDragMode(action);
          break;

        case 'zoom-in':
          cropper.zoom(0.1);
          break;

        case 'zoom-out':
          cropper.zoom(-0.1);
          break;

        case 'rotate-left':
          cropper.rotate(-45);
          break;

        case 'rotate-right':
          cropper.rotate(45);
          break;

        case 'flip-horizontal':
          cropper.scaleX(-cropper.getData().scaleX || -1);
          break;

        case 'flip-vertical':
          cropper.scaleY(-cropper.getData().scaleY || -1);
          break;

        case 'reset':
          cropper.reset();
          break;
        default:
      }
      console.log('cropper', action, cropper);
    };

    return (
      <Modal
        title={
          <div
            className="modal-draggable-title"
            style={{
              width: '100%',
              cursor: 'move',
            }}
            onMouseOver={() => setDisabled(false)}
            onMouseOut={() => setDisabled(true)}
          >
            头像编辑
          </div>
        }
        width={940}
        className="modal-adjust"
        open={fileModalVisible}
        onOk={handleSubmit}
        onCancel={onClose}
        modalRender={modal => <Draggable handle=".modal-draggable-title"
                                         disabled={disabled}>{modal}</Draggable>}
      >
        <WrapperCropper>
          <div className="cropper-container">
            <Cropper
              src={src}
              className="cropper"
              ref={cropperRef}
              style={{height: 400}}
              // Cropper.js options
              viewMode={1}
              minCropBoxWidth={120}
              autoCropArea={0.7}
              aspectRatio={1} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
              guides={true}
              preview={'.cropper-preview'}
            />
            <ToolBar>
              <button
                className="toolbar__button"
                title="放大(I)"
                onClick={() => handleCropperAction('zoom-in')}
              >
                <SvgIcon name="search-plus"/>
              </button>
              <button
                className="toolbar__button"
                title="缩小(O)"
                onClick={() => handleCropperAction('zoom-out')}
              >
                <SvgIcon name="search-minus"/>
              </button>
              <button
                className="toolbar__button"
                title="向左旋转(L)"
                onClick={() => handleCropperAction('rotate-left')}
              >
                <SvgIcon name="undo-alt"/>
              </button>
              <button
                className="toolbar__button"
                title="向右旋转(R)"
                onClick={() => handleCropperAction('rotate-right')}
              >
                <SvgIcon name="redo-alt"/>
              </button>
              <button
                className="toolbar__button"
                title="垂直翻转(H)"
                onClick={() => handleCropperAction('flip-horizontal')}
              >
                <SvgIcon name="arrows-alt-h"/>
              </button>
              <button
                className="toolbar__button"
                title="水平翻转(V)"
                onClick={() => handleCropperAction('flip-vertical')}
              >
                <SvgIcon name="arrows-alt-v"/>
              </button>
              <button
                className="toolbar__button"
                title="重置"
                onClick={() => handleCropperAction('reset')}
              >
                <SvgIcon name="reset"/>
              </button>
            </ToolBar>
          </div>
          <div className="preview-container">
            <section>
              <h3>尺寸120px:</h3>
              <div className="cropper-preview"/>
            </section>
            <section>
              <h3>尺寸60px:</h3>
              <div className="cropper-preview mini"/>
            </section>
          </div>
        </WrapperCropper>
      </Modal>
    )
  }

export default CropperModal
