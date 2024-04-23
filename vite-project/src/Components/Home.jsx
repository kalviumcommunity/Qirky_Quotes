import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
    const [quoteData, setQuoteData] = useState([]);

    const fetchData = async () => {
        console.log("fetchingf")
        try {
            const response = await axios.get('https://qirky-quotes-2.onrender.com/data');
            setQuoteData(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(()=>{
        console.log("QD IS",quoteData)
    },[quoteData])

    return (
        <div>
            <div className="main-content">
                {/* Display most quirky quotes */}
                <div className="quote-list">
                    <h2>Most Quirky Quotes:</h2>
                    {quoteData && quoteData.map((quote, index) => (
                        <div key={index} className="quote-item">
                            <img src={quote.image} alt={quote.image} />
                            <blockquote>    
                                <p>{quote.quote}</p>
                                <footer>- {quote.author}</footer>
                                {/* Display current rating */}
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