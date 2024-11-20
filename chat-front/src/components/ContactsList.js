import React, { useEffect } from 'react';
import { usersListRequest } from "../store/actions/users";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { Link, NavLink } from "react-router-dom";

function ContactsList(props) {
  const dispatch = useDispatch();
  const usersList = useSelector(store => store.users.usersList);

  useEffect(() => {
    dispatch(usersListRequest())
  }, []);

  return (
    <>
      <div id="search">
        <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
        <input type="text" placeholder="Search contacts..." />
      </div>
      <div id="contacts">
        <ul>
          {usersList.map(user => (
            <li className="contact">
              <NavLink to={`/messages/${user.id}`}>
                <div className="wrap">
                  <span className={`contact-status ${user.isOnline ? 'online' : ''}`}></span>
                  <img src={user.avatar} className="avatar" alt="" />
                  <div className="meta">
                    <p className="name">
                      {user.firstName + " " + user.lastName}
                      <sub>
                        {' '}
                        {!user.isOnline && user.lastLogin ? moment(user.lastLogin).calendar() : null}
                      </sub>
                    </p>
                    <p className="preview">You just got LITT up, Mike.</p>
                  </div>
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ContactsList;
