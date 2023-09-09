  // // this is the node server
  // let http = require('http')
  // const server = http.createServer();
  const io = require('socket.io')(8000,{
    cors: {
      origin: "http://127.0.0.1:5501",
      methods: ["GET", "POST"]
    }
  });
  const users = {};

  io.on('connection' , socket =>{
    socket.on('new-user-joined',name =>{
      console.log( "new usre",name)
      users[socket.id] = name ; 
      socket.broadcast.emit('user-joined' , name);
    })
    socket.on('send' , message =>{
      console.log(users[socket.id])
      socket.broadcast.emit('receive' , {message : message , name : users[socket.id]});
    })
    socket.on('disconnect', message =>{
      socket.broadcast.emit('left' , users[socket.id]);
      delete users[socket.id];
    })
  })
//  server.listen(8000)