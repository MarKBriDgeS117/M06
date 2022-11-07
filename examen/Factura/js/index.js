import {carregarFamilia,recuperarFactures,TornarArticles} from "./funcions.js";
import Factura from "./factura.js";

var factura = new Factura(1, []);

window.onload = function start() {
  const formEl = document.querySelector("form");
  formEl.addEventListener("submit", AfegirArticleBoto);
  document.getElementById("botoAlta").addEventListener("click", mostraFactura);
  factura.calcularNumFactura();
  carregarFamilia();
}

function mostraFactura() {
  let factures = recuperarFactures();
  factura = factures[factures.findIndex(element => element.NumFactura == document.getElementById('codi').value)];
  if (factura != null) {
    factura.calcularValors();
    document.getElementsByTagName("span")[0].innerHTML = factura.NumFactura;
    factura.PintarFactura();
  }
}

function AfegirArticleBoto(e) {
  let Articles = TornarArticles();
  e.preventDefault();
  let article = Articles.filter(x => x.Nom === document.getElementsByName('provincia')[0].value);
  let articletrobat = factura.Articles.find(element => element.Nom == article[0].Nom);
  if (articletrobat == null) {
    factura.PintarArticleFactura(article[0]);
  } else {
    articletrobat.AumentarQuantitat();
    articletrobat.calcularTotal();
    factura.PintarFactura();
  }
  factura.guardarFactura();
  factura.calcularValors();
}