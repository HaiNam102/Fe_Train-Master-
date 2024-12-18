import { motion } from "framer-motion";

const StatCard = ({ name, icon: Icon, value, color }) => {
    return (
        <motion.div
            className="card text-white shadow-sm border-0 rounded-3"
            style={{ backgroundColor: color }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" }}
        >
            <div className="card-body d-flex flex-column justify-content-center align-items-start p-4">
                <div className="d-flex align-items-center mb-2">
                    <Icon size={24} className="me-2" />
                    <span className="fs-6 fw-semibold">{name}</span>
                </div>
                <p className="display-6 fw-bold mb-0">{value}</p>
            </div>
        </motion.div>
    );
};

export default StatCard;
