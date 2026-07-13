// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Catalog from './pages/Catalog.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from './pages/Contacto.jsx';
import Admin from './pages/Admin.jsx';
import CartPage from './pages/CartPage.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

function Layout() {
  const location = useLocation();

  // Ocultar el botón solo en la página del carrito
  const hideWhatsApp = location.pathname === "/carrito";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/panel-amali-2025" element={<Admin />} />
        </Routes>
      </main>

      {!hideWhatsApp && <WhatsAppButton />}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
