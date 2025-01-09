import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { vietnameseDate } from "../../Util/DateOfTime";
import img from "../../../../assets/image/gym.jpg"
// import "./Register.scss";

const Register_Admin = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        roleName: "Client",
        firstName: "",
        lastName: "",
        gender: "",
        birthDate: "",
        phone: "",
        address: "",
        email: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usernameRegex = /^[a-zA-Z0-9]{3,15}$/; // Username validation
        if (!usernameRegex.test(formData.username)) {
            toast.error(
                "Username must be 3-15 characters long and contain only letters and numbers."
            );
            return;
        }

        if (formData.password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                formData
            );
            console.log(response.data);
            toast.success("Registration successful!");
        } catch (error) {
            const errorMessage =
                error.response?.data || "An error occurred. Please try again.";
            toast.error(errorMessage);
        }
    };
    const vietnameseDate = new Date().toLocaleDateString("en-US", {
        weekday: "long", // Hiển thị ngày trong tuần
        year: "numeric", // Hiển thị năm
        month: "long", // Hiển thị tháng đầy đủ
        day: "numeric", // Hiển thị ngày
      });
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-4 rounded shadow">
                <div className="d-flex align-items-center">
                    <img src={img} className="me-3" />
                    <h1 className="h4 fw-bold text-primary">
                        Create Account
                    </h1>
                </div>
                <div className="ms-auto">
                    <p className="text-muted fs-4 text-end">{vietnameseDate}</p>
                </div>
                <p className="text-muted fs-5"></p>
            </div>
            <div className="register-container d-flex align-items-center justify-content-center ">
                <div className="card w-75 shadow">
                    <div className="card-body">
                        <h2 className="text-center mb-4">Create an Account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                {/* Left Column */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="confirmPassword" className="form-label" style={{ textAlign: "left", display: "block" }}  >
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label" style={{ textAlign: "left", display: "block" }} >
                                            Gender
                                        </label>
                                        <select
                                            className="form-select"
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>
                                                Select Gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="birthDate" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                            Birth Date
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="birthDate"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                            Phone
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="roleName" className="form-label" style={{ textAlign: "left", display: "block" }}>
                                    Role
                                </label>
                                <select
                                    className="form-select"
                                    id="roleName"
                                    name="roleName"
                                    value={formData.roleName}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Personal_Trainer">Personal Trainer</option>
                                    <option value="Fitness_Manager">Fitness Manager</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Client">Client</option>
                                </select>
                            </div>

                            {/* <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="terms"
                required
              />
              <label className="form-check-label" htmlFor="terms">
                I agree to the terms and conditions
              </label>
            </div> */}

                            <button type="submit" className="btn btn-primary w-100">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register_Admin;
