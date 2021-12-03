import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessionId, removeSessionId } from "../lib/cookie";
import {
  requestClearSessionProfile,
  requestFetchSessionProfile,
} from "../middleware/modules/profile";
import { AppDispatch, RootState } from "../provider";

import { Nav, NavDropdown } from "react-bootstrap";
import { clearProfile } from "../provider/modules/profile";
import { useRouter } from "next/router";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  useEffect(() => {
    
    if (!profile.username) {
      const sessionId = getSessionId();
      if (sessionId) {
       
        dispatch(requestFetchSessionProfile());
      } else {
        
      }
    }
  }, []);

  const handleSignOut = () => {
    
    dispatch(requestClearSessionProfile());
    
    removeSessionId();
   
    window.location.href = "/";
  };

  return (
    <>
      {profile.username && (
        <NavDropdown
          title={<span className="text-light">{profile.username}</span>}
        >
          <NavDropdown.Item
            onClick={() => {
              handleSignOut();
            }}
          >
            SIGN OUT
          </NavDropdown.Item>
        </NavDropdown>
      )}
      {!profile.username && (
        <Nav.Item>
          <Link href="/signin">
            <a className="text-light">SIGN IN</a>
          </Link>
        </Nav.Item>
      )}
    </>
  );
};

export default Profile;
