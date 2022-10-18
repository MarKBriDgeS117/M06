window.onload = function start() {
    comprovarValorsSlide();
    mostrarValorSlides();
    apretarBoto();
}
const valors = ['numeroEstrelles', 'radiMaxim', 'DistanciaMinima'];

function comprovarValorsSlide() {
    valors.forEach((element, index) => {
        if (localStorage.getItem(element) != null) {
            document.getElementsByTagName("output")[index].value = localStorage.getItem(element);
            document.getElementById(element).setAttribute("value", localStorage.getItem(element));
        }
    });
}

function mostrarValorSlides() {
    valors.forEach(element => {
        document.getElementById(element).addEventListener("input", calcularValorSlider);
    });
}

function calcularValorSlider() {
    this.nextElementSibling.value = this.value;
}

function apretarBoto() {
    document.getElementsByName("boto")[0].addEventListener("click", canviarPantalla);
}

function canviarPantalla() {
    valors.forEach(element => {
        localStorage.setItem(element, document.getElementById(element).value);
    });
    location.href = "nit.html";
}