const loginKey = "sims_logged_in";
const productsKey = "sims_products";

const user = JSON.parse(localStorage.getItem(loginKey));

if (!user) window.location.href = "login.html";

document.getElementById("loggedInUser").textContent = user.name;
document.getElementById("settingName").textContent = user.name;
document.getElementById("settingEmail").textContent = user.email;

document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem(loginKey);
    window.location.href = "login.html";
};

/* NAVIGATION */
const navItems = document.querySelectorAll(".sidebar li");
const pages = document.querySelectorAll(".page");

navItems.forEach(item => {
    item.onclick = () => {
        navItems.forEach(li => li.classList.remove("active"));
        item.classList.add("active");

        pages.forEach(page => page.classList.add("hidden"));

        const pageId = item.dataset.page + "Page";
        document.getElementById(pageId).classList.remove("hidden");
    };
});

/* LOAD PRODUCTS */
function loadProducts() {
    const products = JSON.parse(localStorage.getItem(productsKey)) || [];
    const tableBody = document.getElementById("productTableBody");
    tableBody.innerHTML = "";

    let inStockCount = 0;

    products.forEach((product, index) => {
        const status = product.quantity > 0 ? "In Stock" : "Out of Stock";
        if (product.quantity > 0) inStockCount++;

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

    document.getElementById("totalProducts").textContent = products.length;
    document.getElementById("inStock").textContent = inStockCount;
    document.getElementById("outStock").textContent = products.length - inStockCount;

    document.getElementById("reportTotal").textContent = products.length;
    document.getElementById("reportStock").textContent = inStockCount;
    document.getElementById("reportOut").textContent = products.length - inStockCount;
}

loadProducts();

/* MODAL */
const modal = document.getElementById("productModal");
document.getElementById("addProductBtn").onclick = () => modal.classList.remove("hidden");
document.getElementById("closeModal").onclick = () => modal.classList.add("hidden");

/* ADD PRODUCT */
document.getElementById("productForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value.trim();
    const quantity = parseInt(document.getElementById("productQuantity").value);
    const price = parseFloat(document.getElementById("productPrice").value);

    if (!name || !category || isNaN(quantity) || isNaN(price)) {
        alert("All fields required");
        return;
    }

    let products = JSON.parse(localStorage.getItem(productsKey)) || [];

    products.push({ name, category, quantity, price });

    localStorage.setItem(productsKey, JSON.stringify(products));

    modal.classList.add("hidden");
    this.reset();

    loadProducts();
});
