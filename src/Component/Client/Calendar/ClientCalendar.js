import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./ClientCalendar.scss";

const ClientCalendar = () => {
  const [events, setEvents] = useState([]);
  const [clients, setClients] = useState([]); // Danh sách client

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  // Hàm chuyển đổi định dạng giờ sang AM/PM
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(hour, minute);
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // Lấy danh sách client từ server
  const fetchClients = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/clients/getCalendarByUN"
      );
      setClients(response.data); // Giả sử API trả về danh sách clients
    } catch (error) {
      console.error("Error fetching client data:", error);
    }
  };

  // Lấy dữ liệu lịch từ server
  const fetchCalendarData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/calendar/getCalendarByUN"
      );
      console.log(response.data); // Kiểm tra cấu trúc của dữ liệu trả về

      // Kiểm tra xem calendarEntries có phải là mảng không
      if (Array.isArray(response.data.calendarEntries)) {
        const eventData = response.data.calendarEntries.map((entry) => ({
          id: entry.calendarId.toString(),
          title: `${entry.attendanceStatus ? "Present" : "Absent"}`,
          start: `${entry.date}T${entry.timestart}`,
          end: `${entry.date}T${entry.timeend}`,
          attendanceStatus: entry.attendanceStatus,
          className: entry.attendanceStatus ? "event-present" : "event-absent",
          displayTime: `${formatTime(entry.timestart)} - ${formatTime(
            entry.timeend
          )}`,
        }));

        setEvents(eventData);
      } else {
        console.error("Dữ liệu calendarEntries không phải mảng");
        setEvents([]); // Xử lý khi calendarEntries không phải mảng
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  useEffect(() => {
    fetchCalendarData();
  }, [clients]);

  const eventClassNames = (arg) => {
    const { attendanceStatus } = arg.event.extendedProps;
    return attendanceStatus === 1 ? "event-present" : "event-absent";
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h1 style={{ textAlign: "center" }}>Client Calendar</h1>
      </div>
      <FullCalendar
  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
  initialView="timeGridWeek"
  headerToolbar={{
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay",
  }}
  slotMinTime="05:00:00"
  slotMaxTime="24:00:00"
  firstDay={1} /* Bắt đầu tuần từ Thứ Hai */
  allDaySlot={false}
  events={events}
  editable={false}
  selectable={true}
  eventClassNames={eventClassNames}
  slotLabelFormat={{
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }}
  eventTimeFormat={{
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }}
  />
    <div className="legend">
        <h3>Color Legend on Calendar</h3>
        <div className="legend-item">
          <span className="color-box present"></span>- Present
        </div>
        <div className="legend-item">
          <span className="color-box absent"></span>- Absent
        </div>
      </div>
  </div>
  
  );
};

export default ClientCalendar;
