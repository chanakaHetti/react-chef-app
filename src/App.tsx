import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recipe from './containers/Recipe';

import { AppHelper } from './helpers/AppHelper';
import './App.css';

function App() {
  return (
    <main className="container">
      <h1 className="mb-5 mt-4">{AppHelper.TITLE}</h1>

      <Router>
        <Routes>
          <Route path="/" element={<Recipe />} />
          <Route>404 Not found</Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
