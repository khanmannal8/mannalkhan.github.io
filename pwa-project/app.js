fetch("topics.json")
  .then(response => response.json())
  .then(data => {

    const container =
      document.getElementById("topicsContainer");

    let completedCount = 0;

    data.subjects.forEach(subject => {

      const card =
        document.createElement("div");

      card.className =
        "col-md-6 col-lg-4 mb-4";

      const isCompleted =
        localStorage.getItem(subject.title) === "completed";

      if (isCompleted) {
        completedCount++;
      }

      card.innerHTML = `

        <div class="card h-100">

          <img src="${subject.image}"
               class="card-img-top">

          <div class="card-body">

            <h5>${subject.title}</h5>

            <p>${subject.description}</p>

            <audio controls class="w-100">

              <source src="${subject.audio}"
                      type="audio/mpeg">

            </audio>

            <button
              class="btn mt-3 complete-btn
              ${isCompleted ? "btn-secondary" : "btn-success"}">

              ${isCompleted ? "Completed ✓" : "Mark Complete"}

            </button>

          </div>

        </div>

      `;

      container.appendChild(card);

    });

    updateProgress(completedCount);

  });

/* SEARCH FUNCTIONALITY */

const searchInput =
  document.getElementById("searchInput");

searchInput.addEventListener("input", e => {

  const cards =
    document.querySelectorAll(".card");

  cards.forEach(card => {

    const title =
      card.innerText.toLowerCase();

    if(title.includes(
      e.target.value.toLowerCase()
    )) {

      card.parentElement.style.display =
        "block";

    } else {

      card.parentElement.style.display =
        "none";

    }

  });

});

/* COMPLETE BUTTONS */

document.addEventListener("click", function(e) {

  if(e.target.classList.contains("complete-btn")) {

    const topic =
      e.target.parentElement
        .querySelector("h5").innerText;

    if(
      e.target.innerHTML === "Mark Complete"
    ) {

      localStorage.setItem(
        topic,
        "completed"
      );

      e.target.innerHTML =
        "Completed ✓";

      e.target.classList.remove(
        "btn-success"
      );

      e.target.classList.add(
        "btn-secondary"
      );

    }

    updateCompletedTopics();

  }

});

/* UPDATE PROGRESS */

function updateCompletedTopics() {

  const buttons =
    document.querySelectorAll(".complete-btn");

  let count = 0;

  buttons.forEach(button => {

    if(button.innerHTML.includes("Completed")) {
      count++;
    }

  });

  updateProgress(count);

}

function updateProgress(count) {

  document.getElementById("progressText")
    .innerHTML =
    `Completed Topics: ${count}`;

}

/* STUDY TIMER */

function startTimer() {

  let time = 1500;

  const timerDisplay =
    document.getElementById("timer");

  const countdown = setInterval(() => {

    let minutes =
      Math.floor(time / 60);

    let seconds =
      time % 60;

    timerDisplay.innerHTML =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    time--;

    if(time < 0) {

      clearInterval(countdown);

      timerDisplay.innerHTML =
        "Study Session Complete!";

    }

  }, 1000);

}

/* SERVICE WORKER */

if ("serviceWorker" in navigator) {

  navigator.serviceWorker
    .register("./service-worker.js")

    .then(() =>
      console.log("Service Worker Registered")
    );

}