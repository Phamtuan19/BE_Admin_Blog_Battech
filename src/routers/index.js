import userRoutes from "./Auth";
import commonRoute from './Common';

const routes = [{ ...userRoutes }, { ...commonRoute }];
export default routes;
