import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import Navbar from './Navbar';
import Header from './Header';
import Hero from './Hero';
import Blog from './pages/Blog'; // Beispiel für eine zweite Seite
import BlogDetail from './pages/BlogDetail';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
            </>
          }
        />
        <Route
          path="/blog"
          element={<Blog />}
        />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
