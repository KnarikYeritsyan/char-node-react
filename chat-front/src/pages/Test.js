import React, { useCallback, useEffect, useState } from 'react';
import socket from "socket.io-client";

// const io = socket('http://192.168.1.114:4000');
// io.on('connect', () => {
//   // io.emit('typing')
//   console.log('connected');
// })

function Test(props) {
  const [messagesList, setMessagesList] = useState([]);
  const [name, sentName] = useState('');
  const [message, setMessage] = useState('');
  // useEffect(() => {
  //   io.on('newMessage', (data) => {
  //     setMessagesList((messagesList) => {
  //       return [...messagesList, data]
  //     });
  //   })
  // }, [])
  const handleSend = useCallback(() => {
    // io.emit('sendMessage', {
    //   name, message
    // });
    setMessage('');
  }, [name, message]);
  return (
    <div>
      <input value={name} onChange={(ev) => sentName(ev.target.value)} type="text" placeholder="Name" />
      <br />
      <textarea value={message} onChange={(ev) => setMessage(ev.target.value)} name="" id="" cols="30"
                rows="10"></textarea>
      <button onClick={handleSend}>Send</button>

      <div>
        <ul>
          {messagesList.map(m => (
            <li key={m.id}>
              <strong>{m.name}</strong>
              {' '}
              {m.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Test;
