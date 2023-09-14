import authorRoute from "./author.route";
import tagRoute from "./tag.route";
import routeTopic from "./topic.route";
import postRoute from "./post.route";

const commonRoute = {
    prefix: '/',
    routes: [
        {
            path: 'posts',
            route: postRoute,
        },
        {
            path: 'topic',
            route: routeTopic,
        },
        {
            path: 'author',
            route: authorRoute,
        },
        {
            path: 'tags',
            route: tagRoute,
        },
    ],
};

export default commonRoute;
