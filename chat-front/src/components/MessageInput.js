import React, { useCallback, useState } from 'react';
import { registrationRequest, sendMessage } from "../store/actions/messages";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { socketTyping } from "../store/actions/socket";

function MessageInput(props) {
  const dispatch = useDispatch();
  const { friendId } = useParams();
  const [text, setText] = useState('');
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
    if (!text) {
      return;
    }
    dispatch(sendMessage({
      friendId,
      text,
    }));
    setText('');
  }, [friendId, text]);

  const handleChange = useCallback((ev) => {
    setText(ev.target.value)
    dispatch(socketTyping(friendId));
  }, [])
  return (
    <form onSubmit={handleSubmit} className="message-input">
      <div className="wrap">
        <textarea value={text} onChange={handleChange} className="input" type="text"
                  placeholder="Write your message..." />
        <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
        <button className="submit">
          <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
