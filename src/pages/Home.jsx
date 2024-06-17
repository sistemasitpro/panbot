import { Link } from "react-router-dom";
import Nav from "../templates/Nav";

const Home = () => {
  return (
    <>
      <Nav />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Control de Gastos</h1>
        <Link
          to="/add-expense"
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          Añadir Gasto
        </Link>
        <Link
          to="/view-expenses"
          style={{ margin: "10px", padding: "10px 20px" }}
        >
          Consultar Gastos
        </Link>
      </div>
    </>
  );
};

export default Home;
