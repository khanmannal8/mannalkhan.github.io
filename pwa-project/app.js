const subjects = [];

fetch("topics.json")
  .then(response => response.json())
  .then(data => {

    const container =
      document.getElementById("topicsContainer");

    data.subjects.forEach(subject => {

      subjects.push(subject);

      const card =
        document.createElement("div");

      card.className =
        "col-md-6 col-lg-4 mb-4";

      const isCompleted =
        localStorage.getItem(subject.title) === "completed";

      const buttonText =
        isCompleted
        ? "Completed ✓"
        : "Mark Complete";

      const buttonClass =
        isCompleted
        ? "btn-secondary"
        : "btn-success";

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
              class="btn mt-3 complete-btn ${buttonClass}">

              ${buttonText}

            </button>

          </div>

        </div>

      `;

      container.appendChild(card);

    });

    updateCompletedTopics();

    loadSavedNotes();

  });

/* SEARCH */

document.addEventListener("input", function(e) {

  if(e.target.id === "searchInput") {

    const cards =
      document.querySelectorAll(".card");

    cards.forEach(card => {

      const title =
        card.innerText.toLowerCase();

      if(
        title.includes(
          e.target.value.toLowerCase()
        )
      ) {

        card.parentElement.style.display =
          "block";

      } else {

        card.parentElement.style.display =
          "none";

      }

    });

  }

});

/* CARD INTERACTION */

document.addEventListener("click", function(e) {

  /* CURRENT TOPIC */

  if(e.target.closest(".card")) {

    const topic =
      e.target.closest(".card")
        .querySelector("h5").innerText;

    document.getElementById("currentTopic")
      .innerHTML =
      `Currently Studying: ${topic}`;

  }

  /* COMPLETE BUTTON */

  if(e.target.classList.contains("complete-btn")) {

    const topic =
      e.target.parentElement
        .querySelector("h5").innerText;

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

    updateCompletedTopics();

  }

});

/* PROGRESS */

function updateCompletedTopics() {

  const buttons =
    document.querySelectorAll(".complete-btn");

  let count = 0;

  buttons.forEach(button => {

    if(
      button.innerHTML.includes("Completed")
    ) {

      count++;

    }

  });

  document.getElementById("progressText")
    .innerHTML =
    `Completed Topics: ${count}`;

}

/* TIMER */

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

/* NOTES */

function saveNotes() {

  const notes =
    document.getElementById("studyNotes").value;

  localStorage.setItem(
    "studyNotes",
    notes
  );

  alert("Notes Saved!");

}

function loadSavedNotes() {

  const savedNotes =
    localStorage.getItem("studyNotes");

  if(savedNotes) {

    document.getElementById("studyNotes").value =
      savedNotes;

  }

}

/* SERVICE WORKER */

if ("serviceWorker" in navigator) {

  navigator.serviceWorker
    .register("./service-worker.js")

    .then(() =>
      console.log("Service Worker Registered")
    );

}