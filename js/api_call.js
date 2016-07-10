function apiRequest(url, handleRequest) {
  var xhr = new XMLHttpRequest();
  xhr.open(
      "GET",
      url,
      true
  );
  xhr.send();
  xhr.addEventListener("readystatechange", handleRequest, false);
  if (xhr.readyState == 4 && xhr.status == 200) {
    handleRequest();
  }
}
