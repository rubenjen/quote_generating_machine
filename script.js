// Get elements by Id
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
// Get quotes from the API
let apiQuotes = [];

//Show a new quote
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // If quote has no author, set it to 'Unknown'
    if (!quote.author) {
        quoteAuthor.textContent = "Unknown";
    } else {
        quoteAuthor.textContent = quote.author;
    }
    //Change font depending on quote length
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}
async function getQuotes() {
    const apiUrl = ('https://type.fit/api/quotes');
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch (error) {
        // Handle the error here
        
    }
}
//Create a tweet quote function
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}&hashtags=madeinkenya,kenyahowtoguides,kenyahelpingkenyans`;
    window.open(twitterUrl, '_blank');
}
// Add event listners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

//On page load, run getQuotes function
getQuotes();