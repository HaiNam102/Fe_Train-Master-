import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './Tracking.scss';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend, ChartDataLabels);

function Tracking() {
    const [clients, setClients] = useState([]);
    const [nutritionChartData, setNutritionChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/clientstracking/getClientsTrackingByToken", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClients(response.data);
                prepareChartData(response.data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchData();
    }, []);

    const prepareChartData = (data) => {
        const labels = data.map((client) => client.date);
        const weights = data.map((client) => client.weight);
        const kcals = data.map((client) => client.kcal);

        setNutritionChartData({
            labels,
            datasets: [
                {
                    label: 'Weight',
                    data: weights,
                    borderColor: 'Orange',
                    backgroundColor: 'rgba(232, 136, 64, 0.97)',
                    tension: 0.4,
                    yAxisID: 'y',
                    plugins: {
                        datalabels: {
                            color: 'Orange',
                            display: true,
                            align: 'top',
                            formatter: (value) => `${value} kg`,
                            font: {
                                size: 10,
                                weight: 'bold',
                            },
                        },
                    },
                },
            ],
        });
    };

    return (
        <div className="tracking-container ">
            <div style={{ paddingTop: "90px", paddingBottom:"115px" }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div className="tracking-table-container">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tracking ID</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Weight</TableCell>
                                        <TableCell>Sleep Hour</TableCell>
                                        <TableCell>Step Count</TableCell>
                                        <TableCell>Notes</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clients.length > 0 ? (
                                        clients.map((row, index) => (
                                            <TableRow key={`${row.trackingId}-${index}`}>
                                                <TableCell>{row.trackingId}</TableCell>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell>{row.weight}</TableCell>
                                                <TableCell>{row.sleepHour}</TableCell>
                                                <TableCell>{row.stepCount}</TableCell>
                                                <TableCell>{row.notes}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>

                    <div className="tracking-chart-container">
                        {nutritionChartData ? (
                            <Line
                                data={nutritionChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { display: true, position: 'top' },
                                        datalabels: { display: true },
                                    },
                                    scales: {
                                        x: { title: { display: true, text: 'Day' } },
                                        y: {
                                            title: { display: true, text: 'Weight (kg)', color: 'Orange' },
                                            position: 'left',
                                            ticks: { color: 'Orange' },
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <p>Chart is loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tracking;