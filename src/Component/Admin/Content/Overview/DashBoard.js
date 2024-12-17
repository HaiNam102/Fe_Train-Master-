import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "./Header";
import StatCard from "./StatCard";

const DashBoard = () => {
    return (
        <div className="d-flex flex-column overflow-auto position-relative">
            {/* Header */}
            <Header title="Overview" />

            <main className="container py-4">
                {/* Stats Section */}
                <motion.div
                    className="row g-4 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="col-12 col-sm-6 col-lg-3">
                        <StatCard name="Total Sales" icon={Zap} value="$12,345" color="#4f46e5" />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <StatCard name="New Users" icon={Users} value="1,234" color="#9333ea" />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <StatCard name="Total Products" icon={ShoppingBag} value="567" color="#ec4899" />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <StatCard name="Conversion Rate" icon={BarChart2} value="12.5%" color="#10b981" />
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default DashBoard;
