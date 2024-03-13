// const datauser = JSON.parse(localStorage.getItem('activeUser'));


// if (datauser) {
//     guestsUser = datauser;
//     let txt = guestsUser.name;
//     let name = txt.split(' ');
//     console.log(name);
//     if (name.length >= 2) {
//         profileName.innerText = `${name[0][0]} ${name[1][0]}`;
//     } else if (name.length === 1) {
//         profileName.innerText = `${name[0][0]}`;
//     } else {
//         alert('Error');
//     }
// }


function checks() {
  let profilInfo = document.querySelector('.clickInfoDiv');
  if (profilInfo.style.display === 'block') {
      profilInfo.style.display = 'none';
  } else {
      profilInfo.style.display = 'block';
  }
}


function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

