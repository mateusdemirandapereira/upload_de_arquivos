const http = require("http");
const socketIO = require("socket.io");
const { logger } = require("./util.js");
const Routes = require("./Routes.js");
const PORT = 3000;

const handle = function(request, response) {
    const defaultRoute = async(request, response) => response.end("hello");
    const routes = new Routes(io);
    const chosen = routes[request.method.toLowerCase()] || defaultRoute;

    return chosen.apply(routes, [request, response]);
}

const server = http.createServer(handle);
const io = socketIO(server, {
    cors: {
        origin: "*",
        Credential: false
    }
});
io.on("connection", socket => logger.info("someone connected " + socket.id));
// const interval = setInterval(() => {

//     io.emit("file-Uploaded", 5e6);
// }, 250);


const startServer = () => {

    logger.info(`app running at http://localhost:${PORT}`);

};


server.listen(PORT, startServer);