import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Store } from "./pages/Store"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4 bg-light">

        <Routes>
          <Route path="/shopping-cart/" element={<Home />} />
          <Route path="/shopping-cart/Store" element={<Store />} />
          <Route path="/shopping-cart/About" element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>


  )
}

export default App
