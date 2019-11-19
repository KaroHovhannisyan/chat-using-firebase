import React from "react";
import {NO_AVATAR_IMAGE} from "../configs/constants";
import FirebaseApi from "../api";
import { FaSignOutAlt } from "react-icons/fa";

const Contacts = ({users, messages, currentUser}) => {

    const lastMessage = messages.length ? messages[messages.length -1]: {}
    return (
        <div id="sidepanel">
            <div id="profile">
                <div className="wrap">
                    <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online"
                         alt=""/>
                    <p>{"Email"}</p>
                    <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                    <div id="status-options">
                        <ul>
                            <li id="status-online" className="active"><span className="status-circle"></span>
                                <p>Online</p></li>
                            <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                            <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                            <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
                        </ul>
                    </div>
                    <div id="expanded">
                        <label htmlFor="twitter"><i className="fa fa-facebook fa-fw"
                                                    aria-hidden="true"></i></label>
                        <input name="twitter" type="text" value="mikeross"/>
                        <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
                        <input name="twitter" type="text" value="ross81"/>
                        <label htmlFor="twitter"><i className="fa fa-instagram fa-fw"
                                                    aria-hidden="true"></i></label>
                        <input name="twitter" type="text" value="mike.ross"/>
                    </div>
                </div>
            </div>
            <div id="contacts">
                <ul>
                    <li className="contact active">
                        <div className="wrap">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBVq-hofdbTwIhneviHhPJbSV70_X3Ei68hAbZWROIwcKOocr1&s" alt=""/>
                            <div className="meta">
                                <p className="name">General Chat</p>
                                <p className="preview">{lastMessage.message}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <div className={"online-now"}>
                    <span name="online">Online now</span>
                    <ul>
                    {users.map((user, id) => (
                        <li className="contact" key={user.email}>
                            <div className="wrap">
                                <span className={`contact-status ${user.isOnline ? "online": "offline"}`}></span>
                                <img src={user.imgUrl || NO_AVATAR_IMAGE}  alt=""/>
                                <div className="meta">
                                    <p className="name">{user.email}</p>
                                    <p className="preview"></p>
                                </div>
                            </div>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>
            {currentUser && <div onClick={() => FirebaseApi.signOut(currentUser)} className={"log-out"}>
                Log Out <FaSignOutAlt style={{marginLeft: 5}}/>
            </div>}
        </div>
    )
}

export default Contacts;
