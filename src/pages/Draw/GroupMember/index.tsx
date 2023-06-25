import {Graph} from '@antv/x6'
import {useEffect, useRef} from "react";

// https://blog.csdn.net/qq_43586648/article/details/115899934
export const orgNode = Graph.registerNode(
  'org-node',
  {
    width: 180,
    height: 60,
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'image',
        selector: 'avatar',
      },
      {
        tagName: 'text',
        selector: 'rank',
      },
      {
        tagName: 'text',
        selector: 'name',
      },
    ],
    attrs: {
      body: {
        refWidth: '100%',
        refHeight: '100%',
        fill: '#FFFFFF',
        stroke: '#000000',
        strokeWidth: 2,
        rx: 10, // 圆角
        ry: 10, // 圆角
        pointerEvents: 'visiblePainted',
      },
      avatar: {
        width: 30,
        height: 30,
        refX: 18,
        refY: 18,
      },
      name: {
        refX: 140,
        refY: 20,
        fontFamily: 'Courier New',
        fontSize: 14,
        fontWeight: '800',
        textAnchor: 'end',
      },
    },
  },
  true,
)

export const orgEdge = Graph.registerEdge(
  'org-edge',
  {
    zIndex: -1,
    attrs: {
      line: {
        fill: 'none',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        stroke: '#4b4a67',
        sourceMarker: null,
        targetMarker: null,
      },
    },
  },
  true,
)

const GroupMember = () => {
  const male = 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*kUy8SrEDp6YAAAAAAAAAAAAAARQnAQ'
  const female = 'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*f6hhT75YjkIAAAAAAAAAAAAAARQnAQ'
  const containerRef = useRef<HTMLDivElement>(null);

  // 添加节点
  const addMember = (graph, x, y, name, image, background, textColor?: string) => {
    return graph.addNode({
      x,
      y,
      shape: 'org-node',
      attrs: {
        body: {
          fill: background,
          stroke: 'none',
        },
        avatar: {
          opacity: 0.7,
          'xlink:href': image,
        },
        name: {
          text: name,
          fill: textColor || '#000',
          fontSize: 24,
          fontFamily: 'Arial',
          // letterSpacing: 0,
        },
      },
    })
  }

  const addLink = (graph, source, target, vertices) => {
    return graph.addEdge({
      vertices,
      source: {cell: source},
      target: {cell: target},
      shape: 'org-edge',
    })
  }

  const addGroup = (graph, x, y, width, height, array) => {
    const parent = graph.addNode({
      x,
      y,
      width,
      height,
      zIndex: 1,
      attrs: {
        body: {
          fill: 'rgba(255,255,255,0)',
          stroke: '#000000',
          opacity: 0.1,
          rx: 10, // 圆角
          ry: 10, // 圆角
        },
      },
    })
    array.forEach(val => {
      parent.addChild(val)
    })
  }

  const initDraw = (graph) => {
    const bart = addMember(graph, 300, 0, '王狗蛋1', male, 'red', '#f1f1f1');
    const homer = addMember(graph, 0, 200, '李狗蛋1', male, 'pink', '#f1f1f1')
    const marge = addMember(graph, 300, 200, '李狗蛋2', female, 'pink', '#f1f1f1')
    const lisa = addMember(graph, 600, 200, '李狗蛋3', female, 'pink', '#f1f1f1')
    const lenny = addMember(graph, 110, 350, '张狗蛋1', male, 'green')
    const maggie = addMember(graph, 410, 350, '张狗蛋2', female, 'green')
    const carl = addMember(graph, -110, 350, '刘狗蛋1', male, 'green')

    addLink(graph, bart, marge, [])
    addLink(graph, bart, homer, [
      {x: 390, y: 100}, //拐点
      {x: 90, y: 100},
    ])
    addLink(graph, bart, lisa, [
      {x: 390, y: 100},
      {x: 690, y: 100},
    ])
    addLink(graph, homer, lenny, [
      {x: 90, y: 380},
    ])
    addLink(graph, marge, maggie, [{x: 390, y: 380}])
    addLink(graph, homer, carl, [{x: 90, y: 380}])
    addGroup(graph, -20, 180, 820, 100, [homer, marge, lisa])
  }

  useEffect(() => {
    let graph;
    if(containerRef.current){
      graph = new Graph({
        container: containerRef.current,
        width: 800,
        height: 500,
        grid: true,
        connecting: {
          anchor: 'orth',
        },
        interacting: { // 禁止节点移动
          nodeMovable: false
        },
        translating: {
          restrict(view){
            if(!view) return null;
            const cell = view.cell
            if (cell.isNode()) {
              const parent = cell.getParent()
              if (parent) {
                return parent.getBBox()
              }
            }

            return null
          },
        },
      })
      graph.zoom(-0.25);
      initDraw(graph);
    }
  }, [initDraw])

  return (
    <div id="draw-container" ref={containerRef} style={{height: "500px"}}></div>
  )
}

export default GroupMember;








