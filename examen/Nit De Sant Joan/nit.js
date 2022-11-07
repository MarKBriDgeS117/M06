var all_circles = [];
window.onload = function start() {
  Pintar();
  modificarValorInicialSlider();
  Slider();
}

class Circle {
  constructor(xpos, ypos, radius, color, shadowBlur, fillStyle) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
    this.shadowBlur = shadowBlur;
    this.fillStyle = fillStyle;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.fillStyle;
    ctx.shadowBlur = this.shadowBlur;
    ctx.shadowColor = this.color;
    ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }


}

class Nit {
  constructor(ctx, width, height, style) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.style = style;
  }

  mostrar(cnv, ctx) {
    cnv.width = this.width;
    cnv.height = this.height;
    ctx.fillStyle = this.style;
    ctx.fillRect(0, 0, this.width, this.height);

  }
}

function CrearCercles(all_circles) {
  let AlertContador = 0;
  while (all_circles.length < localStorage.getItem("numeroEstrelles") && AlertContador < 17000) {
    let contador = 0;
    AlertContador++;
    let CercleNou = CrearCercle();
    all_circles.forEach((Cercle, index, arr) => {
      if (CalcularDistancia(Cercle, CercleNou)) contador++;
      else index = arr.length + 1;
    });
    if (contador == all_circles.length) all_circles.push(CercleNou);
  }
  if (AlertContador == 17000) alert("Les estrelles no es poden pintar fes la pantalla més gran i refresca la pantalla");
  return all_circles;
}

function Pintar() {
  let nit = PintarPantalla();
  all_circles = CrearCercles(all_circles);
  for (let i = 0; i < localStorage.getItem("numeroEstrelles"); i++) all_circles[i].draw(nit.ctx); 
}

function PintarPantalla() {
  var ctx = cnv.getContext("2d");
  let nit = new Nit(ctx, window.innerWidth, window.innerHeight, "#112");
  nit.mostrar(cnv, ctx);
  return nit;
}
function getRandomColor() {
  color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  return color;
}

function CrearCercle() {
  return new Circle(Random(5, window.innerWidth - 6), Random(5, window.innerHeight - 30), Random(1, localStorage.getItem("radiMaxim")), getRandomColor(), Random(1, 10), "rgba(255, 255, 255," + Math.random() + 0, 1 + ")");
}

function CalcularDistancia(circl1, circl2) {
  if (Math.sqrt((circl2.xpos - circl1.xpos) ** 2 + (circl2.ypos - circl1.ypos) ** 2) - (circl2.radius + circl1.radius) > localStorage.getItem("DistanciaMinima")) return true;
  else return false;
}

function Random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function modificarValorSlider() {
  this.nextElementSibling.value = this.value;
  localStorage.setItem("numeroEstrelles", this.value);
  all_circles.splice(localStorage.getItem("numeroEstrelles"), all_circles.length);
  Pintar();
}

function modificarValorInicialSlider() {
  document.getElementsByTagName("output")[0].value = localStorage.getItem("numeroEstrelles");
  document.getElementById("total").setAttribute("value", localStorage.getItem("numeroEstrelles"));
}

function Slider() {
  document.getElementById("total").addEventListener("change", modificarValorSlider);
}