import { apiAccessControlMiddleware } from "./middleware/apiAccessControlMiddleware";
import { localeManagerMiddleware } from "./middleware/localeManagerMiddleware";
import { stackMiddlewares } from "./middleware/stackMiddlewares";

const middlewares = [apiAccessControlMiddleware, localeManagerMiddleware];
export default stackMiddlewares(middlewares);

export const config = {
    matcher: [
        '/((?!_next).*)'
    ],
}