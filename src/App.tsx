import { BrowserRouter, Routes, Route } from  'react-router-dom';

import { Home } from './pages/Home';
import { Favorites } from './pages/Favorites';
import { NotFound } from './pages/NotFound';

import { Header } from './components/Header';

export function App() {
  return (
    <div className={`h-screen flex flex-col bg-gray-100`}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/favorites" element={<Favorites />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
  </div>
  );
}
