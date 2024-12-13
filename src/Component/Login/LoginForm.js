import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        { username, password }
      );

      if (response.data.jwt) {
        localStorage.setItem("token", response.data.jwt);

        const decodedToken = jwtDecode(response.data.jwt);
        const userRole = decodedToken.role; // Lấy role từ payload trong token

        console.log(userRole); // Kiểm tra xem role có đúng không

        if (
          userRole === "Owner" ||
          userRole === "Personal_Trainer" ||
          userRole === "Fitness_Manager"
        ) {
          toast.success("Đăng nhập thành công vào trang admin!");
          navigate("/Admins"); // Điều hướng đến trang admin nếu role là admin, personal_trainer, hoặc fitness_manager
        } else if (userRole === "Client") {
          toast.success("Đăng nhập thành công!!!");
          navigate("/Home");
        }
      }
    } catch (error) {
      toast.error(
        "Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu!"
      );
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#4f6969" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="img/login/login.jpg"
                    alt="login form"
                    className="img-fluid h-100"
                    style={{
                      borderRadius: "1rem 0 0 1rem",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleLogin}>
                      <h1
                        className="fw-normal mb-3 pb-3 mx-auto"
                        style={{ letterSpacing: "1px" }}
                      >
                        Login
                      </h1>
                      <label className="form-label" htmlFor="form2Example17">
                        User name
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          placeholder="Nhập tài khoản"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          autoComplete="username"
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                      <label className="form-label" htmlFor="form2Example27">
                        Password
                      </label>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoComplete="current-password"
                          className="form-control form-control-lg"
                          required
                        />

                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                        >
                          Login
                        </button>
                      </div>

                      <a className="small text-muted" href="/Forgot-password">
                        Forgot password?
                      </a>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a href="/Register_Client" style={{ color: "#393f81" }}>
                          Register here
                        </a>
                      </p>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LoginForm;
