import React, { useState } from 'react';
import '../styles/ProfileMenu.css';
import { ModalComponent } from './Modal';

export default function ProfileMenu({ user, logoutApp }) {

  const [openModal, setOpenModal] = useState(false);


  return (
    <>

      <div className="profile-wrapper" >
        <span className="profile-text text-capitalize text-white">{user}</span>

        <div className="dropdown-box">
          <div className="dropdown-item" onClick={() => setOpenModal(true)}
          >Profile</div>
          <div onClick={logoutApp} className="dropdown-item">Logout</div>
        </div>
      </div>


      {openModal && (

        <ModalComponent setOpenModal={setOpenModal}>
        </ModalComponent>
      )}

    </>
  );
}


