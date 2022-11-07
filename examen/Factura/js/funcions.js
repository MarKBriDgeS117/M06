import Article from "./article.js";
import Factura from "./factura.js";


export function recuperarFactures() {
    let obj = JSON.parse(localStorage.getItem("hola"));
    let NovesFactures = [];
    if (obj != null) {
        obj.forEach(element => {
            let Articles = [];
            element.Articles.forEach(element => {
                Articles.push(new Article(element.Codi, element.Nom, element.Preu, element.Quantaitat, element.Total));
            });
            NovesFactures.push(new Factura(element.NumFactura, Articles, element.Total))
        });
    }
    return NovesFactures;
}
export function addOptions(domElement, array) {
    array.forEach(value => {
        let option = document.createElement("option");
        option.text = value;
        document.getElementsByName(domElement)[0].add(option);
    });
}
export function carregarFamilia() {
    let Articles = TornarArticles();
    addOptions("provincia", [Articles[0].Nom, Articles[1].Nom, Articles[2].Nom, Articles[3].Nom, Articles[4].Nom].sort());
}
export function TornarArticles(){
    return [new Article(1, "Poma", 3, 1, 3), new Article(2, "Pera", 4, 1, 4), new Article(3, "Mandarina", 6, 1, 6), new Article(4, "Coco", 8, 1, 8), new Article(5, "Melo", 11, 1, 11)];
}