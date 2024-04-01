import { useContext } from "react";
import { Context } from "../contexts/PizzaContext";
import PizzasCarrito from "../componentes/PizzasCarrito";

const Carrito = () => {
  const { cart } = useContext(Context);
  return (
    <section id="carrito">
      <h1 className="fs-4"><strong>Detalle del pedido:</strong></h1>
      {cart.length === 0 ? (
        <p>Aun no añades pizzas al carrito.</p>
      ) : (
        <PizzasCarrito />
      )}
    </section>
  );
};

export default Carrito;
