document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".needs-validation"); // Pobranie formularza recenzji
  const flashMessage = document.createElement("div"); // Stworzenie elementu flash message
  flashMessage.style.display = "none"; // Domyślnie ukryj wiadomość flash
  flashMessage.style.color = "red";
  flashMessage.style.marginTop = "10px";
  form.insertBefore(flashMessage, form.firstChild); // Wstaw wiadomość flash przed formularzem

  form.addEventListener("submit", function (event) {
    // Sprawdź, czy któryś z przycisków radiowych (gwiazdek) jest zaznaczony (pomijając 'no-rate')
    const ratingSelected = document.querySelector(
      'input[name="review[rating]"]:checked'
    );

    if (!ratingSelected) {
      // Jeśli nie ma zaznaczonego ratingu, zapobiegaj wysłaniu formularza
      event.preventDefault();

      // Wyświetl wiadomość flash
      flashMessage.textContent =
        "Please select a rating before submitting your review.";
      flashMessage.style.display = "block";
    } else {
      // Ukryj wiadomość flash, jeśli wszystko jest w porządku
      flashMessage.style.display = "none";
    }
  });
});
