const loginKey = "sims_logged_in";
const productsKey = "sims_products";

const user = JSON.parse(localStorage.getItem(loginKey));

if (!user) {
    window.location.href = "login.html";
}

document.getElementById("loggedInUser").textContent = user.name;

document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem(loginKey);
    window.location.href = "login.html";
};

/* LOAD PRODUCTS */
function loadProducts() {
    const products = JSON.parse(localStorage.getItem(productsKey)) || [];
    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";

    let inStock = 0;

    products.forEach((product, index) => {
        const status = product.quantity > 0 ? "In Stock" : "Out of Stock";
        if (product.quantity > 0) inStock++;

        tableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.quantity}</td>
                <td>$${product.price}</td>
                <td>${status}</td>
            </tr>
        `;
    });

    totalProducts.textContent = products.length;
    inStock.textContent = inStock;
    outStock.textContent = products.length - inStock;
}

loadProducts();

/* ADD PRODUCT */
addProductBtn.onclick = () => productModal.classList.remove("hidden");
closeModal.onclick = () => productModal.classList.add("hidden");

productForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = productName.value.trim();
    const category = productCategory.value.trim();
    const quantity = parseInt(productQuantity.value);
    const price = parseFloat(productPrice.value);
    const message = document.getElementById("productMessage");

    if (!name || !category || isNaN(quantity) || isNaN(price))
        return message.textContent = "All fields required";

    if (quantity < 0)
        return message.textContent = "Quantity cannot be negative";

    let products = JSON.parse(localStorage.getItem(productsKey)) || [];
    products.push({ name, category, quantity, price });

    localStorage.setItem(productsKey, JSON.stringify(products));

    productModal.classList.add("hidden");
    productForm.reset();
    loadProducts();
});
