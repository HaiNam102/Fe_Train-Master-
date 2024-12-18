import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify"; // For success and error notifications
import img from "../../../../assets/image/gym.jpg"
import { vietnameseDate } from "../../Util/DateOfTime";
import './PersonalTrainerInfo.scss'; // Import custom CSS

const PersonalTrainerInfo = () => {
    const [trainer, setTrainer] = useState(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        phone: "",
        address: "",
        email: "",
        degree: ""
    });

    useEffect(() => {
        const fetchTrainerInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/api/auth/PersonalTrainer/info", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTrainer(response.data);
                setFormData(response.data); // Initialize formData with fetched data
            } catch (error) {
                console.error("Không thể lấy thông tin Personal Trainer", error);
                toast.error("Failed to fetch trainer information!");
            }
        };

        fetchTrainerInfo();
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
            await axios.put("http://localhost:8080/api/auth/PersonalTrainer/update", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setTrainer(formData); // Update trainer info in state
            toast.success("Thông tin Personal Trainer đã được cập nhật thành công!");
        } catch (error) {
            console.error("Không thể cập nhật thông tin Personal Trainer", error);
            toast.error("Cập nhật thông tin thất bại!");
        }
    };

    if (!trainer) return <div>Đang tải...</div>;

    return (
        <Container className="personal-trainer-info">
            <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-4 rounded shadow">
                <div className="d-flex align-items-center">
                    <img src={img} className="me-3" />
                    <h1 className="h4 fw-bold text-primary">
                        Information Of Personal Trainer
                    </h1>
                </div>
                <div className="ms-auto">
                    <p className="text-muted fs-4 text-end">{vietnameseDate}</p>
                </div>
            </div>
            <Form>
                <Row className="mb-3 ">
                    <Col sm={6} >
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
                        <strong style={{ textAlign: "left", display: "block" }} >Gender: </strong>
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
                        <strong style={{ textAlign: "left", display: "block" }} >Date Of Birth: </strong>
                        <Form.Control
                            type="text"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col sm={6}>
                        <strong style={{ textAlign: "left", display: "block" }} >Phone Number: </strong>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col sm={6}>
                        <strong style={{ textAlign: "left", display: "block" }} >Address: </strong>
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
                        <strong style={{ textAlign: "left", display: "block" }} >Email: </strong>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col sm={6}>
                        <strong style={{ textAlign: "left", display: "block" }} >Degree: </strong>
                        <Form.Control
                            type="text"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button variant="success" onClick={handleSave}>Save</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default PersonalTrainerInfo;
