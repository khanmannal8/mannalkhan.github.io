fetch("topics.json")
  .then(response => response.json())
  .then(data => {

    const container =
      document.getElementById("topicsContainer");

    data.subjects.forEach(subject => {

      const card =
        document.createElement("div");

      card.className =
        "col-md-6 col-lg-4 mb-4";

      const isCompleted =
        localStorage.getItem(subject.title) === "completed";

      card.innerHTML = `

        <div class="card h-100 topic-card">

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

      /* OPEN STUDY PANEL */

      card.addEventListener("click", () => {

        document.getElementById("currentTopic")
          .innerHTML =
          `Currently Studying: ${subject.title}`;

        document.getElementById("detailTitle")
          .innerHTML =
          subject.title;

        document.getElementById("detailDescription")
          .innerHTML =
          subject.description;

        document.getElementById("studyTip")
          .innerHTML =
          getStudyTip(subject.title);

        document.getElementById("topicDetails")
          .classList.remove("d-none");

      });

      container.appendChild(card);

    });

    updateCompletedTopics();

    loadSavedNotes();

  });

/* SEARCH */

document.addEventListener("input", function(e) {

  if(e.target.id === "searchInput") {

    const cards =
      document.querySelectorAll(".topic-card");

    cards.forEach(card => {

      const text =
        card.innerText.toLowerCase();

      if(
        text.includes(
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

/* COMPLETE TOPICS */

document.addEventListener("click", function(e) {

  if(e.target.classList.contains("complete-btn")) {

    e.stopPropagation();

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

/* UPDATE PROGRESS */

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

/* STUDY TIPS */

function getStudyTip(topic) {

  if(topic.includes("Algorithms")) {

    return "Practice tracing algorithms step-by-step using visual diagrams.";

  }

  if(topic.includes("Operating")) {

    return "Focus on understanding process scheduling and memory allocation.";

  }

  if(topic.includes("Networks")) {

    return "Study how packets move through routers and network protocols.";

  }

  if(topic.includes("Cyber")) {

    return "Focus on encryption, authentication, and attack prevention.";

  }

  return "Review notes consistently and practice active recall.";

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
        "Study Session Complete! Take a short break.";

    }

  }, 1000);

}

/* NOTES */

document.addEventListener("input", function(e) {

  if(e.target.id === "studyNotes") {

    localStorage.setItem(
      "studyNotes",
      e.target.value
    );

  }

});

function loadSavedNotes() {

  const savedNotes =
    localStorage.getItem("studyNotes");

  if(savedNotes) {

    document.getElementById("studyNotes").value =
      savedNotes;

  }

}

/* RESET */

function resetProgress() {

  localStorage.clear();

  location.reload();

}

/* SERVICE WORKER */

if ("serviceWorker" in navigator) {

  navigator.serviceWorker
    .register("./service-worker.js")

    .then(() =>
      console.log("Service Worker Registered")
    );

}