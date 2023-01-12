const orderUpdateFormElement = document.getElementById("order-update-form");
const statusBadgeElement = document.querySelector('.order-info-actions .badge');

async function updateOrder(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const csrfToken = formData.get("csrf-token");
  const orderId = formData.get("order-id");
  const status = formData.get("status");

  let response;
  try {
    response = await fetch("/admin/orders/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _csrf: csrfToken,
        orderId,
        status,
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

  let responseData;
  try {
    responseData = await response.json();
  } catch (error) {
    alert("Something went wrong");
    return;
  }

  console.log(responseData);

  statusBadgeElement.textContent = responseData.orderData.newStatus;
  
}

orderUpdateFormElement.addEventListener("submit", updateOrder);
