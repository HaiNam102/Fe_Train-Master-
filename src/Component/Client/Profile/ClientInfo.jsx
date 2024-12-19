import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ClientInfo.css"; 
import img from '../../../assets/image/User-Icon.jpg'

const ClientInfo = () => {
    const [client, setClient] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        phone: "",
        address: "",
        email: "",
        years_training: "",
        blood_glucose: "",
        blood_pressure: "",
        job: "",
    });

    useEffect(() => {
        fetch("http://localhost:8080/client/getClientInforByToken", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((response) => response.json())
        .then((data) => {
            const formattedClient = data[0]
                ? {
                    id: data[0][0],
                    firstName: data[0][1],
                    lastName: data[0][2],
                    gender: data[0][3],
                    birthDate: new Date(data[0][4]).toLocaleDateString(),
                    phone: data[0][5],
                    address: data[0][6],
                    email: data[0][7],
                    yearsTraining: data[0][8],
                    bloodGlucose: data[0][9],
                    bloodPressure: data[0][10],
                    job: data[0][11],
                }
                : null;
            setClient(formattedClient);
            setFormData(formattedClient);
        })
        .catch((error) => console.error("Error fetching client data:", error));
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:8080/client/updateClientInfo", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setClient(formData);
            setIsEditing(false);
            toast.success("Successfully updated client information!");
        } catch (error) {
            console.error("Unable to update client information", error);
            toast.error("Update failed!");
        }
    };

    if (!client) return <div className="loading">Loading...</div>;

    return (
        <Container className="profile-page mt-5">
            <div className="profile-card shadow-lg">
                <div className="profile-header">
                    <img
                        src={img}
                        alt="Avatar"
                        className="profile-avatar"
                    />
                    <h3>{client.firstName} {client.lastName}</h3>
                    <p>{client.job || "Job not updated"}</p>
                </div>
                <div className="profile-body">
                    {isEditing ? (
                        <Form>
                            <Row className="mb-3">
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>First Name: </strong>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Last Name: </strong>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Gender: </strong>
                                    <Form.Select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Form.Select>
                                </Col>
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Date of Birth: </strong>
                                    <Form.Control
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Phone Number: </strong>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Address: </strong>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Email: </strong>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Years of Training: </strong>
                                    <Form.Control
                                        type="number"
                                        name="years_training"
                                        value={formData.years_training}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Blood Glucose: </strong>
                                    <Form.Control
                                        type="text"
                                        name="blood_glucose"
                                        value={formData.blood_glucose}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Blood Pressure: </strong>
                                    <Form.Control
                                        type="text"
                                        name="blood_pressure"
                                        value={formData.blood_pressure}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col sm={6}>
                                    <strong style={{ textAlign: "left", display: "block" }}>Job: </strong>
                                    <Form.Control
                                        type="text"
                                        name="job"
                                        value={formData.job}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Button variant="success" onClick={handleSave}>Save</Button>
                                    <Button variant="secondary" onClick={() => setIsEditing(false)} className="ms-2">Cancel</Button>
                                </Col>
                            </Row>
                        </Form>
                    ) : (
                        <div>
                            <p><strong>First Name:</strong> {client.firstName}</p>
                            <p><strong>Last Name:</strong> {client.lastName}</p>
                            <p><strong>Email:</strong> {client.email}</p>
                            <p><strong>Phone Number:</strong> {client.phone}</p>
                            <p><strong>Address:</strong> {client.address}</p>
                            <p><strong>Gender:</strong> {client.gender === "Male" ? "Male" : "Female"}</p>
                            <p><strong>Date of Birth:</strong> {client.birthDate}</p>
                            <p><strong>Years of Training:</strong> {client.years_training || "Not updated"}</p>
                            <p><strong>Blood Glucose:</strong> {client.blood_glucose || "Not updated"}</p>
                            <p><strong>Blood Pressure:</strong> {client.blood_pressure || "Not updated"}</p>
                            <p><strong>Job:</strong> {client.job || "Not updated"}</p>

                            <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default ClientInfo;
