const deleteButtonElements = document.querySelectorAll(".product-item button");

const deleteButtonPressedHandler = async (event) => {
  const buttonElement = event.target;
  const { productId, csrfToken } = buttonElement.dataset;

  try {
    await fetch(`products/${productId}?_csrf=${csrfToken}`, {
      method: "DELETE",
    });
  } catch (error) {
    alert("Something went wrong");
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.remove();
};

for (const deleteButtonElement of deleteButtonElements) {
  deleteButtonElement.addEventListener("click", deleteButtonPressedHandler);
}
