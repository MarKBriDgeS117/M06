var verificar = 1;
window.onload = function start() {
  carregarFamilia();
  Comprovar();
}

function carregarFamilia() {
  addOptions("provincia", ["Cantabria", "Asturias", "Galicia", "Andalucia", "Extremadura"].sort());
}

function addOptions(domElement, array) {
  for (value in array) {
    let option = document.createElement("option");
    option.text = array[value];
    document.getElementsByName(domElement)[0].add(option);
  }
}

function Comprovar() {
  document.getElementById('codi').addEventListener("change", ComprovarCodi);
  ComprovarMides();
  ComprovarUbicacions();
  document.getElementsByName('provincia')[0].addEventListener("change", ComprovarCodi);
  document.getElementById("botoAlta").addEventListener("click", mostraResultats);
}

function ComprovarUbicacions() {
  let regexUbicacio = [/^P\-[0-9]{2}\-(E|D)$/, /^EST\+[0-9]{2}\.[0-9]{2}$/, /^[0-9]{2}\*[a-zA-Z]{3}\*[0-9]{2}\\[0-9]{2}$/];
  for (let index = 0; index < document.getElementsByName('ubicacio').length; index++) {
    document.getElementsByName('ubicacio')[index].addEventListener("change", ComprovarUbicacio(regexUbicacio[index], index));
  }
}

function ComprovarUbicacio(regex, index) {
  return function () {
    canviarImatge(index + 1, regex.test(document.getElementsByName('ubicacio')[index].value));
  };
}

function ComprovarMides() {
  for (let index = 0; index < document.getElementsByName('mides').length; index++) {
    document.getElementsByName('mides')[index].addEventListener("change", function () {
      ComprovarMide(document.getElementsByName('mides'));
    });
  }
}

function ComprovarMide(arrayMides) {
  let count = 0;
  arrayMides.forEach(element => {
    if (/^[0-9]+$/.test(element.value)) count++;
  });
  if (count == 3) document.getElementById('p').innerHTML = arrayMides[0].value + " x " + arrayMides[1].value + " x " + arrayMides[2].value;
  else document.getElementById('p').innerHTML = "";
}

function ComprovarCodi() {
  let digitControl = ["A", "X", "M", "T", "B", "C", "S", "O", "P", "Z"];
  array = document.getElementsByTagName("select")[0].value.slice(0, 3).split("");
  regex = new RegExp("^["+array[0].toUpperCase()+array[0].toLowerCase()+"]["+array[1].toUpperCase()+array[1].toLowerCase()+"]["+array[2].toUpperCase()+array[2].toLowerCase()  + "]\\-\\d{7}\\-" + (digitControl[getSumOfDigits(Number((document.getElementById('codi').value.split("-")[1]))) % 10]) + "$");
  canviarImatge(0, regex.test(document.getElementById('codi').value));
}

function canviarImatge(index, boolea) {
  tick = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Light_green_check.svg/2048px-Light_green_check.svg.png";
  cross = "https://www.nicepng.com/png/full/128-1281943_x-400-red-x-letter.png";
  imatge = document.getElementsByTagName("img")[index];

  if (boolea && imatge.src != tick) {
    imatge.src = tick;
    verificar++;
  } else if (!boolea && imatge.src != cross) {
    imatge.src = cross;
    verificar--;
  }
}

function getSumOfDigits(num) {
  return String(num)
    .split('')
    .reduce((acc, curr) => {
      return acc + Number(curr);
    }, 0);
}

function mostraResultats() {
  if (!document.getElementById('p').innerHTML == "" && verificar == 5 && !document.getElementsByTagName('input')[1].value == "") 
    document.getElementById('resultat').innerHTML = "Familia: " + document.getElementsByName('provincia')[0].value + " Codi: " + document.getElementById('codi').value+" Nom: " +document.getElementsByTagName('input')[1].value + " Caracteristiques: " + document.getElementsByName('mides')[0].value + " x " + document.getElementsByName('mides')[1].value + " x " + document.getElementsByName('mides')[2].value + " Passadis: " + document.getElementsByName('ubicacio')[0].value + " Estanteria: " + document.getElementsByName('ubicacio')[1].value + " Forat: " + document.getElementsByName('ubicacio')[2].value;
  else document.getElementById('resultat').innerHTML = "";

}