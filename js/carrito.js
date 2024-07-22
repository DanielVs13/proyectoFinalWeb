const cartContainer = document.querySelector(".cart-container");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const checkoutButton = document.querySelector(".checkout");

let cart = [];

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  filterProducts(searchTerm);
});

function filterProducts(searchTerm) {
  const productList = document.querySelectorAll(".product-card");

  productList.forEach((product) => {
    const productName = product
      .querySelector(".product-card-title")
      .textContent.toLowerCase();
    const productDescription = product
      .querySelector(".product-card-description")
      .textContent.toLowerCase();

    if (
      productName.includes(searchTerm) ||
      productDescription.includes(searchTerm)
    ) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", (e) => {
    const productCard = e.target.closest(".product-card");
    const productName = productCard.querySelector(
      ".product-card-title"
    ).textContent;
    const productPrice = parseFloat(
      productCard
        .querySelector(".product-card-price")
        .textContent.replace("$", "")
    );
    const product = {
      name: productName,
      price: productPrice,
    };

    cart.push(product);
    updateCart();
  });
});

function updateCart() {
  cartList.innerHTML = "";
  cart.forEach((product) => {
    const cartItem = document.createElement("li");
    cartItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
    cartList.appendChild(cartItem);
  });

  const total = cart.reduce((acc, product) => acc + product.price, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

checkoutButton.addEventListener("click", () => {
  alert("Pedido realizado con éxito!");
  cart = [];
  updateCart();
});
