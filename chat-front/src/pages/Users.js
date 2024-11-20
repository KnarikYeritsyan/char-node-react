import React, { useState } from 'react';
import users from '../data/users.json'
import { Link } from "react-router-dom";

function Users(props) {
  const [user, setUser] = useState('');
  const [friend, setFriend] = useState('');
  return (
    <div>
      <select value={user} onChange={ev => setUser(ev.target.value)}>
        <option value="">Login</option>
        {users.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <select value={friend} onChange={ev => setFriend(ev.target.value)}>
        <option value="">Friend</option>
        {users.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>
      <Link to={`/messages/${user}/${friend}`}>
        Message
      </Link>
    </div>
  );
}

export default Users;
