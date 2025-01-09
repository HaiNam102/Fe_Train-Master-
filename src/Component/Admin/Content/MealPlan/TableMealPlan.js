import { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateMealPlan from './UpdateMealPlan';
import DeleteMealPlan from './DeleteMealPlan';
import ReactPaginate from 'react-paginate'; 
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const TableMealPlan = ({ refresh }) => {
  const [mealPlans, setMealPlans] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); 
  const itemsPerPage = 4;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [selectedMealPlanId, setSelectedMealPlanId] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const fetchMealPlans = async () => {
    setLoading(true); 
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found');
        setError('Token not found');
        return;
      }
      const response = await axios.get('http://localhost:8080/mealPlans/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMealPlans(response.data); 
      setError(null); 
    } catch (error) {
      console.error('Error fetching meal plan data:', error);
      setError('Error fetching meal plans'); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMealPlans();
  }, [refresh]);

  const handleDataUpdated = () => {
    fetchMealPlans(); 
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMealPlans = mealPlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(mealPlans.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); 
  };

  const handleEditClick = (mealPlanId) => {
    setSelectedMealPlanId(mealPlanId);
    setShowUpdateModal(true);
  };

  const handleDeleteClick = (mealPlanId) => {
    setSelectedMealPlanId(mealPlanId);
    setShowDeleteModal(true); 
  };

  const handleDeleteSuccess = () => {
    fetchMealPlans(); 
  };

  return (
    <div className="table-container">
      <UpdateMealPlan
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        mealPlanId={selectedMealPlanId}
        onUpdate={handleDataUpdated}
      />

      <DeleteMealPlan
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        mealPlanId={selectedMealPlanId}
        onDelete={handleDeleteSuccess}
      />

      {loading && <div className="loading-message">Loading meal plans...</div>}
      {error && <div className="error-message">{error}</div>}

      {mealPlans.length === 0 && !loading && !error ? (
        <div className="no-data-message">No meal plans available</div>
      ) : (
        <div className="card">
          <div className="card-body">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Client Name</th>
                  <th scope="col">Training Status</th>
                  <th scope="col">Day</th>
                  <th scope="col">Session</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentMealPlans.map((mealPlan) => (
                  <tr key={mealPlan.mealplan_id}>
                    <th scope="row">{mealPlan.mealplan_id}</th>
                    <td>{mealPlan.clientName}</td>
                    <td>{mealPlan.trainingStatus ? "Active" : "Inactive"}</td>
                    <td>{mealPlan.day}</td>
                    <td>{mealPlan.session}</td>
                    <td>
                      <button type="button" className="btn btn-secondary">
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => handleEditClick(mealPlan.mealplan_id)}
                        className="btn btn-warning mx-3"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(mealPlan.mealplan_id)}
                        className="btn btn-danger"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
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
        containerClassName="pagination justify-content-center mt-4"
        activeClassName="active"
      />
    </div>
  );
};

export default TableMealPlan;
