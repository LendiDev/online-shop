const cartItemUpdateFormElements =
  document.querySelectorAll(".cart-item-actions");
const cartTotalAmountElement = document.querySelector(".cart-total-price");
const cartBadgeElement = document.querySelector(".nav-items .badge");

async function updateCartItem(event) {
  event.preventDefault();
  const form = event.target;

  const formData = new FormData(form);
  const productId = form.dataset.productId;
  const csrfToken = form.dataset.csrfToken;
  const quantity = formData.get("quantity");

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity,
        _csrf: csrfToken,
      }),
    });
  } catch (error) {
    alert("Something went wrong");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong");
    return;
  }

  const responseData = await response.json();

  const cartItemTotalPriceElement =
    form.parentElement.querySelector(".cart-item-price");
  cartItemTotalPriceElement.textContent =
    responseData.updatedCartData.newItemPrice;

  cartTotalAmountElement.textContent =
    responseData.updatedCartData.newTotalAmount;
  cartBadgeElement.textContent = responseData.updatedCartData.newTotalQuantity;
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
