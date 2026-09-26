class Products {
  constructor(parent, products, cart) {
    this.parent = parent;
    this.products = products;
    this.cart = cart;
  }

  showProducts() {
    this.products.forEach((product) => this.createCard(product));
  }

  createCard(data) {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img class="product-image" src="${data.image}" alt="${data.alt}">
      
      <div class="product-info">
        <h3 class="product-name">${data.name}</h3>
      </div>

      <div class="product-control">
        <span class="product-price">${"$"+data.price}</span>
        <button class="add-btn">+</button>
      </div>
    `;

    const button = card.querySelector(".add-btn");

    button.addEventListener("click", () => {
      this.addToCart(data);
    });

    this.parent.appendChild(card);
  }

  addToCart(product) {
    this.cart.products.push(product);
    this.cart.showProducts();
  }
}

export default Products;
