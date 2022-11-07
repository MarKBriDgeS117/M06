export default class Article {
    constructor(Codi, Nom, Preu, Quantitat, Total) {
        this.Codi = Codi;
        this.Nom = Nom;
        this.Preu = Preu;
        this.Quantitat = Quantitat;
        this.Total = Total;
    }
    ActualitzarPreuQuantitat(preu, quantiat) {
        this.Preu = preu;
        this.Quantitat = quantiat;
    }
    calcularTotal() {
        this.Total = this.Preu * this.Quantitat;
    }
    AumentarQuantitat() {
        this.Quantitat++;
    }
    RestarQuantitat() {
        this.Quantitat--;
    }
}