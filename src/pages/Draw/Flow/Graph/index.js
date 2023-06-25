import {FunctionExt, Graph} from '@antv/x6'

export default class CustomGraph {
  isReadOnly = false;

  constructor(container, width, height) {
    const that = this
    const graph = new Graph({
      container,
      width,
      height,
      grid: true,
      history: true,
      keyboard: {
        enabled: true
      },
      snapline: {
        enabled: true,
        resizing: true
      },
      scroller: {
        enabled: true,
        pannable: true
      },
      resizing: {
        enabled: true
      },
      transforming: {
        clearAll: true,
        clearOnBlankMouseDown: true
      },
      translating: {
        restrict: true
      },
      selecting: {
        enabled: true,
        showNodeSelectionBox: true,
        showEdgeSelectionBox: true,
        rubberband: true,
        Strict: true,
        modifiers: 'ctrl',
        filter: ['image-node']
      },
      clipboard: {
        enabled: true
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'alt']
      },
      onPortRendered(args) {
      },
      highlighting: {
        nodeAvailable: {
          name: 'className',
          args: {
            className: 'available'
          }
        },
        magnetAvailable: {
          name: 'className',
          args: {
            className: 'available'
          }
        },
        magnetAdsorbed: {
          name: 'className',
          args: {
            className: 'adsorbed'
          }
        }
      },
      connecting: {
        snap: true,
        dangling: false,
        highlight: true,
        sourceAnchor: 'center',
        targetAnchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: true,
        createEdge() {
          return graph.createEdge({
            attrs: {
              line: {
                stroke: '#2A88FF',
                strokeWidth: 2,
                targetMarker: {
                  name: 'block',
                  args: {
                    size: '10'
                  }
                }
              }
            }
          })
        },
        validateMagnet({magnet}) {
          return true
        },
        validateConnection({sourceView, targetView, sourceMagnet, targetMagnet}) {
          if (that.isReadOnly) {
            return false
          }

          if (sourceView === targetView) {
            // 不允许连接到自己
            return false
          }

          // 只能从输出链接桩创建连接in\left\right
          //  || sourceMagnet.getAttribute('port-group') === 'in'
          if (!sourceMagnet) {
            return false
          }

          // 只能连接到输入链接桩
          return targetMagnet;
        }
      },
      interacting: function (cellView) {
        // || !that.graph.isSelected(cellView.cell) //|| cellView.cell instanceof ImageNode
        if (that.isReadOnly || cellView.cell ) {
          return {nodeMovable: false}
        }
        return true
      }
    })
    this.graph = graph;
    this.container = container;
    if (graph) {
      this.initEvent()
    }
    return graph;
  }

  initEvent() {
    const {container, graph} = this;
    graph.on('node:contextmenu', ({cell, view}) => {
      const oldText = cell.attr('text/textWrap/text')
      const elem = view.container.querySelector('.x6-edit-text')
      if (elem == null) {
        return
      }
      cell.attr('text/style/display', 'none')
      if (elem) {
        elem.style.display = ''
        elem.contentEditable = 'true'
        elem.innerText = oldText
        elem.focus()
      }
      const onBlur = () => {
        cell.attr('text/textWrap/text', elem.innerText)
        cell.attr('text/style/display', '')
        elem.style.display = 'none'
        elem.contentEditable = 'false'
      }
      elem.addEventListener('blur', () => {
        onBlur()
        elem.removeEventListener('blur', onBlur)
      })
    })

    graph.on('node:mouseenter', FunctionExt.debounce(() => {
        const ports = container.querySelectorAll('.x6-port-body')
        this.showPorts(ports, true)
      }), 500,)

    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body')
      this.showPorts(ports, false)
    })

    graph.on('node:collapse', ({node, e}) => {
      e.stopPropagation()
      node.toggleCollapse()
      const collapsed = node.isCollapsed()
      const cells = node.getDescendants()
      cells.forEach((n) => {
        if (collapsed) {
          n.hide()
        } else {
          n.show()
        }
      })
    })
  }

  initBindKeys() {
    const {graph} = this;

    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    })

    graph.bindKey('ctrl+c', () => {
      /*const cells = this.graph.getSelectedCells()
      if (cells.length) {
        cells.forEach(v => {
          if (v instanceof Craft) {
            v.data.pId = v.id
          }
        })
        this.graph.copy(cells)
      }
      return false*/
    })

    graph.bindKey('ctrl+v', () => {
      /*if (!this.graph.isClipboardEmpty()) {
        const contents = this.graph.getCellsInClipboard()
        contents.forEach(v => {
          if (v instanceof Craft) {
            v.data.uniqId = uuidv1()
          }
          if (v instanceof Equipment) {
            v.data.uniqId = uuidv1()
          }
        })
        const cells = this.graph.paste({offset: 32})
        this.graph.cleanSelection()
        this.graph.select(cells)
        // 需要发送信号，更新vuex. 判断cells是Craft还是Equipment
        eventBus.$emit('cell-copied', {cells})
      }
      return false*/
    })

    graph.bindKey('ctrl+up', () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        cells.forEach(v => {
          v.translate(0, -1)
        })
        this.graph.copy(cells)
      }
    })

    graph.bindKey('ctrl+down', () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        cells.forEach(v => {
          v.translate(0, 1)
        })
        this.graph.copy(cells)
      }
    })

    graph.bindKey('ctrl+left', () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        cells.forEach(v => {
          v.translate(-1, 0)
        })
        this.graph.copy(cells)
      }
    })

    graph.bindKey('ctrl+right', () => {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        cells.forEach(v => {
          v.translate(1, 0)
        })
        this.graph.copy(cells)
      }
    })
  }
}
