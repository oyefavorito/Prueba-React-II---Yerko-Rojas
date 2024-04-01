import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import logoPizza from "../assets/imgs/Logo.jpg";
import { useContext } from "react";
import { Context } from "../contexts/PizzaContext";
import IconoCarrito from "./IconoCarrito";

const BarraNavegacion = () => {
  const { totalCart, monedaLocal } = useContext(Context);

  return (
    <Navbar sticky="top" id="barraNavegacion">
      <NavLink to={"/"} className="logo">
        <img src={logoPizza} alt="Pizza Mamma Mía" />
        <span>
          {" "}
          <strong>Mamma Mia</strong>
        </span>
      </NavLink>
      <NavLink to={"/carrito"} className={totalCart ? "cart-price" : "cart"}>
        <IconoCarrito tamaño="1.7rem" color="white" />
        {totalCart ? "  " + monedaLocal(totalCart) : null}
      </NavLink>
    </Navbar>
  );
};

export default BarraNavegacion;
