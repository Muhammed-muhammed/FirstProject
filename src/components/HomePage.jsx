import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useQueryClient, useQuery } from '@tanstack/react-query';

function HomePage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const fetchQuotes = async (numQuotes) => {
        const response = await axios.get(`https://type.fit/api/quotes?amount=${numQuotes}`);
        return response.data;
    };

    const { data, isError } = useQuery(['Quotes', 10], () => fetchQuotes(10));

    const handleButtonClick = async () => {
        setIsLoading(true);
        setCurrentIndex((index) => (index + 1) % (data?.length || 1));
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);

        if ((currentIndex + 1) % (data?.length || 1) === 0) {
            queryClient.invalidateQueries(['Quotes', 10]);
        }
    };

    if (isError) {
        return <p>Error loading quotes. Please try again.</p>;
    }

    return (
        <div className="quote--container" style={{ position: 'relative' }}>
            {isLoading && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                </div>
            )}

            <p className="quote">
                {data && (
                    data[currentIndex].text.split(' ').map((word, index) => (
                        <span key={index} className={index === 0 ? "quote--highlight" : ""}>
                            {index > 0 && ' '}{word}
                        </span>
                    ))
                )}
            </p>
            <p className="quote--author">&ndash;{data && data[currentIndex].author}</p>
            <button style={{ marginTop: '2rem' }} onClick={handleButtonClick}>
            More Inspiration
            </button>
        </div>
    );
}

export default HomePage;
