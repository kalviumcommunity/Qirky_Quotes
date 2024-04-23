import React from 'react';
import { Route, Link, Routes} from 'react-router-dom';
import './App.css'; 
import Home from './Components/Home';
import Form from './Components/form'; 

function App() {
  // Mock data for most quirky quotes with predefined ratings
  const quotes = [
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", image: "https://cdn.britannica.com/21/94621-050-58D29508/Oscar-Wilde-1882.jpg", rating: 4 },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost", image: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Robert_Frost_NYWTS_4.jpg", rating: 5 },
    { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", image: "https://cdn.britannica.com/91/82291-050-EB7A276A/Mohandas-K-Gandhi-leader-Mahatma-Indian.jpg?w=400&h=300&c=crop", rating: 3 }
  ];

  return (
    
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-brand">Quirky Quotes</div>
          <ul className="navbar-nav">
            {/* Add a button to navigate to the Form */}
            <li>
              <Link to="/form">Go to Form</Link>
            </li>
          </ul>
        </nav>

        {/* Main content */}
        <Routes>
          <Route path='/' element={<Home/>} />
        <Route path="/form" element={<Form/>} />

        </Routes>
      </div>
    
  );
}

export default App;
