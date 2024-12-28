import React, { useState, useEffect } from "react";
import axios from "axios";
import MealPlanTable from "./MealPlanTable";
import MealPlanModal from "./MealPlanModal";
import { toast } from 'react-toastify';
import img from "../../../../assets/image/gym.jpg"
import { vietnameseDate } from "../../Util/DateOfTime";

const ManagerFeedBackMealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [approvalData, setApprovalData] = useState({
    fmName: "",
    feedback: "",
  });

  const token = localStorage.getItem('token');  

  // Set up axios headers with token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${token}`  
    }
  });

  // Fetch meal plans
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8080/mealPlans/api/mealPlans/pending")
      .then((response) => {
        setMealPlans(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the meal plans!", error);
        setLoading(false);
      });
  }, []);


  const openModal = (mealPlanID) => {
    setSelectedMealPlan(mealPlanID);
    setIsModalOpen(true);
  };

 
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMealPlan(null);
    setApprovalData({ fmName: "", feedback: "" });
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApprovalData({ ...approvalData, [name]: value });
  };


  const handleApprove = () => {
    axiosInstance
      .put(`http://localhost:8080/api/notifications/approve/${selectedMealPlan}`, approvalData)
      .then(() => {
        toast.success('Meal Plan approved successfully!');
        setMealPlans((prevMealPlans) =>
          prevMealPlans.filter((mealPlan) => mealPlan[0] !== selectedMealPlan)
        );

        closeModal();
      })
      .catch((error) => {
        console.error("Error approving the meal plan:", error);
        toast.error('You do not have permission to browse the function');
      });
  };

  const handleReject = (mealPlanID) => {
    axiosInstance
      .delete(`http://localhost:8080/api/notifications/delete/${mealPlanID}`)
      .then(() => {
        toast.success('Meal Plan rejected successfully!');
        setMealPlans((prevMealPlans) =>
          prevMealPlans.filter((mealPlan) => mealPlan[0] !== mealPlanID)
        );
      })
      .catch((error) => {
        console.error("Error rejecting the meal plan:", error);
        toast.error('You do not have permission to browse the function');
      });
  };


  if (loading) {
    return <div>Loading...</div>;
  }
  const vietnameseDate = new Date().toLocaleDateString("en-US", {
    weekday: "long", // Hiển thị ngày trong tuần
    year: "numeric", // Hiển thị năm
    month: "long", // Hiển thị tháng đầy đủ
    day: "numeric", // Hiển thị ngày
  });
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-4 rounded shadow">
        <div className="d-flex align-items-center">
          <img src={img} className="me-3" />
          <h1 className="h4 fw-bold text-primary">
            Manager Approve MealPlan
          </h1>
        </div>
        <div className="ms-auto">
          <p className="text-muted fs-4 text-end">{vietnameseDate}</p>
        </div>
      </div>
      <MealPlanTable mealPlans={mealPlans} onOpenModal={openModal} onReject={handleReject} />
      <MealPlanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleApprove}
        approvalData={approvalData}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default ManagerFeedBackMealPlan;
