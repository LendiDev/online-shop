const addToCartButtonElement = document.querySelector(
  "#product-details button"
);
const cartBadgeElements = document.querySelectorAll(".nav-items .badge");

const addToCart = async (event) => {
  event.preventDefault();
  const { productId, csrfToken } = addToCartButtonElement.dataset;

  let response;
  try {
    response = await fetch("/cart/items/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: productId,
        _csrf: csrfToken,
      }),
    });
  } catch (error) {
    alert("something went wrong");
  }

  if (!response.ok) {
    alert("something went wrong");
    return;
  }

  try {
    const responseData = await response.json();
    const { newTotalQuantity } = responseData;

    cartBadgeElements.forEach((cartBadgeElement) => {
      cartBadgeElement.textContent = newTotalQuantity;
    })

  } catch (error) {
    alert("something went wrong");
  }
};

addToCartButtonElement.addEventListener("click", addToCart);
