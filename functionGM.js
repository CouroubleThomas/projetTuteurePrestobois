// ==UserScript==
// @name        function.js
// @namespace   projetM1
// @version     1
// @grant       none
// ==/UserScript==

//autoriser le collage

////Variables globales
var poidsTotal = 0;
var volumeTotal = 0;

////Lance les fonctions au chargement de la page
window.onload = function() {
  //includeJQuery();
  addElements();
  calculPoids();
  updateVolPdsTotal();
}

/**
 * Inclut la balise script jQuery dans la page HTML
 * 
 */
function includeJQuery()
{
    script = document.createElement('script');
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(script);
}


/**
 * Ajout des éléments souhaitées dans la page HTML
 * 
 */
function addElements()
{
  
  var table = document.getElementsByClassName('main') [1];
  var rowLivr = table.getElementsByTagName('tr') [10];
  var tdLivr = rowLivr.getElementsByTagName('td') [0];
  //tdLivr.setAttribute('valign','top');
  font = addFont(tdLivr);
  ///////ajout de div poids et volume
  var newDivLivr = document.createElement('div');
  var newSpanVol = document.createElement('span');
  newSpanVol.setAttribute('id','volumeTotal');
  //newSpanVol.innerHTML = 'Volume total : ' + volumeTotal;
  newDivLivr.appendChild(newSpanVol);
  newDivLivr.appendChild(document.createElement('br'));
  var newSpanPoids = document.createElement('span');
  newSpanPoids.setAttribute('id','poidsTotal');
  //newSpanPoids.innerHTML = 'Poids total : ' + poidsTotal;
  newDivLivr.appendChild(newSpanPoids);
  font.appendChild(newDivLivr);
  ////////ajout div Colissimo
  var newDivColi = document.createElement('div');
  var newSpanColi = document.createElement('span');
  var newSpanHeadColi = document.createElement('span');
  var newSpanHeadBColi = document.createElement('b');
  newSpanHeadBColi.innerHTML = 'Tarif Colissimo';
  if (poidsTotal > 30) {
    newSpanColi.innerHTML = 'Trop lourd de : ' + (poidsTotal - 30) + ' kg';
  } else {
    newSpanColi.innerHTML = 'Poids ok (<30kg)';
  }
  newDivColi.appendChild(newSpanHeadColi);
  newSpanHeadColi.appendChild(newSpanHeadBColi);
  newDivColi.appendChild(document.createElement('br'));
  newDivColi.appendChild(newSpanColi);
  font.appendChild(newDivColi);
  ////Ajout bouton Colissimo
  var formButtons = document.createElement('form');
  var buttonColi = document.createElement('input');
  buttonColi.setAttribute('type', 'button');
  buttonColi.setAttribute('value', 'Enregistrer un Colissimo');
  buttonColi.setAttribute('onClick', 'EnrColi();');
  ////Ajout bouton Upela
  var buttonUpela = document.createElement('input');
  buttonUpela.setAttribute('type', 'button');
  buttonUpela.setAttribute('value', 'Tarifs Upela');
  buttonUpela.setAttribute('onClick', 'tarifsUpela();');
  formButtons.appendChild(buttonColi);
  formButtons.appendChild(document.createElement('br'));
  formButtons.appendChild(buttonUpela);
  tdLivr.appendChild(formButtons);
  ////ROW BDC/////
  var firstRowBDC = document.createElement('tr');
  firstRowBDC.innerHTML = 'Bon de commande';
  var secondRowBDC = document.createElement('tr');
  secondRowBDC.className = 'tableBDC';
  var hrBDC = document.createElement('hr');
  table.appendChild(hrBDC);
  table.appendChild(firstRowBDC);
  table.appendChild(secondRowBDC);
}

/**
 * Affiche les tarifs Upela au click sur le bouton correspondant
 * 
 */
function tarifsUpela() //ne fait rien pour le moment
{
  alert('Vous avez appuyé sur le bouton Tarifs Upela');
}

/**
 * Enregistre un Colissimo au click sur le bouton correspondant
 * 
 */
function EnrColi()
{
  alert('Vous avez appuyé sur le bouton Enregistrer Colissimo');
}

/**
 * Calcule le poids de la commande
 * 
 */
