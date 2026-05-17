fetch("topics.json")
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("topicsContainer");

    data.subjects.forEach(subject => {

      const card = document.createElement("div");

      card.className = "col-md-6 col-lg-4 mb-4";

      card.innerHTML = `
        <div class="card h-100">

          <img src="${subject.image}" class="card-img-top">

          <div class="card-body">

            <h5>${subject.title}</h5>

            <p>${subject.description}</p>

            <audio controls class="w-100">
              <source src="${subject.audio}" type="audio/mpeg">
            </audio>

          </div>

        </div>
      `;

      container.appendChild(card);

    });

  });

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", e => {

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    const title = card.innerText.toLowerCase();

    if(title.includes(e.target.value.toLowerCase())) {
      card.parentElement.style.display = "block";
    } else {
      card.parentElement.style.display = "none";
    }

  });

});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("Service Worker Registered"));
}