const ws = new require("ws")

const wsServer = new ws.Server({port: 5000})

// button.addEventListener("click", function())

const sockets = [];

wsServer.on("connection", (socket)=> {
    sockets.push(socket);
    // console.log("New frontend connect");
    setTimeout(()=> {
        socket.send("Welcome to server")
    }, 3000)
    console.log(sockets);
    sockets.forEach(item => {
        if(item !== socket) {
            item.send("New user connect")
        }
    })
})