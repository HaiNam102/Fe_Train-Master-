import { useEffect, useState } from "react";
import axios from "axios";
import UpdateTracking from "./UpdateTracking";
import DeleteTracking from "./DeleteTracking";
import ReactPaginate from "react-paginate";
import "./Tracking.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const TableTracking = ({ refresh }) => {
  const [trackingData, setTrackingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState(null);

  const token = localStorage.getItem("token");
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Lấy dữ liệu tracking từ API
  const fetchTrackingData = async () => {
    try {
      const response = await axiosInstance.get(
        "http://localhost:8080/clientstracking/getAllClientsTracking"
      );
      console.log("Tracking data:", response.data); // Log dữ liệu
      setTrackingData(response.data);
    } catch (error) {
      console.error("Error fetching tracking data:", error);
    }
  };

  useEffect(() => {
    fetchTrackingData();
  }, [refresh]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTrackingData = trackingData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(trackingData.length / itemsPerPage);

  const handleEditClick = (trackingId) => {
    setSelectedTrackingId(trackingId);
    setShowUpdateModal(true);
  };

  return (
    <div>
      <UpdateTracking
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        trackingId={selectedTrackingId}
        onUpdate={fetchTrackingData}
      />

      <div className="table-container">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client Name</th>
              <th>Date</th>
              <th>Weight</th>
              <th>Sleep Hours</th>
              <th>Step Count</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTrackingData.map((tracking) => (
              <tr key={tracking.trackingId}>
                <td>{tracking.trackingId}</td>
                <td>{tracking.client.firstName || "Unknown Client"}</td>
                <td>{tracking.date}</td>
                <td>{tracking.weight}</td>
                <td>{tracking.sleepHour}</td>
                <td>{tracking.stepCount}</td>
                <td>{tracking.notes}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(tracking.trackingId)}
                    className="btn btn-warning mx-3"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <DeleteTracking trackingId={tracking.trackingId}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </DeleteTracking>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
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
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default TableTracking;