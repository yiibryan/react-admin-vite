import { renderRouters } from "@/utils/renderRoutes";

const Layout = ({ route }:any) => <>{renderRouters(route.routes)}</>;

export default Layout;
