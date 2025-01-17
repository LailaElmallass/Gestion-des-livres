import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBook } from '../features/BookSlice';

function AddEditForm() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        description: '',
        image: null, // Set to null initially
    });
    const [imagePreview, setImagePreview] = useState(null); // For image preview

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        if (type === 'file') {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
            setImagePreview(URL.createObjectURL(files[0])); 
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addBook(formData));
        navigate('/'); 
    };

    return (
        <div className='container m-3 p-3 border border-dark rounded'>
            <h1 className='m-3 p-3'>Add Book</h1>
            <form onSubmit={handleSubmit} className='form'>
                {/* Title Input */}
                <div className='m-3 p-2 form-group'>
                    <input
                        type="text"
                        className='form-control'
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                </div>

                {/* Author Input */}
                <div className='m-3 p-2 form-group'>
                    <input
                        type="text"
                        className='form-control'
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author"
                    />
                </div>

                {/* Description Textarea */}
                <div className='m-3 p-2 form-group'>
                    <textarea
                        rows={3}
                        className='form-control'
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                    />
                </div>

                {/* Image Input */}
                <div className='m-3 p-2 form-group'>
                    <input
                        type="file"
                        className='form-control'
                        name="image"
                        onChange={handleChange}
                    />
                    {imagePreview && (
                        <div className="image-preview mt-3">
                            <h5>Image Preview:</h5>
                            <img src={imagePreview} alt="Preview" style={{ width: '100%', maxWidth: '300px' }} />
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button className='btn btn-success m-3' style={{ width: '100%' }} type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default AddEditForm;
