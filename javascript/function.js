function display (element, bool) {
    if (bool) {
        element.style.display = "";
    } else {
        element.style.display = "none";
    }
}

function visibility (element, bool) {
    if (bool) {
        element.style.visibility = "visible";
    } else {
        element.style.visibility = "hidden";
    }
}

function getWindowWidth() {
    var windowWidth=0;
    if (typeof(window.innerWidth)=='number') {
      windowWidth=window.innerWidth;
    } else {
      if (document.documentElement&& document.documentElement.clientWidth) {
        windowWidth = document.documentElement.clientWidth;
      } else {
        if (document.body&&document.body.clientWidth) {
          windowWidth=document.body.clientWidth;
        }
      }
    }
    return windowWidth;
}

function Premiere(chaine) {
    return chaine.substr(0,1).toUpperCase() + chaine.substr(1,chaine.length).toLowerCase()
}

function collectionIndexOf(collection, ele) {
  for (var i = 0; i < collection.length; i++) {
    if( collection[i] == ele ) {
      return i;
    }
  }
  return -1;
}