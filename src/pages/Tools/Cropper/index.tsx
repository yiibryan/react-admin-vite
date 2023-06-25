import { CameraOutlined } from '@ant-design/icons'
import {useState, useRef} from 'react';
import CropperModal from '@/pages/Tools/Cropper/CropperModal'
import { Wrapper } from '@/pages/Tools/Cropper/index.style'
import avatar from '@/assets/img/avatar.png';

const CropperJSWrapperExample = () => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 文件最大限制为5M
  const [fileModalVisible, setFileModalVisible] = useState(false)
  const [imgFile, setImgFile] = useState<File|null>(null)
  const [imgUrl, setImgUrl] = useState<string>()
  const inputFileRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  const handleFileChange = e => {
    console.log('handleFileChange');
    const file = e.target.files[0]
    console.log(file);
    if (file) {
      if (file.size <= MAX_FILE_SIZE) {
        setImgFile(file);
        setFileModalVisible(true);
      } else {
        console.log('文件过大')
      }
    }
    e.target.value='';
  }

  const handleGetResultImgUrl = blob => {
    const str = URL.createObjectURL(blob)
    setImgUrl(str);
  }

  const handleCancel = ()=>{
    setFileModalVisible(false);
    setImgFile(null);

  }

  const triggerFileInput = () =>{
    inputFileRef.current && inputFileRef.current.click()
  }

  return (
    <>
      <Wrapper>
        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          className="upload-file-input"
          onChange={handleFileChange}
          ref={inputFileRef as React.RefObject<HTMLInputElement>}
        />
        <div className="img-operation">
          <CameraOutlined className="icon"  onClick={triggerFileInput} />
        </div>
        <div className="img-container">
          {imgUrl && (
            <img
              className="img"
              src={imgUrl}
              alt="头像"
            />
          )}
          {!imgUrl && (
            <img
              className="img"
              src={avatar}
              alt="头像"
            />
          )}
        </div>
      </Wrapper>
      {
        fileModalVisible && (
          <CropperModal
            fileModalVisible={fileModalVisible}
            uploadedImageFile={imgFile}
            onSubmit={handleGetResultImgUrl}
            onClose={handleCancel}/>
      )}
    </>
  );
}

export default CropperJSWrapperExample
