import Article from "./article.js";
import recuperarFactures from "./funcions.js";

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
    BorrarFactura() {
        while (tbodyEl.hasChildNodes()) tbodyEl.removeChild(tbodyEl.firstChild);
    }
    PintarFactura() {
        var tbodyEl = document.querySelector("tbody");
        BorrarFactura();
        this.Articles.forEach((article, index) => {
            tbodyEl.insertAdjacentHTML("beforeend", ` <tr> <td>${article.Codi}</td><td>${article.Nom}</td><td><input type="number" name= quantitat${index}  value="${article.Quantitat}"></td><td id = preu${index}>${article.Preu}</td><td id = total${index}>${article.Total}</td></tr>`);
            document.getElementsByName('quantitat' + index)[0].addEventListener("change", this.CalcularTotalArticle(index, article));
        });
    }
    PintarArticleFactura(article) {
        let tbodyEl = document.querySelector("tbody");
        this.Articles.push(new Article(article.Codi, article.Nom, article.Preu, article.Quantitat, article.Total));
        tbodyEl.insertAdjacentHTML("beforeend", ` <tr> <td>${article.Codi}</td><td>${article.Nom}</td><td><input type="number" name= quantitat${this.Articles.length}  value="${article.Quantitat}"></td><td id = preu${this.Articles.length}>${article.Preu}</td><td id = total${this.Articles.length}>${article.Total}</td></tr>`);
        document.getElementsByName('quantitat' + this.Articles.length)[0].addEventListener("change", this.CalcularTotalArticle(this.Articles.length, this.Articles[this.Articles.length - 1]));
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
    CalcularTotalArticle(codi, article) {
        let factura = this;
        return function () {
            article.ActualitzarPreuQuantitat(article.Preu, document.getElementsByName('quantitat' + codi)[0].value);
            article.calcularTotal();
            if (article.Quantitat <= 0) {
                factura.Articles.splice(factura.Articles.indexOf(article), 1);
                factura.PintarFactura();
            } else document.getElementById("total" + codi).innerText = article.Total;
            factura.calcularValors();
            factura.guardarFactura();
        };
    }
}