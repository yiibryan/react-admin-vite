import {Graph, Dom, Node} from '@antv/x6'

const ports = {
  groups: {
    top: {
      position: 'top',
        attrs: {
        circle: {
          r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
            visibility: 'hidden',
          },
        },
      },
    },
    right: {
      position: 'right',
        attrs: {
        circle: {
          r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
            visibility: 'hidden',
          },
        },
      },
    },
    bottom: {
      position: 'bottom',
        attrs: {
        circle: {
          r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
        attrs: {
        circle: {
          r: 3,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'top',
    },
    {
      group: 'right',
    },
    {
      group: 'bottom',
    },
    {
      group: 'left',
    },
  ],
}

const flowChartRectOption = {
  inherit: 'rect',
  width: 80,
  height: 42,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    fo: {
      refWidth: '100%',
      refHeight: '100%',
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    'edit-text': {
      contenteditable: 'false',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(0,0,0,0.85)',
      },
    },
    text: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.85)',
      textWrap: {
        text: '',
        width: -10,
      },
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'foreignObject',
      selector: 'fo',
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: 'body',
          selector: 'foBody',
          children: [
            {
              tagName: 'div',
              selector: 'edit-text',
            },
          ],
        },
      ],
    },
  ],
  ports
}

const flowChartImageRectOption = {
  inherit: 'rect',
  width: 200,
  height: 60,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    image: {
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      width: 16,
      height: 16,
      x: 12,
      y: 12,
    },
    title: {
      text: 'Node',
      refX: 40,
      refY: 14,
      fill: 'rgba(0,0,0,0.85)',
      fontSize: 12,
      'text-anchor': 'start',
    },
    text: {
      text: 'this is content text',
      refX: 40,
      refY: 38,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  ports
}

const flowChartTitleRect = {
  inherit: 'rect',
  width: 200,
  height: 68,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    head: {
      refWidth: '100%',
      stroke: 'transparent',
      height: 28,
      fill: 'rgb(95,149,255)',
    },
    image: {
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      height: 16,
      x: 6,
      y: 6,
    },
    title: {
      text: 'Node',
      refX: 30,
      refY: 9,
      fill: '#ffffff',
      fontSize: 12,
      'text-anchor': 'start',
    },
    text: {
      text: 'this is content text',
      refX: 8,
      refY: 45,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'rect',
      selector: 'head',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  ports
}

export const FlowChartRect = Graph.registerNode('flow-chart-rect', flowChartRectOption);
export const FlowChartImageRect = Graph.registerNode('flow-chart-image-rect', flowChartImageRectOption);
export const FlowChartTitleRect = Graph.registerNode('flow-chart-title-rect', flowChartTitleRect);


export class NodeGroup extends Node {
  // private collapsed = true

  postprocess() {
    this.toggleCollapse(true)
  }

  isCollapsed() {
    return this.collapsed
  }

  toggleCollapse(collapsed) {
    const target = collapsed == null ? !this.collapsed : collapsed
    if (target) {
      this.attr('buttonSign', {d: 'M 1 5 9 5 M 5 1 5 9'})
      this.resize(200, 40)
    } else {
      this.attr('buttonSign', {d: 'M 2 5 8 5'})
      this.resize(240, 240)
    }
    this.collapsed = target
  }
}
