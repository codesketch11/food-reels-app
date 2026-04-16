import React, { useState } from 'react';
import './CreateFood.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateFood = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    video: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      video: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('video', formData.video);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      
      setFormData({
        name: '',
        description: '',
        video: null
      });
      
      alert('Food item created successfully!');
    } catch (error) {
      console.error('Error creating food:', error);
      alert('Failed to create food item. Please try again.');
    }

    const storedProfile = JSON.parse(localStorage.getItem("foodPartnerProfile"));
    navigate(`/food-partner/profile/${storedProfile._id}`);
  };

  return (
    <div className="create-food-page">
      <div className="create-food-container">
        <div className="create-food-header">
          <h1>Create New Food Item</h1>
          <p>Add a delicious food item to your menu</p>
        </div>

        <form className="create-food-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="video" className="form-label">
              Food Video
            </label>
            <div className="file-input-container">
              <input
                type="file"
                id="video"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="video" className="file-input-label">
                <div className="file-input-content">
                  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l.707.707A1 1 0 0012.414 11H15m-3-3v6"/>
                  </svg>
                  <span className="file-input-text">
                    {formData.video ? formData.video.name : 'Choose a video file'}
                  </span>
                  <span className="file-input-hint">MP4, MOV, AVI up to 100MB</span>
                </div>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Food Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter food name"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your food item..."
              className="form-textarea"
              rows="4"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Food Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFood;