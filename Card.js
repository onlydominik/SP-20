class Card extends HTMLElement {
constructor() {
    super();
    this.innerHTML = "CZESC"
}
}


customElements.define("card-item", Card)