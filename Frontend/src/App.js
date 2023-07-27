import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Navbar from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { ShoppingCartProviderV2 } from './context/ShoppingCartContextV2';


function App() {
  return (
    <ShoppingCartProviderV2>
      <Navbar/>
      
      <Container>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </Container>
    </ShoppingCartProviderV2>
  );
}

export default App;
