import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarraNavegacion from "./componentes/BarraNavegacion";

import Provider from "./contexts/PizzaContext";
import Home from "./views/Home";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Carrito from "./views/Carrito";
import Pizza from "./views/Pizza";
import NotFound from "./views/NotFound";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <BarraNavegacion />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizza/:id" element={<Pizza />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
