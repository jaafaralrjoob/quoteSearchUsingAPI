const searchInput = document.getElementById("search-input");
const quoteList = document.getElementById("quote-list");
const apiUrl = "https://dummyjson.com/quotes";

// Fetch quote data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const quotes = data.quotes;

    // Display all quotes initially
    displayQuotes(quotes);

    // Add event listener for input changes
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();

      // Filter quotes based on the keyword
      const filteredQuotes = quotes.filter((quote) =>
        quote.quote.toLowerCase().includes(keyword)
      );

      // Display the filtered quotes
      displayQuotes(filteredQuotes);
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    quoteList.innerHTML =
      '<li class="quote-item">Failed to fetch quotes from the API.</li>';
  });

// Display quotes in the quote list
function displayQuotes(quotes) {
  quoteList.innerHTML = "";

  if (quotes.length === 0) {
    quoteList.innerHTML = '<li class="quote-item">No quotes found.</li>';
    return;
  }

  quotes.forEach((quote) => {
    const quoteItem = document.createElement("li");
    quoteItem.classList.add("quote-item");
    quoteItem.innerHTML = `
      <div class="quote-text">"${quote.quote}"</div>
      <div class="quote-author">- ${quote.author}</div>
    `;
    quoteList.appendChild(quoteItem);
  });
}