function calculPoids()
{
  //(Code: planc-epi-25x025x35) dm - cm - mm
  var id = 14479014; //à passer en paramètre
  var densite = 460; //à récupérer dans le fichier densites.txt par exemple
  var listCartLines = document.getElementsByClassName('cartline');
  ////Création de tableBDC (table contenant le BDC)
  var table = document.getElementsByClassName('main') [1];
  var tableBDC = document.createElement('table');
  tableBDC.setAttribute('class', 'shopcarttable');
  var headBDC = document.createElement('tr');
  headBDC.setAttribute('class','carthead');
  var headrowBDC = document.getElementsByClassName('tableBDC')[0];
  ////headrowBDC.setAttribute('class','carthead');
  ////Création des éléments du header de tableBDC
  var articleBDC = document.createElement('td');
  articleBDC.innerHTML = 'Article';
  var epBDC = document.createElement('td');
  epBDC.innerHTML = 'ep';
  var longBDC = document.createElement('td');
  longBDC.innerHTML = 'long';
  var largBDC = document.createElement('td');
  largBDC.innerHTML = 'largeur';
  var qteBDC = document.createElement('td');
  qteBDC.innerHTML = 'qte';
  ////Ajout des noeuds dans le DOM
  headBDC.appendChild(articleBDC);
  headBDC.appendChild(epBDC);
  headBDC.appendChild(longBDC);
  headBDC.appendChild(largBDC);
  headBDC.appendChild(qteBDC);
  tableBDC.appendChild(headBDC);
  headrowBDC.appendChild(tableBDC);

  var rowHead = document.getElementsByClassName('carthead');
  var newHead = document.createElement('td');
  newHead.setAttribute('class', 'cartheadpoids');
  newHead.innerHTML = 'Poids';
  rowHead[0].appendChild(newHead);
    
  for (var i = 0; i < listCartLines.length; i++)
  {
    var item = listCartLines[i];
    var code = item.getElementsByClassName('itemcode') [0].innerText;
    var qty = item.getElementsByClassName('cartlineqty') [0].innerText;
    var splitted1 = code.split('-');
    var dim1 = splitted1[splitted1.length - 1];
    var dim2 = dim1.substring(0, dim1.length - 1);
    var splitted2 = dim2.split('x');
    var longueur = splitted2[0] * 100;
    var largeur = splitted2[1] / 10;
    var epaisseur = splitted2[2];
    var volume = (longueur * largeur * epaisseur) / 1000000;
    var poids = densite * volume;
    poidsTotal += Math.round((qty * poids)*100)/100;
    volumeTotal += Math.round((volume*qty)*100)/100;
    var newTd = document.createElement('td');
    newTd.setAttribute('class', 'cartlinepoids');
    newTd.innerHTML = Math.round((qty * poids)*100)/100 + ' kg';
    item.appendChild(newTd);
    ////////////////////////BDC////////////////////////////////////
    var name = item.getElementsByClassName('PBMainTxt') [0].innerText;
    var rowBDC = document.createElement('tr');
    var articleColBDC = document.createElement('td');
    ////modif code --> nref
    articleColBDC.innerHTML = name + "<br />" + code.replace("(","").replace(")","").replace("Code:","nref=");
    var epColBDC = document.createElement('td');
    epColBDC.innerHTML = epaisseur;
    var longColBDC = document.createElement('td');
    longColBDC.innerHTML = longueur;
    var largColBDC = document.createElement('td');
    largColBDC.innerHTML = largeur;
    var qteColBDC = document.createElement('td');
    qteColBDC.innerHTML = qty;

    ////Append dans le DOM
	rowBDC.appendChild(articleColBDC);
	rowBDC.appendChild(epColBDC);
	rowBDC.appendChild(longColBDC);
	rowBDC.appendChild(largColBDC);
	rowBDC.appendChild(qteColBDC);
	tableBDC.appendChild(rowBDC);
  }
}

/**
 * 
 * 
 */
function generateBDC()
{
  var table = document.getElementsByClassName('main') [1];
  /* Article                      ép      larg    long    qté
   avivé hêtre                  45      140     1500    7
     nréf=avive-het-15x014x45 */
}

/**
 * Insère les valeurs poidsTotal et volumeTotal calculées dans calculPoids
 * 
 */
function updateVolPdsTotal() {
    spanVol = document.getElementById('volumeTotal');
    spanVol.innerHTML = 'Volume total (en m3): ' + volumeTotal;
    spanPds = document.getElementById('poidsTotal');
    spanPds.innerHTML = 'Poids total (en kg): ' + poidsTotal;
}

/**
 * Retourne la balise font crée et insérée après l'élément passé en param
 * 
 * @param {any} element 
 * @returns 
 */
function addFont(element)
{
  var font = document.createElement('font');
  font.setAttribute("class","PBMainTxt");
  element.appendChild(font);
  return font;
}


////appel des fonctions a exécuter dans la page web oxatis
//includeJQuery();
//addElements();
//calculPoids();
//updateVolPdsTotal();