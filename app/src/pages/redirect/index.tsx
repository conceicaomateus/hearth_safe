import { useEffect } from "react";
import { useNavigate } from "react-router";

export function RedirectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN_STORAGE_KEY");
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}
