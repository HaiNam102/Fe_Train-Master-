// UpdateCalendar.js
import React, { useState } from 'react';
import axios from 'axios';

const UpdateCalendar = ({ selectedCalendar, refreshCalendar, onClose }) => {
  const [attendanceStatus, setAttendanceStatus] = useState(selectedCalendar.attendanceStatus);
  const token = localStorage.getItem("token");

  const handleSaveChanges = async () => {
    if (!token) {
      alert("Token is missing, please log in again.");
      return;
    }

    try {
      const axiosInstance = axios.create({
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const response = await axiosInstance.put(`http://localhost:8080/calendar/update/${selectedCalendar.calendarId}`, {
        attendanceStatus
      });

      if (response.status === 200) {
        refreshCalendar(); // Refresh calendar list after update
        onClose(); // Close the modal after save
      }
    } catch (error) {
      console.error("Error updating calendar:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = '/login';
      } 
    }
  };

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Calendar</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Client Name */}
            <div className="form-group">
              <label>Client Name</label>
              <input
                type="text"
                className="form-control"
                value={`${selectedCalendar.client.firstName} ${selectedCalendar.client.lastName}`}
                readOnly
                style={{ backgroundColor: '#f0f0f0', color: '#6c757d' }}
              />
            </div>

            {/* Date */}
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedCalendar.date}
                readOnly
                style={{ backgroundColor: '#f0f0f0', color: '#6c757d' }}
              />
            </div>

            {/* Start Time */}
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                className="form-control"
                value={selectedCalendar.timestart}
                readOnly
                style={{ backgroundColor: '#f0f0f0', color: '#6c757d' }}
              />
            </div>

            {/* End Time */}
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                className="form-control"
                value={selectedCalendar.timeend}
                readOnly
                style={{ backgroundColor: '#f0f0f0', color: '#6c757d' }}
              />
            </div>

{/* Roll Attendance */}
<div className="form-group">
  <label>Roll Attendance</label>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="attendanceStatus"
      value="1"
      checked={attendanceStatus === 1}
      onChange={() => setAttendanceStatus(1)}
    />
    <label className="form-check-label">
    Present
    </label>
  </div>
  <div className="form-check">
    <input
      className="form-check-input"
      type="radio"
      name="attendanceStatus"
      value="0"
      checked={attendanceStatus === 0}
      onChange={() => setAttendanceStatus(0)}
    />
    <label className="form-check-label">
    Absent
    </label>
  </div>
</div>

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCalendar;
