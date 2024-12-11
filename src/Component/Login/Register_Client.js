import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import "./Register.scss";

const Register_Client = () => {
  const navigate = useNavigate();
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
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!usernameRegex.test(formData.username)) {
      toast.error("Username must be 3-15 characters long and contain only letters and numbers.");
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
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data || "An error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <MDBContainer fluid
      className="d-flex align-items-center justify-content-center bg-image"
      style={{
        backgroundImage:
          "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
      }}
    >
      <MDBCard className="m-5 shadow-lg" style={{ width: 800 }}>
        <MDBCardBody className="p-5">
          <h2 className="text-center mb-5">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <MDBInput
                id="username"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <MDBInput
                id="password"
                placeholder="Enter your password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <MDBInput
                id="confirmPassword"
                placeholder="Re-enter your password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>

            {/* Personal Information */}
            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <MDBInput
                  id="firstName"
                  placeholder="Your first name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-4">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <MDBInput
                  id="lastName"
                  placeholder="Your last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              {/* Gender */}
              <div className="col-md-6 mb-4">
                <label htmlFor="gender" className="form-label">
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

              {/* Birth Date */}
              <div className="col-md-6 mb-4">
                <label htmlFor="birthDate" className="form-label">
                  Birth Date
                </label>
                <MDBInput
                  id="birthDate"
                  placeholder="YYYY-MM-DD"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              {/* Phone */}
              <div className="col-md-6 mb-4">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <MDBInput
                  id="phone"
                  placeholder="Your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Address */}
              <div className="col-md-6 mb-4">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <MDBInput
                  id="address"
                  placeholder="Your home address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <MDBInput
                id="email"
                placeholder="Your email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Terms Checkbox */}
            <MDBCheckbox
              className="mb-4"
              name="terms"
              id="termsCheckbox"
              label="I agree to the Terms and Conditions"
              required
            />

            {/* Submit Button */}
            <MDBBtn className="w-100" color="primary" size="lg" type="submit">
              Register
            </MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Register_Client;
