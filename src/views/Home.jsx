import { Row, Col, Card, Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../contexts/PizzaContext";
import IconoCarrito from "../componentes/IconoCarrito";
import Header from "../componentes/Header";
import Toastify from 'toastify-js'

const Home = () => {
  const { pizzas, addCart, monedaLocal } = useContext(Context);
  const navigate = useNavigate();

{/*TODA LA LÓGICA DE TOSASTIFY*/}

  const handleAddToCart = (pizza) => {
    addCart(pizza);

    Toastify({
      text: "Añadiste una pizza",
      duration: 1000,
      position:"top-right",
      positionLeft: false, 
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      className: "toastify",
    }).showToast();
  };



  return (
    <>
      <Header />
      <main>
        <Row xs={1} md={3} lg={4} className="g-3 mb-3">
          {pizzas.map((pizza) => (
            <Col key={pizza.id}>
              <Card>
                <Card.Img src={pizza.img} alt={pizza.name} />
                <Card.Header id="headerTarjeta">
                  <span className="text-capitalize fw-bold">{pizza.name}</span>
                </Card.Header>
                <Card.Body id="cuerpoTarjeta">
                  Ingredientes:
                  <ul>
                    {pizza.ingredients.map((ingrediente, index) => (
                      <li className="text-capitalize" key={index}>
                        {ingrediente}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
                <Card.Footer id="footerTarjeta" className="text-center">
                  <Card.Text className="fw-bold mb-2">
                    {monedaLocal(pizza.price)}
                  </Card.Text>
                  <Card.Text className="d-flex justify-content-around">
                    <Button onClick={() => navigate(`/pizza/${pizza.id}`)}>
                      Ver más
                    </Button>
                    <Button onClick={() => handleAddToCart(pizza)}>
                      Añadir <IconoCarrito tamaño=".9rem" color="white" />{" "}
                    </Button>
                  </Card.Text>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </main>
    </>
  );
};

export default Home;
