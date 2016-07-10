var xhr = new XMLHttpRequest();
  xhr.open(
      "GET",
      "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?q=headline/",
      true
  );
  xhr.send();
  xhr.addEventListener("readystatechange", processRequest, false);

  function generateSummary(eachUrl) {
    console.log(eachUrl);
      var apiUrl = "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + eachUrl;

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

  function processRequest() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var responseJson = JSON.parse(xhr.response);
          var newsResults = responseJson.response.results;
          for (var i = 0; i < newsResults.length; i++) {
              var divNews = document.getElementById("news");
              var pNews = document.createElement("p");
              var eachNews = newsResults[i].webTitle;
              var eachUrl = newsResults[i].webUrl;
              console.log('caller:' + eachUrl);
              pNews.innerHTML = eachNews;
              button = document.createElement("BUTTON");
              button.setAttribute("id", i);
              button.addEventListener("click", function() {
                  generateSummary(i);
              },
              false
            );
              var t = document.createTextNode("Show Summary");
              button.appendChild(t);
              pNews.appendChild(button);
              divNews.appendChild(pNews);
          }
      }
  }
