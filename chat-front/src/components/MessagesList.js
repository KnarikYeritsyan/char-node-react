import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { getMessagesList, messageOpenRequest } from "../store/actions/messages";
import { useDispatch, useSelector } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";
import moment from "moment";

function MessagesList(props) {
  const { friendId } = useParams();
  const dispatch = useDispatch();
  const ref = useRef();
  const [openPending, setOpenPending] = useState([]);

  const messagesList = useSelector(store => store.messages.messagesList)
  useEffect(() => {
    dispatch(getMessagesList(friendId, {}))
  }, [friendId]);

  useEffect(() => {
    if (messagesList.length) {
      ref.current.scrollTo(0, ref.current.scrollHeight)
    }
  }, [!!messagesList.length]);

  const handleVisibilityChange = useCallback((messageId) => (isVisible) => {
    if (isVisible) {
      setOpenPending([...openPending, messageId]);
    }
  }, [openPending]);

  const handleMouseMove = useCallback(() => {
    if (openPending.length) {
      openPending.map((messageId) => (
        dispatch(messageOpenRequest(messageId))
      ));
      setOpenPending([]);
    }
  }, [openPending]);

  return (
    <div className="messages" ref={ref} onMouseMove={handleMouseMove}>
      <ul>
        {[...messagesList].reverse().map(message => (
          <VisibilitySensor
            active={!message.seen && message.from === +friendId}
            onChange={handleVisibilityChange(message.id)}
          >
            <li key={message.id} className={`${message.from === +friendId ? 'sent' : 'replies'}`}>
              <div className="message">
                <img src={message.userFrom.avatar} className="avatar" alt="" />
                <p>{message.text}</p>
              </div>
              <span className="time">
                {moment(message.createdAt).calendar()}
                {message.seen ? <i className="fa fa-check" /> : null}
            </span>
            </li>
          </VisibilitySensor>
        ))}
      </ul>
    </div>
  );
}

export default MessagesList;
