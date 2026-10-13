import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@fontsource-variable/outfit';
import '@fontsource-variable/figtree';
import './styles/tokens.css';
import './styles/global.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import Especialidades from './pages/Especialidades';
import Profissionais from './pages/Profissionais';
import Contato from './pages/Contato';
import Agendamento from './pages/Agendamento';
import Faq from './pages/Faq';
import Privacidade from './pages/Privacidade';
import Obrigado from './pages/Obrigado';
import NaoEncontrada from './pages/NaoEncontrada';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quem-somos" element={<QuemSomos />} />
          <Route path="especialidades" element={<Especialidades />} />
          <Route path="profissionais" element={<Profissionais />} />
          <Route path="contato" element={<Contato />} />
          <Route path="agendamento" element={<Agendamento />} />
          <Route path="faq" element={<Faq />} />
          <Route path="privacidade" element={<Privacidade />} />
          <Route path="obrigado" element={<Obrigado />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
