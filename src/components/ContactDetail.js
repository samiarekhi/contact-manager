import React from "react";
import { Link } from "react-router-dom";
import user from '../images/user.png';

const ContactDetail = (props) => {
    const {name, email, phone} =props.location.state.contact;
    return(
      <div className="main">
          <div className="ui card centered"><br></br><br></br><br></br>
              <div className="image">
                  <img src={user} alt="user" />
              </div>
              <div className="content">
                  <div className="header">{name}</div>
                  <div className="desc1">{email}</div>
                  <div className="desc2">{phone}</div>
              </div>
          </div>
          <div className="center-div">
              <Link to="/">
                <center>
                    <button className="ui button blue center">Back to Contact List</button>
                </center>
              </Link>
          </div>
      </div>  
    );
};

export default ContactDetail;