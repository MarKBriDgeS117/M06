import Article from "./article.js";
import {
    recuperarFactures
} from "./funcions.js";

export default class Factura {
    constructor(NumFactura, Articles) {
        this.NumFactura = NumFactura;
        this.Articles = Articles;
    }
    calcularNumFactura() {
        this.NumFactura = new Date().getFullYear() + "\\" + recuperarFactures().length;
        document.getElementsByTagName("span")[0].innerHTML = this.NumFactura;
        this.guardarFactura();
    }
    calcularValors() {
        let Total = 0;
        this.Articles.forEach(element => {
            Total = +Total++ + element.Total;
        });
        let Iva = Total * 0.21;
        let ImportTotal = Total + Iva;
        document.getElementsByTagName("span")[1].innerHTML = Total;
        document.getElementsByTagName("span")[2].innerHTML = Iva;
        document.getElementsByTagName("span")[3].innerHTML = ImportTotal;
    }

    PintarFactura() {
        var tbodyEl = document.querySelector("tbody");
        while (tbodyEl.hasChildNodes()) tbodyEl.removeChild(tbodyEl.firstChild);
        this.Articles.forEach((article, index) => {
            tbodyEl.insertAdjacentHTML("beforeend", ` <tr> <td>${article.Codi}</td><td>${article.Nom}</td><td><input type="number" name= quantitat${index}  value="${article.Quantitat}"></td><td id = preu${index}>${article.Preu}</td><td id = total${index}>${article.Total}</td></tr>`);
            document.getElementsByName('quantitat' + index)[0].addEventListener("change", CalcularTotalArticle(index, article, this));
        });
    }

    PintarArticleFactura(article) {
        let tbodyEl = document.querySelector("tbody");
        let Total = article.Preu * article.Quantitat;
        this.Articles.push(new Article(article.Codi, article.Nom, article.Preu, article.Quantitat, Total));
        tbodyEl.insertAdjacentHTML("beforeend", ` <tr> <td>${article.Codi}</td><td>${article.Nom}</td><td><input type="number" name= quantitat${this.Articles.length}  value="${article.Quantitat}"></td><td id = preu${this.Articles.length}>${article.Preu}</td><td id = total${this.Articles.length}>${Total}</td></tr>`);
        document.getElementsByName('quantitat' + this.Articles.length)[0].addEventListener("change", CalcularTotalArticle(this.Articles.length, this.Articles[this.Articles.length - 1], this));
    }

    guardarFactura() {
        let factures = recuperarFactures();
        let found = factures.find(element => element.NumFactura == this.NumFactura);
        if (found == null && this.Articles.length > 0) {
            factures.push(this)
            localStorage.setItem("hola", JSON.stringify(factures));
        } else {
            factures[factures.findIndex(element => element.NumFactura == this.NumFactura)] = this;
            localStorage.setItem("hola", JSON.stringify(factures));
        }
    }
}

function CalcularTotalArticle(codi, article, factura) {
    return function () {
        let Preu = document.getElementById("preu" + codi).innerText;
        let Quantitat = document.getElementsByName('quantitat' + codi)[0].value;
        article.ActualitzarPreuQuantitat(Preu, Quantitat);
        article.calcularTotal();
        if (article.Quantitat <= 0) {
            var index = factura.Articles.indexOf(article);
            if (index !== -1) factura.Articles.splice(index, 1);
            factura.PintarFactura();
        } else {
            document.getElementById("total" + codi).innerText = article.Total;
        }
        factura.calcularValors();
        factura.guardarFactura();
    };
}