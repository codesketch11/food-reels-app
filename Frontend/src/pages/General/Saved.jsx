import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const [savedFoods, setSavedFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/saved`, {
          withCredentials: true,
        });

        const items = response.data.savedFoods || [];
        setSavedFoods(items);
      } catch (err) {
        setError("Unable to load saved items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  return (
    <main className="saved-page">
      <section className="saved-header">
        <div>
          <h1>Saved Meals</h1>
          <p>All food items you saved are shown here.</p>
        </div>
      </section>

      {loading && <p className="saved-empty">Loading saved foods...</p>}
      {!loading && error && <p className="saved-empty saved-error">{error}</p>}
      {!loading && !error && savedFoods.length === 0 && (
        <p className="saved-empty">You haven’t saved anything yet.</p>
      )}

      <div className="saved-list">
        {savedFoods.map((food) => (
          <article key={food.id} className="saved-card">
            <video
              className="saved-video"
              src={food.videoSrc}
              muted
              loop
              playsInline
              autoPlay
            />
            <div className="saved-card-body">
              <div>
                <h2>{food.title}</h2>
                <p>{food.description}</p>
              </div>
              <div className="saved-card-actions">
                <button type="button" onClick={() => navigate(`/food-partner/${food.partnerId}`)}>
                  Visit store
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <nav className="bottom-nav">
        <button type="button" className="nav-button active" onClick={() => navigate("/")}>Home</button>
        <button type="button" className="nav-button" onClick={() => navigate("/saved")}>Saved</button>
      </nav>
    </main>
  );
};

export default Saved;
