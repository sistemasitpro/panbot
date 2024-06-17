import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses";
import { Toaster } from "react-hot-toast";
import Nav from "./templates/Nav";
import EditExpense from "./pages/EditExpense";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import EditUser from "./pages/EditUser";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/", { replace: true });
      } else {
        if (window.location.pathname === "/") {
          navigate("/view-expenses", { replace: true });
        }
      }
    });
  }, [navigate]);

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
