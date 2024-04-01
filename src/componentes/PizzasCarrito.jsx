import { Table, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Context } from "../contexts/PizzaContext";

const PizzasCarrito = () => {
  const { cart, decreaseCount, increaseCount, totalCart, monedaLocal } =
    useContext(Context);

  {
    /*LÓGICA ALERTA PARA PAGAR*/
  }

  const handleIrAPagar = () => {
    Swal.fire({
      title: "Ingresa tu correo electrónico para hacer envío de tu ticket",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Enviar",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const githubUrl = `https://api.github.com/users/${login}`;
          const response = await fetch(githubUrl);
          if (!response.ok) {
            return Swal.showValidationMessage(
              JSON.stringify(await response.json())
            );
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
      customClass: {
        popup: 'my-custom-popup-class custom-swal-background', }

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  };

  return (
    <section id="carritoConProductos">
      <Table responsive>
        <tbody>
          {cart.map((pizza, index) => (
            <tr id="tablaCarrito" key={index}>
              <td>
                <img src={pizza.img} alt={pizza.name} />
              </td>
              <td className="w-75 text-capitalize">{pizza.name}</td>
              <td>
                <Button onClick={() => decreaseCount(index)}>-</Button>
              </td>
              <td>{pizza.count}</td>
              <td>
                <Button onClick={() => increaseCount(index)}>+</Button>
              </td>
              <td>=</td>
              <td>{monedaLocal(pizza.count * pizza.price)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="text-end fw-bold">
              Total
            </td>
            <td>=</td>
            <td className="fw-bold">{monedaLocal(totalCart)}</td>
          </tr>
        </tfoot>
      </Table>
      <Button className="float-end" onClick={handleIrAPagar}>
        Ir a pagar
      </Button>
    </section>
  );
};

export default PizzasCarrito;
