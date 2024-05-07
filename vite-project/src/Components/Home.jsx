import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function Home() {
    const [quoteData, setQuoteData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://qirky-quotes-2.onrender.com/data');
            setQuoteData(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
        const loginStatus = sessionStorage.getItem("login");
        setIsLoggedIn(loginStatus === "true");
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/delete/${id}`);
            setQuoteData(prevQuotes => prevQuotes.filter(quote => quote._id !== id));
        } catch (error) {
            console.log('Error deleting quote:', error);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("login");
        setIsLoggedIn(false);
    };

    return (
        <div>
            <div className="main-content">
                {isLoggedIn && (
                    <div className="auth-buttons">
                        <button onClick={handleLogout}><b>Logout</b></button>
                        <Link to="/form" className="auth-link">
                            <button><b>Add Data</b></button>
                        </Link>
                    </div>
                )}
                {!isLoggedIn && (
                    <div className="auth-buttons">
                        <Link to="/login" className="auth-link">
                            <button><b>Login</b></button>
                        </Link>
                        <Link to="/signup" className="auth-link">
                            <button><b>Sign Up</b></button>
                        </Link>
                    </div>
                )}
                <div className="quote-list">
                    <h2>Most Quirky Quotes:</h2>
                    {quoteData && quoteData.map((quote, index) => (
                        <div key={index} className="quote-item">
                            <img src={quote.image} alt={quote.image} />
                            <blockquote>    
                                <p>{quote.quote}</p>
                                <div className="button-group">
                                    {isLoggedIn && (
                                        <>
                                            <button onClick={() => handleDelete(quote._id)}>Delete</button>
                                            <Link to={`/update/${quote._id}`}> 
                                                <button style={{ backgroundColor: '#085450' }}>Update</button>
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <footer>- {quote.author}</footer>
                                <div className="current-rating">Rating: {quote.ranking}</div>
                            </blockquote>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;