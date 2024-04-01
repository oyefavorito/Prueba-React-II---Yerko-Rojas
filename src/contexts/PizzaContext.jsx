import React from "react";
import { useState, createContext, useEffect } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getPizzas = async () => {
      try {
        const res = await fetch("/src/data/pizzas.json");

        // Verificar si la respuesta es exitosa (status 200)
        if (!res.ok) {
          throw new Error(`Error al obtener los datos: ${res.status}`);
        }

        const data = await res.json();
        setPizzas(data);
      } catch (error) {
        console.error("Error fetching pizzas:", error);
      }
    };

    getPizzas();
  }, []);

  const monedaLocal = (valor) =>
    valor.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  const addCart = (pizza) => {
    const foundPizza = cart.findIndex((cartPizza) => cartPizza.id === pizza.id);

    if (foundPizza < 0) {
      pizza.count = 1;
      setCart([...cart, pizza]);
    } else {
      cart[foundPizza].count++;
      setCart([...cart]);
    }
  };

  const increaseCount = (index) => {
    cart[index].count++;
    setCart([...cart]);
  };

  const decreaseCount = (index) => {
    if (cart[index].count === 1) {
      cart.splice(index, 1);
    } else {
      cart[index].count--;
    }
    setCart([...cart]);
  };

  const totalCart = cart.reduce(
    (acumulador, { price, count }) => acumulador + price * count,
    0
  );

  return (
    <Context.Provider
      value={{
        pizzas,
        cart,
        setCart,
        addCart,
        decreaseCount,
        increaseCount,
        totalCart,
        monedaLocal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
