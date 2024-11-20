import React, { useCallback, useEffect, useState } from 'react';
import socket from "socket.io-client";
import { useParams } from "react-router-dom";
import Wrapper from "../components/Wrapper";
import Profile from "../components/Profile";
import ContactsList from "../components/ContactsList";
import MessageTopBar from "../components/MessageTopBar";
import MessagesList from "../components/MessagesList";
import MessageInput from "../components/MessageInput";
import Typing from "../components/Typing";
import { useSelector } from "react-redux";

function Test(props) {
  const friendTyping = useSelector(store => store.messages.friendTyping)

  return (
    <Wrapper>
      <div id="frame">
        <div id="sidepanel">
          <Profile />
          <ContactsList />
          <div id="bottom-bar">
            <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>
              <span>Add contact</span></button>
            <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
          </div>
        </div>
        <div className="content">
          <MessageTopBar />
          <MessagesList />
          {friendTyping ? <Typing /> : null}
          <MessageInput />
        </div>
      </div>
    </Wrapper>
  );
}

export default Test;
