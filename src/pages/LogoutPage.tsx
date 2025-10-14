import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_info");
    navigate("/login", { replace: true });
  }, [navigate]);

  return <p>Logging out...</p>;
}

export default LogoutPage;
