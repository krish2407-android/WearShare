import axios from 'axios'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { data } from 'react-router-dom'

// Register components with chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement)

export const Chart = () => {
    const [products, setproducts] = useState([])
    const [chartData, setchartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Loading..",
                data: [],
                backgroundColor: []
            }
        ]
    })

    // Fetch products data from the backend
    const getAllProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/getproduct"); // Full URL if necessary
            // Log the response to inspect its structure

            setproducts(res.data.data); // Assuming res.data.data is the array of products

            setchartData({
                labels: res.data.data.map((product) => product.productname || "N/A"), // Mapping product names to labels
                datasets: [
                    {
                        label: "Product Data",
                        data: res.data.data.map((price) => price || 0), // Mapping product prices to data
                        backgroundColor: ["red", "green", "yellow", "blue", "orange"], // Customize colors as needed
                        borderWidth: 1
                    }
                ]
            });
        } catch (error) {
    
            console.error("Error fetching product data", error);
        }
    }

    // Fetch product data on component mount
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div>
            <h1>CHART DEMO</h1>
            <Pie data={chartData} />  {/* Rendering Pie Chart */}
        </div>
    )
}
