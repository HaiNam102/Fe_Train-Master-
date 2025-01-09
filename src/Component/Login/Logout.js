import React from 'react';
import { toast } from 'react-toastify';
import './Modal.scss'

const Logout = ({ showModal, handleClose, handleLogout }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-conten">
        <h2>Confirm sign-out</h2>
        <p>Are you sure you want to log out?</p>
        <div className="modal-actions">
        <button
            onClick={() => {
              handleLogout(); 
              handleClose(); 
            }}
            className="btn btn-primary"
          >
            Log out
          </button>
          <button onClick={handleClose} className="btn btn-secondary">
            Cancel
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default Logout;
