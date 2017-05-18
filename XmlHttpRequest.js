// ==UserScript==
// @name        XMLHttpRequest
// @namespace   moi
// @version     1
// @grant       none
// ==/UserScript==

var xhr_object = null; 

if(window.XMLHttpRequest) // Firefox 
   xhr_object = new XMLHttpRequest(); 
else if(window.ActiveXObject) // Internet Explorer 
   xhr_object = new ActiveXObject("Microsoft.XMLHTTP"); 
else { // XMLHttpRequest non supporté par le navigateur 
   alert("Votre navigateur ne supporte pas les objets XMLHTTPRequest..."); 
   return; 
} 
 
xhr_object.open("POST", "https://puitgf.oxatis.com/ADDBEditProducts.asp", true); //https://puitgf.oxatis.com/ADDBEditProducts.asp
/*xhr_object.onreadystatechange = function() { 
   if(this.readyState == 4) alert(this.responseText); 
}*/

var form = new FormData();
form.append('FLTRCODE','17-05-17-BEJ-1');

xhr_object.send(form); 

xhr_object.open("GET", location.href, true);
xhr_object.onreadystatechange = function() { 
   if(this.readyState == 4) alert(this.responseText); 
};