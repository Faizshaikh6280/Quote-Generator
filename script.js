"use strict";
const quoteContainer = document.querySelector("#quoteContainer");
const btnQuote = document.querySelector(".btn-quote");
const quoteText = document.querySelector("#quoteText");
const author = document.querySelector("#author");
const tweetBtn = document.querySelector(".btn-twitter");
const loader = document.querySelector(".loader");

let quoteData = [];

// spinner Loader
const loading = function () {
  loader.hidden = false;
  quoteContainer.hidden = true;
};
const completeLoading = function () {
  loader.hidden = true;
  loader.style.display = "none";
  quoteContainer.hidden = false;
};

const getQuote = function () {
  loading();
  const quote = quoteData[Math.floor(Math.random() * quoteData.length)];
  //  Check if quote author is unknwon.
  if (!quote.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = quote.author;
  }
  quoteText.textContent = quote.text;
  completeLoading();
  //  Check If Quote length is less greater
  if (quote.text.length > 50) {
    quoteText.classList.add("long-text");
  } else {
    quoteText.classList.remove("long-text");
  }
  quoteText.textContent = quote.text;
};

// Get Quote from API
const quoteApi = async function () {
  loading();
  try {
    const quoteRes = await fetch(
      "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    );
    quoteData = await quoteRes.json();
    getQuote();
    quoteContainer.style.display = "flex";
    completeLoading();
  } catch (err) {
    console.log(err);
  }
};
const tweetquote = function () {
  const tweetURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ~ ${author.textContent}`;
  window.open(tweetURL, "_blank");
};
// Event Listner
quoteApi();
btnQuote.addEventListener("click", quoteApi);
tweetBtn.addEventListener("click", tweetquote);
