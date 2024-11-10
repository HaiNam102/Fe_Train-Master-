import { useState } from "react";
import './ManagerFood.scss'
import TableFood from "./TableFood";
import CreateFood from "./CreateFood";

const ManagerFood = () => {
    const [showModalCreateFood, setShowModelCreateFood] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleDataAdded = () => {
        setRefreshTable(!refreshTable); // Toggle the state to refresh TableFood
    };

    return (
        <>
            <div className="title">
                Manager Food
            </div>
            <br className="large-spacing" />
            <div className="food-content">
                <div className="btn-food">
                    <button onClick={() => setShowModelCreateFood(true)}>Add new Food</button>
                </div>
                <div className="spacing-large"></div>
                <div className="table-food-container">
                    <TableFood refresh={refreshTable} />
                </div>
                <CreateFood
                    show={showModalCreateFood}
                    setShow={setShowModelCreateFood}
                    onAdd={handleDataAdded}
                />
            </div>
        </>
    );
};

export default ManagerFood;
