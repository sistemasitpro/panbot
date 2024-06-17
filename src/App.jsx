import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AddExpense from "./pages/AddExpense";
import ViewExpenses from "./pages/ViewExpenses";
import { Toaster } from "react-hot-toast";
import Nav from "./templates/Nav";
import EditExpense from "./pages/EditExpense";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Nav />}>
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/edit-expense/:id" element={<EditExpense />} />
          <Route index path="/view-expenses" element={<ViewExpenses />} />
        </Route>
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
