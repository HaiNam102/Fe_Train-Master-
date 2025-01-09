import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import './ProgramComponent.scss';

const ApprovedPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");
        const response = await axios.get(
          "http://localhost:8080/programs/approved",
          {
            params: { username },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const groupedPrograms = groupExercisesByProgram(response.data);
        setPrograms(groupedPrograms);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Currently, there is no Programs for you. Wait for us to update!");
        toast.error("Error loading approved programs");
      }
    };

    fetchApprovedPrograms();
  }, []);

  const groupExercisesByProgram = (data) => {
    const grouped = {};

    data.forEach((item) => {
      const [
        programId,
        day,
        week,
        exerciseName,
        setsStandard,
        totalVolume,
        repsStandard,
        set1,
        set2,
        set3,
        set4,
        set5,
        tempo,
        rirRpe,
        loadOfExercise,
        volume,
      ] = item;

      if (!grouped[programId]) {
        grouped[programId] = {
          day,
          week,
          exercises: [],
          totalVolume: 0,
        };
      }

      grouped[programId].exercises.push({
        exerciseName,
        setsStandard,
        volume,
        repsStandard,
        set1,
        set2,
        set3,
        set4,
        set5,
        tempo,
        rirRpe,
        loadOfExercise,
        volume,
      });

      grouped[programId].totalVolume += volume;
    });

    return Object.values(grouped);
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading approved programs...</p>
      </Container>
    );
  }

  if (error || programs.length === 0) {
    return (
      <Container className="program-container">
        <div className="text-center mt-5">
          {error ? <Alert variant="danger">{error}</Alert> : <p>No data available</p>}
        </div>
      </Container>
    );
  }

  return (
    <Container className="program-container">
      {programs.map((program, index) => (
        <div key={index} className="program-section">
          <h3>
            Day: {program.day}, Week: {program.week}
          </h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Exercise Name</th>
                <th>Sets Standard</th>
                <th>Set 1</th>
                <th>Set 2</th>
                <th>Set 3</th>
                <th>Set 4</th>
                <th>Set 5</th>
                <th>Volume</th>
                <th>Load (kg)</th>
                <th>Tempo</th>
                <th>RIR/RPE</th>
              </tr>
            </thead>
            <tbody>
              {program.exercises.map((exercise, i) => (
                <tr key={i}>
                  <td>{exercise.exerciseName}</td>
                  <td>{exercise.setsStandard}</td>
                  <td>{exercise.set1}</td>
                  <td>{exercise.set2}</td>
                  <td>{exercise.set3}</td>
                  <td>{exercise.set4}</td>
                  <td>{exercise.set5}</td>
                  <td>{exercise.volume}</td>
                  <td>{exercise.loadOfExercise}</td>
                  <td>{exercise.tempo}</td>
                  <td>{exercise.rirRpe}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan="7">Total Volume</td>
                <td>{program.totalVolume}</td>
                <td colSpan="3"></td>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}
    </Container>
  );
};

export default ApprovedPrograms;
