import React, { createContext, useState, useContext, useEffect } from 'react';

// Tạo Context để quản lý thông tin người dùng
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Component cung cấp thông tin người dùng
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Trạng thái người dùng

    // Lấy token từ localStorage khi component được mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                // Giả sử token chứa thông tin người dùng (giải mã nếu cần)
                const userInfo = JSON.parse(atob(storedToken.split('.')[1])); // Decode payload của JWT
                setUser(userInfo);
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token'); // Xóa token nếu không hợp lệ
            }
        }
    }, []);

    // Hàm đăng nhập
    const login = (token) => {
        try {
            // Lưu token vào localStorage
            localStorage.setItem('token', token);
            // Giải mã token để lấy thông tin người dùng
            const userInfo = JSON.parse(atob(token.split('.')[1])); // Decode payload của JWT
            setUser(userInfo); // Cập nhật trạng thái người dùng
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Hàm đăng xuất
    const logout = () => {
        localStorage.removeItem('token'); // Xóa token
        setUser(null); // Đặt lại trạng thái người dùng
    };
console.log(user);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
