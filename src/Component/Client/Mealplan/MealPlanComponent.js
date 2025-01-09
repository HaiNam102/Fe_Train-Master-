import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "./MealPlanComponent.scss";

const ApprovedMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/mealPlans/approved",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Assuming response.data is an array
        setMealPlans(response.data || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to load meal plans");
        toast.error("Error loading meal plans");
      }
    };

    fetchMealPlans();
  }, []);

  // Helper function to group food items by meal plan
  const groupFoodsByMealPlan = (mealPlansData) => {
    if (!Array.isArray(mealPlansData) || mealPlansData.length === 0) {
      return {};
    }

    return mealPlansData.reduce((acc, row) => {
      const mealPlanId = row[0];
      const day = row[1];
      const session = row[2];
      const trainingStatus = row[3];
      const food = {
        foodName: row[4],
        protein: row[5],
        fat: row[6],
        carb: row[7],
        note: row[8],
        amount: row[9],
        unit: row[10],
      };

      if (!acc[mealPlanId]) {
        acc[mealPlanId] = {
          mealPlanId,
          day,
          session,
          trainingStatus,
          foods: [],
          totals: {
            protein: 0,
            carb: 0,
            fat: 0,
            kcals: 0,
          },
        };
      }

      // Add food to the meal plan and update totals
      acc[mealPlanId].foods.push(food);
      acc[mealPlanId].totals.protein += food.protein;
      acc[mealPlanId].totals.carb += food.carb;
      acc[mealPlanId].totals.fat += food.fat;
      acc[mealPlanId].totals.kcals +=
        food.fat * 9 + food.carb * 4 + food.protein * 4;

      return acc;
    }, {});
  };

  if (loading) {
    return (
      <Container className="approved-meal-plans loading-container">
        <Spinner animation="border" variant="primary" />
        <span>Loading meal plans...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="approved-meal-plans alert-container">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const groupedMealPlans = groupFoodsByMealPlan(mealPlans);

  return (
    <Container className="approved-meal-plans">
      {Object.keys(groupedMealPlans).length > 0 ? (
        Object.values(groupedMealPlans).map((mealPlan) => (
          <div key={mealPlan.mealPlanId} className="meal-plan">
            <div className="meal-plan-header">
              <h2>Session: {mealPlan.session}</h2>
              <h4>
                Day: {mealPlan.day} - Training Status:{" "}
                {mealPlan.trainingStatus ? "Training Day" : "Not Training Day"}
              </h4>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Food Name</th>
                  <th>Protein (g)</th>
                  <th>Carb (g)</th>
                  <th>Fat (g)</th>
                  <th>Kcals</th>
                  <th>Amount</th>
                  <th>Note</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {mealPlan.foods.map((food, index) => (
                  <tr key={index}>
                    <td>{food.foodName}</td>
                    <td>{food.protein}</td>
                    <td>{food.carb}</td>
                    <td>{food.fat}</td>
                    <td>{food.fat * 9 + food.carb * 4 + food.protein * 4}</td>
                    <td>{food.amount}</td>
                    <td>{food.note}</td>
                    <td>{food.unit}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>{mealPlan.totals.protein}</td>
                  <td>{mealPlan.totals.carb}</td>
                  <td>{mealPlan.totals.fat}</td>
                  <td>{mealPlan.totals.kcals}</td>
                  <td colSpan="3"></td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))
      ) : (
        <div className="no-data-container">
          <p style={{fontSize:"16px",color: "black"  }}>Currently, there is no Meal Plan for you. Wait for us to update!</p>
        </div>
      )}
    </Container>
  );
};

export default ApprovedMealPlans;
