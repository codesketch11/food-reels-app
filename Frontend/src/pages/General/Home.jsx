import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react';
import { Bookmark } from 'lucide-react';
import { LogOut } from "lucide-react";

const Home = () => {
  const [reels, setReels] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user/logout`, {
        withCredentials: true,
      });

      localStorage.removeItem("user");

      navigate("/user/login");
    } catch (err) {
      console.error("User logout failed", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/`, {
          withCredentials: true,
        });

        const items = feedResponse.data.foodItems || [];

        const mapped = items.map((item) => ({
          id: item._id,
          title: item.name || "Food reel",
          description: item.description || "Delicious food from a partner.",
          videoSrc: item.video,
          partnerId: item.foodPartner,
          likeCount: item.likeCount || 0,
        }));

        setReels(mapped);

        try {
          const savedResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/saved`, {
            withCredentials: true,
          });
          const savedFoods = savedResponse.data.savedFoods || [];
          setSavedIds(savedFoods.map((food) => food.id));
        } catch (savedErr) {
          console.warn("Saved endpoint unavailable:", savedErr.message || savedErr);
        }
      } catch (err) {
        console.error("Failed to load food reels:", err.message || err);
        if (err.response?.status === 401) {
          setError("AUTH_REQUIRED");
        } else {
          setError("GENERIC_ERROR");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLike = async (foodId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/like`,
        { foodId },
        { withCredentials: true }
      );

      setReels((prev) =>
        prev.map((item) => {
          if (item.id !== foodId) return item;
          const isUnlike = response.data.message?.toLowerCase().includes("unliked");
          return {
            ...item,
            likeCount: item.likeCount + (isUnlike ? -1 : 1),
          };
        })
      );
    } catch (err) {
      console.error("Like action failed:", err.message || err);
    }
  };

  const handleSave = async (foodId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/food/save`,
        { foodId },
        { withCredentials: true }
      );

      setSavedIds((prev) =>
        prev.includes(foodId) ? prev.filter((id) => id !== foodId) : [...prev, foodId]
      );
    } catch (err) {
      console.error("Save action failed:", err.message || err);
    }
  };

  return (
    <main className="home-page">
      {loading && <div className="home-status">Loading reels...</div>}
      {!loading && error === "AUTH_REQUIRED" && (
        <div className="home-auth">
          <h2>Welcome 👋</h2>
          <p>Login to explore food reels</p>

          <button
            className="home-auth-btn"
            onClick={() => navigate("/user/login")}
          >
            Login
          </button>
        </div>
      )}

      {!loading && error === "GENERIC_ERROR" && (
        <div className="home-status home-status-error">
          Unable to load reels right now
        </div>
      )}

      <div className="home-user-bar">
        <button onClick={handleUserLogout}><LogOut /></button>
      </div>

      {reels.map((reel) => (
        <section key={reel.id} className="reel-item">
          <video
            className="reel-video"
            src={reel.videoSrc}
            muted
            loop
            playsInline
            autoPlay
          />

          <div className="reel-meta">
            <div className="reel-title">{reel.title}</div>
            <p className="reel-description">{reel.description}</p>
            <button
              type="button"
              className="reel-button"
              onClick={() => navigate(`/food-partner/${reel.partnerId}`)}
            >
              Visit store
            </button>
          </div>

          <div className="reel-actions">
            <button type="button" className="action-button" onClick={() => handleLike(reel.id)}>
              <span className="action-icon"><Heart /></span>
              <span>{reel.likeCount}</span>
            </button>
            <button
              type="button"
              className={`action-button ${savedIds.includes(reel.id) ? "active" : ""}`}
              onClick={() => handleSave(reel.id)}
            >
              <span className="action-icon"><Bookmark /></span>
              <span>{savedIds.includes(reel.id) ? "Saved" : "Save"}</span>
            </button>
          </div>
        </section>
      ))}

      <nav className="bottom-nav">
        <button type="button" className="nav-button active" onClick={() => navigate("/")}>Home</button>
        <button type="button" className="nav-button" onClick={() => navigate("/saved")}>Saved</button>
      </nav>
    </main>
  );
};

export default Home;