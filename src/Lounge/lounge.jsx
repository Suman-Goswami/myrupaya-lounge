import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./lounge.css";

const LoungeSearch = () => {
  const [cardData, setCardData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [filteredCards, setFilteredCards] = useState([]);
  const [noOffers, setNoOffers] = useState(false); // State to show "No Offers" message

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
      // Filter cards based on the input value
      const filtered = cardData.filter(
        (card) => card.card && card.card.toLowerCase().includes(value)
      );
      setFilteredCards(filtered);
      setNoOffers(filtered.length === 0); // Show "No Offers" message if no cards match
    } else {
      // Reset the filtered cards, selected card, and "No Offers" state when input is cleared
      setFilteredCards([]); // Clear offers
      setNoOffers(false); // Reset "No Offers" message
      setSelectedCard(null); // Clear selected card details
    }
  };

  // Display card details when selected
  const displayCardDetails = (cardName) => {
    const lounges = cardData.filter((card) => card.card === cardName);
    setSelectedCard({ cardName, lounges });
    setSearchValue(cardName); // Set the selected card name in the input field
    setFilteredCards([]); // Reset filtered cards when a card is selected
    setNoOffers(false); // Reset "No Offers" message
  };

  return (
    <div className="container">
    {/* Navbar Component */}
    <nav style={styles.navbar}>
  <div style={styles.logoContainer}>
    <a href="https://www.myrupaya.in/">
      <img
        src="https://static.wixstatic.com/media/f836e8_26da4bf726c3475eabd6578d7546c3b2~mv2.jpg/v1/crop/x_124,y_0,w_3152,h_1458/fill/w_909,h_420,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/dark_logo_white_background.jpg"
        alt="MyRupaya Logo"
        style={styles.logo}
      />
    </a>
    {/* Move the links here */}
    <div
      style={{
        ...styles.linksContainer,
        
      }}
    >
      <a href="https://www.myrupaya.in/" style={styles.link}>
        Home
      </a>
    </div>
  </div>
</nav>
      <h1>Free Lounge Access in Indian Airport of Credit Cards</h1>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInput}
        placeholder="Enter card name"
        autoComplete="off"
      />

      {/* Dropdown showing filtered cards */}
      {filteredCards.length > 0 && (
        <ul className="dropdown">
          {filteredCards.map((card, index) => (
            <li key={index} onClick={() => displayCardDetails(card.card)}>
              {card.card}
            </li>
          ))}
        </ul>
      )}

      {/* No offers message */}
      {noOffers && searchValue.length > 0 && (
        <p style={{ color: "red" }}>No offers available for this card.</p>
      )}

      {/* Display card details when a card is selected */}
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
                  <img
                    src={card.Image}
                    alt={`${card.Lounge} image`}
                    className="lounge-image"
                  />
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

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 10px",
    backgroundColor: "#CDD1C1",
    width: "100%", // Ensure the navbar spans the full width of the screen
    boxSizing: "border-box", // Includes padding in width calculation
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "100px",
    height: "100px",
    marginRight: "20px",
  },
  linksContainer: {
    display: "flex",
    gap: "35px",
    flexWrap: "wrap",
    marginLeft: "40px", // Adjust spacing from the logo
  },
  link: {
    textDecoration: "none",
    color: "black",
    fontSize: "18px", // Increased font size
    fontFamily: "Arial, sans-serif",
    transition: "color 0.3s ease", // Smooth transition effect
  },
  mobileMenuOpen: {
    display: "block",
  },
};



export default LoungeSearch;
