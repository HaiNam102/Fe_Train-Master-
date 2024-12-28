import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';


const CreateCalendar = ({ refreshCalendar, onClose }) => {
  const [date, setDate] = useState("");
  const [timestart, setTimestart] = useState("");
  const [timeend, setTimeend] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState(false);
  const [clientList, setClientList] = useState([]); // State to store list of clients
  const [selectedClient, setSelectedClient] = useState(""); // State for selected client
  const token = localStorage.getItem("token");

  // Fetch client list from API
  const fetchClients = async () => {
    if (!token) {
      alert("Token is missing, please log in again.");
      return;
    }

    try {
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axiosInstance.get("http://localhost:8080/client/getAllClient");
      setClientList(response.data); // Assuming response.data is the list of clients
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients(); // Fetch clients when the modal is opened
  }, []);

  const handleCreateCalendar = async () => {
    if (!token) {
      alert("Token is missing, please log in again.");
      return;
    }

    try {
      const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axiosInstance.post(
        "http://localhost:8080/calendar/create",
        {
          date,
          timestart,
          timeend,
          clientName: selectedClient, // Send selected client name
          attendanceStatus,
        }
      );

      if (response.status === 200) {
        toast.success("Calendar created successfully");
        refreshCalendar(); // Refresh calendar list
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Error creating calendar:", error);
      alert("Failed to create calendar. Please check your inputs and try again.");
    }
  };

  return (
    <div className="modal" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Calendar</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {/* Client Name */}
          <div className="form-group">
              <label>Client Name</label>
              <select
                className="form-control"
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
              >
                <option value="">Select Client</option>
                {clientList.map((client) => (
                  <option key={client.id} value={client.firstName}>
                    {client.firstName}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Start Time */}
            <div className="form-group">
              <label>Start Time</label>
              <input
                type="time"
                className="form-control"
                value={timestart}
                onChange={(e) => setTimestart(e.target.value)}
              />
            </div>

            {/* End Time */}
            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                className="form-control"
                value={timeend}
                onChange={(e) => setTimeend(e.target.value)}
              />
            </div>            
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleCreateCalendar}>
              Create Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCalendar;
