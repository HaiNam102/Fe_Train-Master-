import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import DeleteCalendar from "./DeleteCalendar";
import UpdateCalendar from "./UpdateCalendar";
import CreateCalendar from "./CreateCalendar";

const ManagerCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false); // Modal trạng thái tạo mới
  const itemsPerPage = 4;

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  // Lấy dữ liệu lịch từ server
  const fetchCalendarData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/calendar/getAllCalendar"
      );
      if (Array.isArray(response.data.calendarEntries)) {
        setCalendarData(response.data.calendarEntries);
      } else {
        console.error("Dữ liệu calendarEntries không phải mảng");
        setCalendarData([]);
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleCloseModal = () => {
    setSelectedCalendar(null);
    setShowCreateModal(false); // Đóng modal tạo mới
  };

  const handleRefreshCalendar = () => {
    fetchCalendarData(); // Làm mới danh sách lịch
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Calendar Management</h1>
      {/* Nút tạo mới */}
      <div className="d-flex justify-content-start mb-3">
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowCreateModal(true);
          }}
           // Mở modal tạo mới
        >
          <FontAwesomeIcon icon={faPlus} /> Create Calendar
        </button>
      </div>

      {/* Bảng danh sách lịch */}
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Client Name</th>
            <th>Attendance Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {calendarData
            .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
            .map((calendar) => (
              <tr key={calendar.calendarId}>
                <td>{calendar.date}</td>
                <td>{calendar.timestart}</td>
                <td>{calendar.timeend}</td>
                <td>{`${calendar.client.firstName} ${calendar.client.lastName}`}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={calendar.attendanceStatus}
                    readOnly
                  />
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => setSelectedCalendar(calendar)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <DeleteCalendar
                    calendarId={calendar.calendarId}
                    refreshCalendar={fetchCalendarData}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(calendarData.length / itemsPerPage)}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      {/* Modal chỉnh sửa */}
      {selectedCalendar && (
        <UpdateCalendar
          selectedCalendar={selectedCalendar}
          refreshCalendar={handleRefreshCalendar}
          onClose={handleCloseModal}
        />
      )}

      {/* Modal tạo mới */}
      {showCreateModal && (
        <CreateCalendar
          onClose={handleCloseModal}
          refreshCalendar={handleRefreshCalendar}
        />
      )}
    </div>
  );
};

export default ManagerCalendar;
