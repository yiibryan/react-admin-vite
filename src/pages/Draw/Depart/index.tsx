import CustomNode from "@/pages/Draw/Depart/Graph/CustomNode.tsx";
import {Graph} from "@antv/x6";
import {Drawing} from "@/pages/Draw/Depart/Graph/drawing.ts";
import {useEffect, useRef} from "react";
import {getDeptGraphConfig} from "@/pages/Draw/Depart/Graph/config.ts";
import {departData} from "@/pages/Draw/Depart/data.ts";
import {register} from "@antv/x6-react-shape";

// https://blog.csdn.net/xye1230/article/details/123574271
export default function Editor(){
  const drawing = new Drawing()
  const conRef = useRef(null)
  useEffect(()=>{
    register({
      shape: 'react-shape',
      width: 80,
      height: 100,
      effect: ['data'],
      component: CustomNode,
    });
    //这里是根据条件来注册自定义节点，然后渲染
    /*if(!registry.exist(RootNodeName)){
      // registerReactComponent为API接口 registerReactComponent
      Graph.registerNode(RootNodeName, (node)=>{
        return <CustomNode node={node} graphDrawing={grahDrawer} />
      })
    }*/
    //获取数据并处理
    drawing.loadData(departData)
    //这里getDeptGraphConfig方法是画布的配置
    drawing.graph =new Graph(getDeptGraphConfig(conRef.current))
    //渲染画布数据
    drawing.render()
  },[])

  //监听数据，实时更新并渲染
  useEffect(()=>{
    drawing.loadData(departData)
    drawing.render()
  },[drawing])

  return (<div id='container' ref={conRef}></div>)
}
