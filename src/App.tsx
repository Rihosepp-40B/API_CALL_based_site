import { Routes, Route } from 'react-router-dom';
import MenuApp from './Menu.tsx';
import HomeApp from './Home.tsx';
import { ListApp } from './API_list.tsx';
import FooterApp from './Footer.tsx';

export default function App() {

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
              <ListApp />}
          />
        </Routes>
      </main>

      <footer className="sticky-bottom">
        <FooterApp />
      </footer>
    </div>
  );
}