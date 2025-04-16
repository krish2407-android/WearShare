import axios from 'axios'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, LinearScale, Title, Tooltip, Legend } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'

// Register components with chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export const Chart = () => {
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch products and orders data from the backend
    const fetchData = async () => {
        try {
            const [productsRes, ordersRes] = await Promise.all([
                axios.get("http://localhost:5000/product/getproduct"),
                axios.get("http://localhost:5000/order/getorders")
            ])

            console.log("Products Data:", productsRes.data)
            console.log("Orders Data:", ordersRes.data)

            setProducts(productsRes.data.data || [])
            setOrders(ordersRes.data.data || [])
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Prepare data for product count chart
    const productCountData = {
        labels: ['Total Products'],
        datasets: [
            {
                label: "Number of Products",
                data: [products.length],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    }

    // Prepare data for order chart
    const orderData = {
        labels: ['Completed', 'Pending', 'Cancelled'],
        datasets: [
            {
                label: 'Number of Orders',
                data: [
                    orders.filter(order => order.status === 'completed').length,
                    orders.filter(order => order.status === 'pending').length,
                    orders.filter(order => order.status === 'cancelled').length
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Product and Order Statistics'
            }
        }
    }

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="container py-5">
            <style>
                {`
                    .chart-container {
                        background: white;
                        border-radius: 15px;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                        margin-bottom: 30px;
                        transition: transform 0.3s ease;
                    }
                    .chart-container:hover {
                        transform: translateY(-5px);
                    }
                    .chart-title {
                        color: #333;
                        margin-bottom: 20px;
                        font-weight: 600;
                        text-align: center;
                    }
                    .chart-wrapper {
                        height: 400px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>

            <h2 className="text-center mb-4">Analytics Dashboard</h2>

            <div className="row">
                <div className="col-md-6">
                    <div className="chart-container">
                        <h4 className="chart-title">Total Products</h4>
                        <div className="chart-wrapper">
                            <Bar 
                                data={productCountData} 
                                options={{
                                    ...options,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: 'Number of Products'
                                            }
                                        }
                                    }
                                }} 
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="chart-container">
                        <h4 className="chart-title">Order Status Distribution</h4>
                        <div className="chart-wrapper">
                            <Pie 
                                data={orderData} 
                                options={{
                                    ...options,
                                    plugins: {
                                        ...options.plugins,
                                        legend: {
                                            position: 'right'
                                        }
                                    }
                                }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
