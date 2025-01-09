import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const DeleteCalendar = ({ calendarId, refreshCalendar }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    // Kiểm tra lại nếu không có token
    if (!token) {
      alert("Please log in to delete the calendar entry.");
      return;
    }

    if (
      !window.confirm("Are you sure you want to delete this calendar entry?")
    ) {
      return;
    }

    try {
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${token}`, // Đảm bảo token được thêm vào header
        },
      });

      // Gọi API DELETE để xóa lịch
      const response = await axiosInstance.delete(
        `http://localhost:8080/calendar/delete/${calendarId}`
      );

      if (response.status === 200) {
        toast.success("Calendar deleted successfully");
        refreshCalendar(); // Gọi hàm refreshCalendar để làm mới danh sách
      } else {
        alert("Error deleting calendar entry.");
      }
    } catch (error) {
      console.error("Error deleting calendar:", error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized. Please log in again.");
        window.location.href = "/login"; // Redirect to login page if unauthorized
      } else {
        alert("Error deleting calendar entry.");
      }
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
};

export default DeleteCalendar;
