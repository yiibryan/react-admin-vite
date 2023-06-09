import {Graph, Node} from '@antv/x6'
// 划重点！这个不属于x6内的，要另下包，用来布局
import dagre from '@dagrejs/dagre'
import {createEdgeByInfo, getTreeRootNodeMeta} from "@/pages/Draw/Depart/Graph/shape.ts";

//我的方法和官网的不同，虽然是hooks的开发模式，但是还是用声明类的方法
//也推荐这种，因为比较全面，可观性好
export class Drawing {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public graph: Graph

  private nodes	//节点
  private edges	//边

  constructor() {
    this.nodes = []
    this.edges = []
  }

  //传入数据然后赋值
  public loadData(data: any) {
    const {deptNodes, deptEdges} = data
    this.nodes = deptNodes
    this.edges = deptEdges
  }

  //渲染
  public render() {
    this.graph.fromJSON({
      nodes: this.nodes.map((item: any) => {
        // 这里的getTreeRootNodeMeta方法是自定义节点的方法，用customMeta 来储存
        const customMeta = getTreeRootNodeMeta()
        return {
          ...item,
          ...customMeta,
          data: {
            ...item
          }
        }
      })
    })

    //addEdge是官网API，createEdgeByInfo是另写的，创建边
    this.edges.forEach((v) => {
      this.graph.addEdge(createEdgeByInfo(v))
    })

    //这一步是用来控制树的布局
    this.layout()
  }

  //下面就是纯ctrl c v了，基本无差错，除了宽高需要自行调整
  //下面用到的方法都是官网API
  public layout() {
    const dir = 'TB'
    const nodes = this.graph.getNodes()
    const edges = this.graph.getEdges()

    const g = new dagre.graphlib.Graph()
    g.setGraph({rankdir: dir, nodesep: 30, ranksep: 50})
    g.setDefaultEdgeLabel(() => ({}))

    const width = 246
    const height = 143
    nodes.forEach((node) => {
      g.setNode(node.id, {width, height})
    })
    edges.forEach((edge) => {
      const source = edge.getSource() as any
      const target = edge.getTarget() as any
      g.setEdge(source.cell, target.cell)
    })
    dagre.layout(g)

    g.nodes().forEach((id) => {
      const node = this.graph.getCellById(id) as Node
      if (node) {
        const pos = g.node(id)
        node.position(pos.x, pos.y)
      }
    })

    edges.forEach((edge) => {
      const source = edge.getSourceNode()
      const target = edge.getTargetNode()
      if(!source || !target) return;
      const sourceBBox = source.getBBox()
      const targetBBox = target.getBBox()
      if (sourceBBox.x !== targetBBox.x) {
        const gap = targetBBox.y - sourceBBox.y - sourceBBox.height
        const fix = sourceBBox.height
        const y = sourceBBox.y + fix + gap / 2

        edge.setVertices([
          {x: sourceBBox.center.x, y},
          {x: targetBBox.center.x, y}
        ])
      } else {
        edge.setVertices([])
      }
    })
    this.graph.centerContent()
  }

  //这里是一个缩放画布的功能，可根据具体业务来添加
  public zoomGraph(expand: boolean, factor = 0.1) {
    if (expand) {
      this.graph.zoom(factor)
    } else {
      this.graph.zoom(-factor)
    }
  }
}
