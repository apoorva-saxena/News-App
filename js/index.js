NEWS_URL = "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?q=headline/";
SUMMARY_URL = "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=";

var createNewsView = function(index, newsItemJson) {
  var divNews = document.getElementById("news");
  var pNews = document.createElement("p");
  var eachNews = newsItemJson.webTitle;
  var eachUrl = newsItemJson.webUrl;
  pNews.innerHTML = eachNews;
  var button = document.createElement("BUTTON");
  button.setAttribute("id", index);
  button.addEventListener("click", function() {
      generateSummary(eachUrl);
    },
    false
  );
  var t = document.createTextNode("Show Summary");
  button.appendChild(t);
  pNews.appendChild(button);
  divNews.appendChild(pNews);
};








var xhr = new XMLHttpRequest();
xhr.open("GET", NEWS_URL, true);
xhr.send();
xhr.addEventListener("readystatechange", processRequest, false);

  function generateSummary(eachUrl) {
    console.log(eachUrl);
      var apiUrl = SUMMARY_URL + eachUrl;

      var xhr = new XMLHttpRequest();
      xhr.open(
          "GET",
          apiUrl,
          false
      );
      xhr.send();
      var responseJson = JSON.parse(xhr.response);
      var article = responseJson.text;
      document.getElementById('summary').innerHTML = article;
  }
  var newsResultsIterator = function(newsResults){
    for (var i = 0; i < newsResults.length; i++) {
      createNewsView(i, newsResults[i]);
    }
  }
  function processRequest() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          newsResultsIterator(  JSON.parse(xhr.response).response.results)
      }
  }
