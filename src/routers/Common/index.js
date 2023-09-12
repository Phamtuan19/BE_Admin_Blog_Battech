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
            path: 'posts/topic',
            route: routeTopic,
        },
        {
            path: 'posts/author',
            route: authorRoute,
        },
        {
            path: 'posts/tags',
            route: tagRoute,
        },
    ],
};

export default commonRoute;
