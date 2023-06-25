import {Component, ErrorInfo, ReactNode} from "react";
import {WarningOutlined} from "@ant-design/icons";
import { Location } from 'react-router-dom';

interface Props {
  children?: ReactNode;
  location?: Location;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: { location: Location; }): void {
    if (prevProps.location !== this.props.location) {
      this.setState({
        hasError: false,
      });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // 处理错误日志
    console.log(error, info);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <WarningOutlined style={{color: 'red'}}/> 加载出错,请刷新页面
        </div>
      );
    }
    return this.props.children;
  }
}
