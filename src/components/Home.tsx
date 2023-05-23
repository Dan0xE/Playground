import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/projects/apps");
  }, [navigate]);

  return null;
}

export default Home;
