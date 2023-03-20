const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading
function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

// Hide Loading
function loadingComplete() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

// Get new quote
function newQuote() {
	loading();
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	// Check if Author field is blank and replace it with "Unknown".
	if (!quote.author) {
		authorText.textContent = "Unknown";
	} else {
		authorText.textContent = quote.author;
	}
	// Check quote length to determine styling
	if (quote.text.length > 120) {
		quoteText.classList.add("long-quote")
	} else {
		quoteText.classList.remove("long-quote")
	}
	// Set quote and hide the loader
	quoteText.textContent = quote.text;
	loadingComplete();
}

// Getting quotes from API
async function getQuotes() {
	loading();
	const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
	try {
		const response = await fetch(apiURL);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
	}
} 

// Tweet quote
function tweetQuote() {
	const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterURL, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();