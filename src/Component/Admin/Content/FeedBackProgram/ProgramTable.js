import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const ProgramTable = ({ programs, onOpenModal, onReject }) => {
  const groupedPrograms = programs.reduce((acc, program) => {
    const programID = program[0];
    if (!acc[programID]) {
      acc[programID] = {
        programID,
        day: program[1],
        week: program[2],
        exercises: [],
      };
    }
    acc[programID].exercises.push(program);
    return acc;
  }, {});

  const groupedProgramsArray = Object.values(groupedPrograms);

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped align-middle">
        <thead className="table-light">
          <tr>
            <th>Program ID</th>
            <th>Day</th>
            <th>Week</th>
            <th>Exercise Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Tempo</th>
            <th>Load</th>
            <th>RIR/RPE</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {groupedProgramsArray.map((programGroup) =>
            programGroup.exercises.map((exercise, exerciseIndex) => {
              const isFirstRow = exerciseIndex === 0;
              return (
                <tr
                  key={`${programGroup.programID}-${exerciseIndex}`}
                  className="align-middle"
                >
                  {isFirstRow && (
                    <>
                      <td rowSpan={programGroup.exercises.length} className="fw-bold">
                        {programGroup.programID}
                      </td>
                      <td rowSpan={programGroup.exercises.length}>
                        {programGroup.day}
                      </td>
                      <td rowSpan={programGroup.exercises.length}>
                        {programGroup.week}
                      </td>
                    </>
                  )}
                  <td>{exercise[3]}</td> {/* Exercise Name */}
                  <td>{exercise[4]}</td> {/* Sets */}
                  <td>{exercise[5]}</td> {/* Reps */}
                  <td>{exercise[6]}</td> {/* Tempo */}
                  <td>{exercise[7]}</td> {/* Load */}
                  <td>{exercise[8]}</td> {/* RIR/RPE */}
                  {isFirstRow && (
                    <td
                      rowSpan={programGroup.exercises.length}
                      className="text-center"
                    >
                      <button
                        className="btn btn-success btn-sm mx-1"
                        title="Approve"
                        onClick={() => onOpenModal(programGroup.programID)}
                      >
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </button>
                      <button
                        className="btn btn-danger btn-sm mx-1"
                        title="Reject"
                        onClick={() => onReject(programGroup.programID)}
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

export default ProgramTable;
