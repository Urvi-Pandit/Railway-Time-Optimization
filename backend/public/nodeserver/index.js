const io = require('socket.io')(5500)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', team => {
        console.log("New user", team)
        users[socket.id] = team;
        socket.broadcast.emit('user-joined', team);
    })

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, team: users[socket.id] })
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id] );
    });
})