import {ReactElement} from 'react'
import { Node } from '@antv/x6'

function CustomNode({ node }: { node: Node }): ReactElement {
  const {deptTitle, deptAmount} = node.getData();
  return (<div style={{border:'1px solid #333', height:'100%'}}>
    <header>{deptTitle}</header>
    <div className="ceil-body">基础金额：{deptAmount}</div>
  </div>)
}

export default CustomNode;
