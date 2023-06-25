import {FlowContainerWrapper, FlowMainContainer} from '@/pages/Draw/Flow/style';
import {useEffect, useRef, useState} from 'react';
import CustomGraph from './Graph';
import ToolBar from '@/pages/Draw/Flow/ToolBar';
import StencilPanel from '@/pages/Draw/Flow/StencilPanel';
import ConfigPanel from '@/pages/Draw/Flow/ConfigPanel';

const Flow = () => {
  const flowRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState<boolean>(false)

  const getContainerSize = () => {
    return {
      width: document.body.offsetWidth - 581,
      height: document.body.offsetHeight - 87,
    }
  }

  useEffect(() => {
    const { width, height } = getContainerSize()
    const graph = new CustomGraph(flowRef.current, width, height)
    setIsReady(true)

    const resizeFn = () => {
      const { width, height } = getContainerSize()
      graph.resize(width, height)
    }
    resizeFn()

    window.addEventListener('resize', resizeFn)
    return () => {
      window.removeEventListener('resize', resizeFn)
      graph.destroy()
      setIsReady(false)
    }
  }, [])

  return (
    <FlowContainerWrapper>
      <StencilPanel/>
      <FlowMainContainer>
        {
          isReady && <ToolBar/>
        }
        <div ref={flowRef} className="flow-panel"/>
      </FlowMainContainer>
      {
        isReady && <ConfigPanel/>
      }
    </FlowContainerWrapper>
  )
}

export default Flow;
