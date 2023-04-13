const cartTotalAmountElement = document.querySelector(".cart-total-price");
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");
const cartItemQuantityElements = document.querySelectorAll(
  ".cart-item-quantity-action"
);
const cartItemRemoveButtonElements = document.querySelectorAll(
  ".cart-item-buttons button"
);
const mainSectionElement = document.querySelector("#cart-items-section");
const copyButton = document.querySelector(".btn-copy");


const loadingElement = `<span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="31px" height="31px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
<g transform="rotate(0 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(30 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(60 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(90 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(120 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(150 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(180 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(210 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(240 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(270 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(300 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"/>
  </rect>
</g><g transform="rotate(330 50 50)">
  <rect x="47" y="24" rx="3" ry="3.84" width="6" height="12" fill="#ffffff">
    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"/>
  </rect>
</g></svg></span>`;

function checkAndUpdateCartSection(totalQuantity) {
  if (totalQuantity === 0) {
    mainSectionElement.id = "cart-empty-section";
    mainSectionElement.innerHTML = `<p>Your cart is empty.</p>
    <a class="btn" href="/products">Shop Now</a>`;
  }
  return;
}

async function sendUpdateCartRequest(productId, newQuantity, csrfToken) {
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity: newQuantity,
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

  return await response.json();
}

async function updateCartItem(event) {
  if (event.target.tagName !== "BUTTON") return;
  const buttonElement = event.target;
  const buttonAction = buttonElement.dataset.action;
  const parentElement = buttonElement.parentElement;
  const productId = parentElement.dataset.productId;
  const csrfToken = parentElement.dataset.csrfToken;

  const cartItemTotalPriceElement =
    parentElement.parentElement.querySelector(".cart-item-price");
  const cartQuantityInputElement =
    buttonElement.parentElement.querySelector("input");

  const quantityChange = buttonAction === "increase" ? 1 : -1;
  const newQuantity = cartQuantityInputElement.valueAsNumber + quantityChange;

  if (newQuantity > cartQuantityInputElement.max) {
    cartQuantityInputElement.value = cartQuantityInputElement.max;
    return;
  }

  // show loading
  buttonElement.innerHTML = loadingElement;

  const responseData = await sendUpdateCartRequest(
    productId,
    newQuantity,
    csrfToken
  );

  checkAndUpdateCartSection(responseData.updatedCartData.newTotalQuantity);

  // update global totals
  cartTotalAmountElement.textContent =
    responseData.updatedCartData.newTotalAmount;

  cartBadgeElements.forEach((cartBadgeElement) => {
    cartBadgeElement.textContent =
      responseData.updatedCartData.newTotalQuantity;
  });

  if (responseData.updatedCartData.newItemPrice === "remove") {
    // remove cart item
    parentElement.parentElement.parentElement.remove();
    return;
  }

  // update cart item
  buttonElement.textContent = buttonAction === "increase" ? "+" : "-";
  cartQuantityInputElement.value = newQuantity;
  cartItemTotalPriceElement.textContent =
    responseData.updatedCartData.newItemPrice;
}

async function removeCartItem(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productId;
  const csrfToken = buttonElement.dataset.csrfToken;

  const responseData = await sendUpdateCartRequest(productId, 0, csrfToken);

  checkAndUpdateCartSection(responseData.updatedCartData.newTotalQuantity);

  // update global totals
  cartTotalAmountElement.textContent =
    responseData.updatedCartData.newTotalAmount;
    
  cartBadgeElements.forEach((cartBadgeElement) => {
    cartBadgeElement.textContent =
      responseData.updatedCartData.newTotalQuantity;
  });

  if (responseData.updatedCartData.newItemPrice === "remove") {
    // remove cart item
    buttonElement.parentElement.parentElement.remove();
    return;
  }
}

const copyCardNumber = () => {
  var copyText = document.getElementById("card-number");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  
  var tooltip = document.getElementById("copy-tooltip");
  tooltip.innerHTML = "Copied";
}

const mouseOut = () => {
  var tooltip = document.getElementById("copy-tooltip");
  tooltip.innerHTML = "Copy to clipboard";
}

copyButton.addEventListener('click', copyCardNumber);
copyButton.addEventListener('mouseout', mouseOut)

for (const quantityElement of cartItemQuantityElements) {
  quantityElement.addEventListener("click", updateCartItem);
}

for (const removeButton of cartItemRemoveButtonElements) {
  removeButton.addEventListener("click", removeCartItem);
}
