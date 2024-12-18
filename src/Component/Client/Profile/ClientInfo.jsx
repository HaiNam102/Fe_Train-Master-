import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ClientInfo.css"; // Custom CSS

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
        const fetchClientInfo = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/client/getClientInforByToken", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setClient(response.data);
                setFormData(response.data);
            } catch (error) {
                console.error("Unable to fetch client information", error);
            }
        };

        fetchClientInfo();
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
        <div className="profile-page container mt-5">
            <div className="profile-card shadow-lg">
                <div className="profile-header">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Avatar"
                        className="profile-avatar"
                    />
                    <h3>{client.firstName} {client.lastName}</h3>
                    <p>{client.job || "Job not updated"}</p>
                </div>
                <div className="profile-body">
                    {isEditing ? (
                        <form className="profile-form">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    name="birthDate"
                                    className="form-control"
                                    value={formData.birthDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Years of Training</label>
                                <input
                                    type="number"
                                    name="years_training"
                                    className="form-control"
                                    value={formData.years_training}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Blood Glucose</label>
                                <input
                                    type="text"
                                    name="blood_glucose"
                                    className="form-control"
                                    value={formData.blood_glucose}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Blood Pressure</label>
                                <input
                                    type="text"
                                    name="blood_pressure"
                                    className="form-control"
                                    value={formData.blood_pressure}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job</label>
                                <input
                                    type="text"
                                    name="job"
                                    className="form-control"
                                    value={formData.job}
                                    onChange={handleChange}
                                />
                            </div>

                            <button className="btn btn-success" onClick={handleSave}>
                                Save
                            </button>
                            <button
                                className="btn btn-secondary ml-2"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <div>
                            <p><strong>Email:</strong> {client.email}</p>
                            <p><strong>Phone Number:</strong> {client.phone}</p>
                            <p><strong>Address:</strong> {client.address}</p>
                            <p><strong>Gender:</strong> {client.gender === "Male" ? "Male" : "Female"}</p>
                            <p><strong>Date of Birth:</strong> {client.birthDate}</p>
                            <p><strong>Years of Training:</strong> {client.years_training || "Not updated"}</p>
                            <p><strong>Blood Glucose:</strong> {client.blood_glucose || "Not updated"}</p>
                            <p><strong>Blood Pressure:</strong> {client.blood_pressure || "Not updated"}</p>
                            <p><strong>Job:</strong> {client.job || "Not updated"}</p>

                            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientInfo;
