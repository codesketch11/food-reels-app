import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FilePlay } from 'lucide-react';
import { LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();

  const storedProfile = JSON.parse(localStorage.getItem("foodPartnerProfile"));


  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/food-partner/logout", {
        withCredentials: true,
      });

      localStorage.removeItem("foodPartnerProfile");

      navigate("/food-partner/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const { id } = useParams();
  
  const isProfileRoute = window.location.pathname.startsWith("/food-partner/profile");
  const isOwner = storedProfile?._id === id && isProfileRoute;

  const [profile, setProfile] = useState({ name: "Food Partner", email: "No email available" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [videos, setVideos] = useState([])

  useEffect(() => {
    const storedProfile = localStorage.getItem("foodPartnerProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios
      .get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then((response) => {
        if (response.data?.foodPartner) {
          setProfile(response.data.foodPartner);
          setVideos(response.data.foodPartner.foodItems || []);
        }
      })
      .catch((err) => {
        console.error("Profile fetch failed", err);
        setError("Unable to load profile data.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="profile-page">
        <section className="profile-card">
          <p>Loading profile…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        {error && <p>{error}</p>}
        <div className="profile-header">
  <div className="profile-avatar">
    {profile.name?.charAt(0).toUpperCase()}
  </div>

  <div className="profile-info">
    <h1>{profile.name}</h1>
    <p className="profile-email">{profile.email}</p>
  </div>
</div>

        <div className="profile-stats">
          <article className="stat-card">
            <span>Total meals</span>
            <strong>43</strong>
          </article>
          <article className="stat-card">
            <span>Customer served</span>
            <strong>15K</strong>
          </article>
        </div>

        {isOwner && (
          <div className="profile-actions">
            <button
              className="profile-btn"
              onClick={() => navigate("/create-food")}
            >
              <FilePlay size={16} className="btn-icon" />
              <span>Create Food</span>
            </button>

            <button
              className="profile-btn logout"
              onClick={handleLogout}
            >
              <LogOut size={16} className="btn-icon" />
              <span>Logout</span>
            </button>
          </div>
        )}

        <div className="profile-videos-label">
          <h2>Food videos</h2>
        </div>

        <div className="profile-videos-grid">
          {videos.length > 0 ? videos.map((video, index) => (
            <article key={video._id || index} className="video-card"
              onMouseEnter={(e) => e.currentTarget.querySelector("video").play()}
              onMouseLeave={(e) => e.currentTarget.querySelector("video").pause()}
             >
              <video
                src={video.video}
                muted
                loop
                playsInline
                className="video-thumbnail"
              />
            </article>
          )) : (
            <p>No food videos available.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Profile;