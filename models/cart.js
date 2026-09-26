class Cart {
  constructor(parent, price) {
    this.parent = parent;
    this.price = price;
    this.products = [];
    this.toShow = [];

    this.parent.addEventListener("click", this);
  }

  showProducts() {
    this.toShow = [...new Map(this.products.map((p) => [p.id, p])).values()];

    this.parent.innerHTML = "";

    this.toShow.forEach((product) => {
      const qty = this.products.filter((p) => p.id === product.id).length;

      this.createCard(product, qty);
    });
    this.calculateTotalprice();
  }

  createCard(data, qty) {
    const cartEle = document.createElement("div");

    const infoEle = this.productInfo(data);
    const imgEle = this.productImg(data);
    const ctrlEle = this.producCtrl(data, qty);

    cartEle.innerHTML = imgEle;
    cartEle.innerHTML += infoEle;
    cartEle.innerHTML += ctrlEle;

    this.parent.appendChild(cartEle);
  }

  productImg(data) {
    const { image, alt } = data;

    const imgJSX = `
      <img class="cart-img" alt="${alt}" src="${image}" />
    `;

    return imgJSX;
  }

  productInfo(data) {
    const { name, price } = data;

    const infoJSX = `
      <div class="cart-info">
        <h4>${name}</h4>
        <p>$${price}</p>
      </div>
    `;

    return infoJSX;
  }

  producCtrl(data, qty) {
    const { id } = data;

    const ctrlJSX = `
      <div class="cart-ctrl">
        <div>
          <button data-id="${id}" data-action="minus">-</button>
          <span>${qty}</span>
          <button data-id="${id}" data-action="plus">+</button>
        </div>

        <button 
          class="remove-btn" 
          data-id="${id}" 
          data-action="remove"
        >
          Remove
        </button>
      </div>
    `;

    return ctrlJSX;
  }

  handleEvent(event) {
    const button = event.target.closest("button");

    if (!button) return;

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "plus") {
      const product = this.products.find((p) => p.id === id);

      if (product) {
        this.products.push(product);
      }
    }

    if (action === "minus") {
      const index = this.products.findIndex((p) => p.id === id);

      if (index !== -1) {
        this.products.splice(index, 1);
      }
    }

    if (action === "remove") {
      this.products = this.products.filter((p) => p.id !== id);
    }

    this.showProducts();
  }
  calculateTotalprice() {
    const total = this.products.reduce((acc, cur) => (acc += cur.price), 0);
    this.price.innerText ="$" +total;
  }
}

export default Cart;
