import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./lounge.css"; 

const LoungeSearch = () => {
  const [cardData, setCardData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [filteredCards, setFilteredCards] = useState([]);

  // Fetch the CSV file and parse it
  useEffect(() => {
    Papa.parse("/Lounge.csv", {
      download: true,
      header: true,
      complete: function (results) {
        setCardData(results.data);
      },
      error: function (error) {
        console.error("Error fetching CSV:", error);
      },
    });
  }, []);

  // Handle search input
  const handleSearchInput = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    if (value.length > 0) {
      const filtered = cardData.filter(
        (card) => card.card && card.card.toLowerCase().includes(value)
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards([]);
    }
  };

  // Display card details when selected
  const displayCardDetails = (cardName) => {
    const lounges = cardData.filter((card) => card.card === cardName);
    setSelectedCard({ cardName, lounges });
    setFilteredCards([]);
  };

  return (
    <div className="container">
      <h1>Search for a Credit Card</h1>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInput}
        placeholder="Enter card name"
        autoComplete="off"
      />

      {filteredCards.length > 0 && (
        <ul className="dropdown">
          {filteredCards.map((card, index) => (
            <li key={index} onClick={() => displayCardDetails(card.card)}>
              {card.card}
            </li>
          ))}
        </ul>
      )}

      {selectedCard && (
        <div className="card-details">
          <h1>Card Details</h1>
          <h2>
            <strong>Card Name:</strong> {selectedCard.cardName}
          </h2>
          <h3>Lounges</h3>
          <div className="lounge-list">
            {selectedCard.lounges.map((card, index) => (
              <div key={index} className="lounge-card">
                {card.Image && (
                  <img src={card.Image} alt={`${card.Lounge} image`} className="lounge-image"/>
                )}
                <h4>{card.Lounge}</h4>
                <p>Terminal: {card.Terminal}</p>
                <p>Airport: {card.Airport}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoungeSearch;
