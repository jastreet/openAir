async function chat() {
    const node = await IPFS.create();
    const id = await node.id();
    const room = new Room(node, 'uw');
    console.log(id);
  
    room.on('peer joined', (peer) => {
      console.log('peer ' + peer + ' joined');
      eventEmitter.emit('connection');
    });
    room.on('peer left', (peer) => console.log('peer ' + peer + ' left'));
  
    room.on('peer joined', (peer) => room.sendTo(peer, 'Hello ' + peer + '!'));
  
    room.on('message', (message) => {
      console.log('message from ' + message.from + ': ' + message.data.toString());
      eventEmitter.emit('message');
    });
  
    setInterval(() => room.broadcast('hey everyone!'), 2000);
  }