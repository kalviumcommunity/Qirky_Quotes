import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function Home() {
    const [quoteData, setQuoteData] = useState([]);

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
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/delete/${id}`);
            setQuoteData(prevQuotes => prevQuotes.filter(quote => quote._id !== id));
        } catch (error) {
            console.log('Error deleting quote:', error);
        }
    };

    return (
        <div>
            <div className="main-content">
                <div className="quote-list">
                    <h2>Most Quirky Quotes:</h2>
                    {quoteData && quoteData.map((quote, index) => (
                        <div key={index} className="quote-item">
                            <img src={quote.image} alt={quote.image} />
                            <blockquote>    
                                <p>{quote.quote}</p>
                                <div className="button-group">
                                  
                                    <button onClick={() => handleDelete(quote._id)}>Delete</button>
                                    
                                    <Link to={`/update/${quote._id}`}> 
                                        <button style={{ backgroundColor: '#085450' }} onClick={()=>console.log(quote.d)}>Update</button>
                                    </Link>
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
