import { Routes, Route } from 'react-router-dom';
import MenuApp from './page_parts/Menu.tsx';
import HomeApp from '../home/Home.tsx';
import ExtraApp from '../extra/Extra.tsx';
import { ListApp } from '../API_list/API_list.tsx';
import FooterApp from './page_parts/Footer.tsx';
import './App.css'
import '../API_list/list_item.css'

export default function App() {
// see ühendab ja teisi .tsx faile ning määrab millisel URL pathil mingi asi on.
  return (
    <div className="app-container">
      <header className="sticky-top">
        <MenuApp />
      </header>
      
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomeApp />} />
          <Route
            path="/ChuckJokes"
            element={
              <ListApp />} />
          <Route
            path="/Extra"
            element={
              <ExtraApp />} />
        </Routes>
      </main>

      <footer className="sticky-bottom">
        <FooterApp />
      </footer>
    </div>
  );
}