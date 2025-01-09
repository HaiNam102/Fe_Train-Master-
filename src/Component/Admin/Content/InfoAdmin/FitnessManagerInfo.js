import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap"; // Using Bootstrap for styling
import { toast } from 'react-toastify';

const FitnessManagerInfo = () => {
    const [fitnessManager, setFitnessManager] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        phone: "",
        address: "",
        email: ""
    });

    useEffect(() => {
        const fetchFitnessManagerInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/api/auth/FitnessManager/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setFitnessManager(response.data);
                setFormData(response.data); // Initialize formData with fetched data
            } catch (error) {
                console.error("Không thể lấy thông tin Fitness Manager", error);
            }
        };

        fetchFitnessManagerInfo();
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
            await axios.put("http://localhost:8080/api/auth/FitnessManager/update", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFitnessManager(formData);
            setIsEditing(false);
            toast.success('Update information successfully!');
        } catch (error) {
            console.error("Unable to update Fitness Manager information", error);
            toast.error('Update failure information!');
        }
    };

    if (!fitnessManager) return <div>Loading...</div>;

    return (
        <div className="frame" style={{  marginTop: "60px",
        border: "1px solid #ddd", 
        width: "1000px",
        marginLeft: "auto", 
        marginRight: "auto"
    }}>
            <h1 className="">Fitness Manager Information</h1>
            {isEditing ? (
                <Container>
                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Last Name:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>First Name:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Gender:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Birthday:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Phone Number:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Address:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} sm={3}>
                            <label>Email:</label>
                        </Col>
                        <Col xs={12} sm={9}>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="success" onClick={handleSave}>Save</Button>
                            <Button variant="danger" className="ms-2" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <div>
<p style={{ color: 'black', fontSize: '18px' }}><strong>Full name:</strong> {fitnessManager.firstName} {fitnessManager.lastName}</p>
<p style={{ color: 'black', fontSize: '18px' }}><strong>Gender:</strong> {fitnessManager.gender}</p>
<p style={{ color: 'black', fontSize: '18px' }}><strong>Birthday:</strong> {fitnessManager.birthDate}</p>
<p style={{ color: 'black', fontSize: '18px' }}><strong>Phone Number:</strong> {fitnessManager.phone}</p>
<p style={{ color: 'black', fontSize: '18px' }}><strong>Address:</strong> {fitnessManager.address}</p>
<p style={{ color: 'black', fontSize: '18px' }}><strong>Email:</strong> {fitnessManager.email}</p>


                    <Button variant="primary" onClick={() => setIsEditing(true)}>Edit</Button>
                </div>
            )}
        </div>
    );
};

export default FitnessManagerInfo;
