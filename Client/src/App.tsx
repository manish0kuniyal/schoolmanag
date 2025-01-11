import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function App() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userId,setUserId]=useState(0)

  useEffect(() => {
    const newSocket = io('http://localhost:3000/');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to the server');
      setUserId(newSocket.id)
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from the server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []); 

  return (
    <div className='text-center '>
      <p>Connection - {userId} - {isConnected ? 'Connected' : 'Disconnected'} </p>
    </div>
  );
}

export default App;
