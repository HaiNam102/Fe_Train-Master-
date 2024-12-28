import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const MealPlanTable = ({ mealPlans, onOpenModal, onReject }) => {
  const groupedMealPlans = mealPlans.reduce((acc, mealPlan) => {
    const mealPlanID = mealPlan[0];
    if (!acc[mealPlanID]) {
      acc[mealPlanID] = {
        mealPlanID,
        day: mealPlan[1],
        session: mealPlan[2],
        foods: [],
      };
    }
    acc[mealPlanID].foods.push(mealPlan);
    return acc;
  }, {});

  const groupedMealPlansArray = Object.values(groupedMealPlans);

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th>Meal Plan ID</th>
            <th>Day</th>
            <th>Session</th>
            <th>Food Name</th>
            <th>Protein (g)</th>
            <th>Fat (g)</th>
            <th>Carb (g)</th>
            <th>Note</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {groupedMealPlansArray.map((mealPlanGroup) =>
            mealPlanGroup.foods.map((food, foodIndex) => {
              const isFirstRow = foodIndex === 0;
              return (
                <tr
                  key={`${mealPlanGroup.mealPlanID}-${foodIndex}`}
                  className="align-middle"
                >
                  {isFirstRow && (
                    <td rowSpan={mealPlanGroup.foods.length} className="fw-bold">
                      {mealPlanGroup.mealPlanID}
                    </td>
                  )}
                  {isFirstRow && (
                    <td rowSpan={mealPlanGroup.foods.length}>
                      {mealPlanGroup.day}
                    </td>
                  )}
                  {isFirstRow && (
                    <td rowSpan={mealPlanGroup.foods.length}>
                      {mealPlanGroup.session}
                    </td>
                  )}
                  <td>{food[4]}</td> {/* Food Name */}
                  <td>{food[5]}</td> {/* Protein */}
                  <td>{food[6]}</td> {/* Fat */}
                  <td>{food[7]}</td> {/* Carb */}
                  <td>{food[8]}</td> {/* Note */}
                  <td>{food[9]}</td> {/* Amount */}
                  {isFirstRow && (
                    <td
                      rowSpan={mealPlanGroup.foods.length}
                      className="text-center"
                    >
                      <button
                        className="btn btn-success btn-sm mx-1"
                        title="Approve"
                        onClick={() => onOpenModal(mealPlanGroup.mealPlanID)}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        title="Reject"
                        onClick={() => onReject(mealPlanGroup.mealPlanID)}
                      >
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MealPlanTable;
