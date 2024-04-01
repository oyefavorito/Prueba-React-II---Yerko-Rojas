import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../contexts/PizzaContext";
import { Container, Card, Button } from "react-bootstrap";
import IconoCarrito from "../componentes/IconoCarrito";
import Toastify from "toastify-js";

const Pizza = () => {
  const { id } = useParams();
  const { pizzas, addCart, monedaLocal } = useContext(Context);

{/*TODA LA LÓGICA DE TOSASTIFY*/}

  const handleAddToCart = (pizza) => {
    addCart(pizza);

    Toastify({
      text: "Añadiste una pizza",
      duration: 1000,
      position: "top-right",
      positionLeft: false,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      className: "toastify",
    }).showToast();
  };

  return (
    <section id="pizzasDetalle">
      {pizzas
        .filter((pizza) => pizza.id === id)
        .map((pizza, index) => (
          <Card key={index} className="row flex-row py-3" id="pizzaCard">
            <Container
              className="col-12 col-md-4 text-capitalize"
              id="pizzaImagen"
            >
              <Card.Img src={pizza.img} alt={pizza.name} />
            </Container>
            <Container className="col-12 col-md-8">
              <Card.Header id="pizzaHeader">
                <span className="text-capitalize fw-bold fs-5">
                  {pizza.name}
                </span>
              </Card.Header>
              <Card.Body>
                <Card.Text>{pizza.desc}</Card.Text>
                Ingredientes:
                <ul>
                  {pizza.ingredients.map((ingrediente, index) => (
                    <li className="text-capitalize" key={index}>
                      {" "}
                      {ingrediente}
                    </li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer className="text-center" id="pizzaFooter">
                <Card.Text className="d-flex justify-content-around align-items-center">
                  <span className="fw-bold fs-5">
                    {monedaLocal(pizza.price)}
                  </span>
                  <Button onClick={() => handleAddToCart(pizza)}>
                    Añadir <IconoCarrito tamaño=".9rem" color="white" />
                  </Button>
                </Card.Text>
              </Card.Footer>
            </Container>
          </Card>
        ))}
    </section>
  );
};

export default Pizza;
