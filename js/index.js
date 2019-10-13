function updateInput(input) {
  setDownloadURI();
  updateImage();
  setCookie(input.id, input.value);
}

function waitForInput() {
  var queries = getQueries();
  var inputs = document.getElementsByClassName("update");
  var validQuery = false;

  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    var queryValue = queries[input.id];
    if(queryValue) {
      input.value = queryValue;
      validQuery = true;
    }
    input.onkeyup = function(input){
      return function(){updateInput(input)}
    }(input);
  }

  if (validQuery==false) {
    for (var i = 0; i < inputs.length; i += 1) {
      var input = inputs[i];
      var savedValue = getCookie(input.id);
      if (savedValue) {
        input.value = savedValue;
      }
    }
  }
  updateImage();
  setDownloadURI();
}

function getQueries() {
  var qs = document.location.search;
  var tokens, re = /[?&]?([^=]+)=([^&]*)/g;
  qs = qs.split("+").join(" ");

  var queries = {};
  while (tokens = re.exec(qs)) {
    var id = decodeURIComponent(tokens[1]);
    var content = decodeURIComponent(tokens[2]);
    queries[id] = content;
  }
  return queries;
}

window.addEventListener("load", waitForInput);

function setDownloadURI() {
  var queryString = generateQueryString();
  var nameOfUser = document.getElementById('text-name').value || 'page';

  var content = "<!DOCTYPE html><html><script>document.location=\"./index.html" + queryString +"\"</script></head></html>";
  var uri = "data:text/html," + encodeURIComponent(content);
  var saveLink = document.getElementById("save-link");
  saveLink.download = "settings-" + nameOfUser + ".html";
  saveLink.href=uri;
}

function updateImage() {
  var query_string = generateQueryString();
  var preview = document.getElementById("preview");
  preview.src = "img/certificate.svg" + query_string;
  var preview_links = document.getElementsByClassName("preview-link");
  for(var i = 0; i < preview_links.length; i += 1) {
    var preview_link = preview_links[i];
    preview_link.href = preview_link.attributes["src"].value + query_string;
  }
}

function generateQueryString() {
  var inputs = document.getElementsByClassName("update");
  var query = [];
  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    var id = input.id;
    var text = input.value;
    if (text != "") {
      query.push(encodeURIComponent(id) + "=" + encodeURIComponent(text));
    }
  }
  var query_string = "";
  if (query.length > 0) {
    query_string = "?" + query.join("&");
  }
  return query_string;
}

function generateSpecification() {
  var inputs = document.getElementsByClassName("update");
  var specification = {};
  for (var i = 0; i < inputs.length; i += 1) {
    var input = inputs[i];
    var id = input.id;
    var text = input.value;
    if (text != "") {
      specification[id] = text;
    }
  }
  return specification;
}

function changeText(id, text) {
  var element = document.getElementById(id);
  element.value = text;
  updateImage();
}

