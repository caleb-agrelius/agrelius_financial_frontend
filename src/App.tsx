import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Title from './components/title/Title';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

function App() {
  const blogs = [
    { title: 'Blog Post 1', content: 'This is the content of blog post 1.' },
    { title: 'Blog Post 2', content: 'This is the content of blog post 2.' },
    { title: 'Blog Post 3', content: 'This is the content of blog post 3.' }
  ]
  const [currentPage, setCurrentPage] = React.useState('home');
  return (
    <div className="App">
      <div className="app-header">
        <Title />
        <Navbar setCurrentPage={setCurrentPage} />
      </div>
      <div>
        {currentPage === 'home' && <Home />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'blog' && <Blog blogs={blogs} />}  
      </div>
    </div>
  );
}

export default App;
