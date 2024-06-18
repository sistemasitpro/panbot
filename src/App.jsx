import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses";
import { Toaster } from "react-hot-toast";
import Nav from "./templates/Nav";
import EditExpense from "./pages/EditExpense";
import NotFound from "./pages/NotFound";
import { useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";
import EditUser from "./pages/EditUser";

let expires_at = null;

const App = () => {
  const navigate = useNavigate();
  const expiresAtRef = useRef(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/", { replace: true });
      } else {
        if (window.location.pathname === "/") {
          navigate("/view-expenses", { replace: true });
        }
      }
      expires_at = session ? session.expires_at : null;
      expiresAtRef.current = expires_at;
    });
  }, [navigate]);

  const refreshToken = async () => {
    const rememberMe = sessionStorage.getItem("rememberMe");
    const currentExpiresAt = expiresAtRef.current;

    if (rememberMe !== null && rememberMe) {
      if (currentExpiresAt) {
        const currentTime = new Date().getTime() / 1000;

        if (currentExpiresAt - currentTime < 60) {
          try {
            const { data, error } = await supabase.auth.refreshSession();
            if (error) {
              console.error("Error refreshing session:", error);
            } else {
              console.log("Session refreshed successfully:", data);
              expires_at = data.expires_at;
              expiresAtRef.current = expires_at;
            }
          } catch (error) {
            throw new Error(error);
          }
        }
      }
    }
  };

  useEffect(() => {
    refreshToken();
    const intervalId = setInterval(refreshToken, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Nav />}>
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/edit-expense/:id" element={<EditExpense />} />
          <Route index path="/view-expenses" element={<ViewExpenses />} />
          <Route index path="/edit-user" element={<EditUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 5000,
          success: {
            duration: 5000,
          },
        }}
      />
    </>
  );
};

export default App;
