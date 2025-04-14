import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ErrorBoundary from '../components/ErrorBoundary';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const selectedFile = watch("image");

    useEffect(() => {
        if (selectedFile && selectedFile[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile[0]);
        } else {
            setImagePreview(null);
        }
    }, [selectedFile]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get("/category/getcategory");
                setCategories(response.data.data || []);
            } catch {
                setError('Failed to load categories. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("/product/getproduct");
                setProducts(response.data.data || []);
            } catch {
                setError('Failed to load products. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const fetchSubcategories = async (categoryid) => {
        if (categoryid) {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get(`/subcategory/getcategorybysubcategory/${categoryid}`);
                setSubcategories(response.data.data || []);
            } catch {
                setError('Failed to load subcategories. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        } else {
            setSubcategories([]);
        }
    };

    const submitHandler = async (data) => {
        const formData = new FormData();
        formData.append("productname", data.productname);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);
        formData.append("category", data.category);
        formData.append("subcategory", data.subcategory);
        formData.append("image", data.image[0]);

        try {
            data.userId = localStorage.getItem("id");
            await axios.post("/product/addWithFile", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success('🎉 Product added successfully!');
            setImagePreview(null);
            reset();

            const response = await axios.get("/product/getproduct");
            setProducts(response.data.data || []);
        } catch {
            toast.error('❌ Failed to add product. Please try again.');
        }
    };

    return (
        <ErrorBoundary>
            <div className="container py-5">
                <ToastContainer />
                <h2 className="mb-4 text-center">Add Product</h2>

                <form onSubmit={handleSubmit(submitHandler)} className="row g-4 mb-5 shadow p-4 rounded bg-light">
                    <div className="col-md-6">
                        <label className="form-label">Product Name</label>
                        <input className="form-control" {...register("productname", { required: "Product name is required" })} placeholder="Enter product name" />
                        {errors.productname && <div className="text-danger">{errors.productname.message}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Price (₹)</label>
                        <input type="number" className="form-control" {...register("price", { required: "Price is required" })} placeholder="Enter price" />
                        {errors.price && <div className="text-danger">{errors.price.message}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Stock</label>
                        <input type="number" className="form-control" {...register("quantity", { required: "Quantity is required" })} placeholder="Enter stock" />
                        {errors.quantity && <div className="text-danger">{errors.quantity.message}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Category</label>
                        <select className="form-select" {...register("category", { required: "Category is required" })} onChange={(e) => fetchSubcategories(e.target.value)}>
                            <option value="">Select category</option>
                            {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                        {errors.category && <div className="text-danger">{errors.category.message}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Subcategory</label>
                        <select className="form-select" {...register("subcategory", { required: "Subcategory is required" })}>
                            <option value="">Select subcategory</option>
                            {subcategories.map((sub) => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                        </select>
                        {errors.subcategory && <div className="text-danger">{errors.subcategory.message}</div>}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Product Image</label>
                        <input type="file" accept="image/*" className="form-control" {...register("image")} />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" style={{ maxWidth: '150px' }} />}
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-primary px-4">Add Product</button>
                    </div>
                </form>

                <h3 className="mb-4">Products List</h3>
                {isLoading ? (
                    <div>Loading products...</div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : (
                    <div className="row">
                        {products.map(product => (
                            <div key={product._id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    {product.imageURL && (
                                        <img src={product.imageURL} alt={product.productname} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{product.productname}</h5>
                                        <p className="card-text">₹ {product.price}</p>
                                        <p className="card-text">Stock: {product.quantity}</p>
                                        <button className="btn btn-danger w-100" onClick={async () => {
                                            if (window.confirm("Are you sure you want to delete this product?")) {
                                                try {
                                                    await axios.delete(`/product/delete/${product._id}`);
                                                    setProducts(products.filter(p => p._id !== product._id));
                                                    toast.success("🗑️ Product deleted successfully!");
                                                } catch {
                                                    toast.error("❌ Failed to delete product.");
                                                }
                                            }
                                        }}>Delete Product</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ErrorBoundary>
    );
};
