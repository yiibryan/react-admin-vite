import {UploadOutlined} from '@ant-design/icons'
import useEventListener from '@/hooks/useEventListener'
import {TestTheme} from '@/pages/Dashboard/style'
// import {useRootStore} from '@/store/Provider'
import {Button, Form, Pagination, Select, Upload, UploadFile} from 'antd'
import { useRef, useState} from 'react'
import {Document, Page, pdfjs} from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PinyinMatch from 'pinyin-match'
import NumericInput from '@components/NumericInput';
import {useTranslation} from 'react-i18next';
import {RcFile} from "antd/es/upload";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.min.js`;
// const cMapUrl = `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`
const cMapUrl = `../cmaps/`

const DocumentPdf = () => {
  const [numPages, setNumPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const pageRef = useRef<HTMLDivElement>() // react-pdf 不要设初始值
  const [fileList, setFileList] = useState<UploadFile[]>([])
  // const [uploading, setUploading] = useState(false)
  const [filePreview, setFilePreview] = useState<any>(null)
  // const { themeStore } = useRootStore();
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const setMode = () => {
    // themeStore.randomTheme()
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const handleOnFields = (e) => {
    const target = e.target || e.srcElement
    const nodeName = target.nodeName.toLowerCase()
    if (['input', 'textarea'].includes(nodeName)) {
      console.log('click', target.name, nodeName)
    }
  }

  useEventListener('click', handleOnFields, pageRef.current)

  const uploadProp = {
    onRemove: (file: UploadFile) => {
      const index = fileList.indexOf(file)
      const newFileList = fileList.slice()
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: (file: UploadFile) => {
      const reader = new FileReader()
      reader.readAsDataURL(file as RcFile)
      reader.onload = () => {

        setFilePreview(reader.result)
      }
      /*let blob = this.response;
      that.setState({blob:this.response})
      let reader = new FileReader();
      reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
      reader.addEventListener("load", function () {
        console.log(reader, 'reader.result')
        let base64 = reader.result
        that.setState({
          PDFBlob: base64,
        })
      });*/
      // setFileList([...fileList, file])
      setFileList([file])
      return false
    },
    fileList
  }

  const onFinish = (values) => {
    console.log(values);
  }

  /*
  var pinyin = require('pinyin');
  option.pinyin = pinyin(option.children.toLowerCase(), {
        style: pinyin.STYLE_NORMAL
      }).join('').toLowerCase();
  option.py = pinyin(option.children.toLowerCase(), {
    style: pinyin.STYLE_FIRST_LETTER
  }).join('').toLowerCase();
  pinyinText.indexOf(filterValue.toLowerCase()) >= 0 ||
  pyText.indexOf(filterValue.toLowerCase()) >= 0
  */

  const filterOption = (input, option) =>
    !!PinyinMatch.match(option.children.toLowerCase(), input.toLowerCase())


  /*
  const pinyin = require('pinyin');
  const filterOption = (input, option) => {
    const optionText = option.children.toLowerCase()
    const inputText = input.toLowerCase()
    const fullPinYin = pinyin(optionText, { style: pinyin.STYLE_NORMAL }).join('').toLowerCase();
    const simplePinYin = pinyin(optionText, {style: pinyin.STYLE_FIRST_LETTER }).join('').toLowerCase();
    return optionText.indexOf(inputText) >=0
        || fullPinYin.indexOf(inputText) >= 0
        || simplePinYin.indexOf(inputText) >= 0
  }
  */

  return (
    <>
      <TestTheme>
        <p>{t('Test words')}</p>
      </TestTheme>

      <p>
        <Button onClick={setMode}>随机文字样式</Button>
      </p>

      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="numberic" label="数字" rules={[{ required: true }]}>
          <NumericInput autoComplete={'off'} value={1} placeholder={"请输入"} />
        </Form.Item>
        <Form.Item name="gender" label="测试" rules={[{ required: true }]}>
          <Select
            placeholder="请选择"
            allowClear
            showSearch
            mode="multiple"
            filterOption={filterOption}
          >
            <Select.Option value="li">礼物</Select.Option>
            <Select.Option value="te">行李箱</Select.Option>
            <Select.Option value="other">大番茄</Select.Option>
            <Select.Option value="ls">大小0</Select.Option>
            <Select.Option value="ls1">大小1</Select.Option>
            <Select.Option value="ls2">大小2</Select.Option>
            <Select.Option value="ls3">大小3</Select.Option>
            <Select.Option value="ls4">大小4</Select.Option>
            <Select.Option value="ls5">大小5</Select.Option>
            <Select.Option value="ls6">大小6</Select.Option>
            <Select.Option value="ls7">大小7</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <Upload maxCount={1} {...uploadProp}>
        <Button icon={<UploadOutlined />}>选择PDF模版</Button>
      </Upload>
      {
        filePreview && (
          <div style={{display: 'inline-block'}}>
            <Pagination simple defaultPageSize={1} onChange={setPageNumber} defaultCurrent={pageNumber} total={numPages} />
            <Document
              file={filePreview}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={'加载PDF...'}
              options={{
                cMapUrl,
                cMapPacked: true,
              }}
            >
              <Page
                renderForms
                width={900}
                pageNumber={pageNumber}
                inputRef={pageRef as React.RefObject<HTMLDivElement>}
                loading={'加载PDF...'}
              />
            </Document>
          </div>
        )
      }
    </>
  )
}

export default DocumentPdf
