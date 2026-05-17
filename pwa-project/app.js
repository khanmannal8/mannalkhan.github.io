let currentCorrectAnswer = 0;

let currentDeck = "General Study";

let currentSearch = "";

/* LOAD TOPICS */

fetch("topics.json")

  .then(response => response.json())

  .then(data => {

    const container =
      document.getElementById(
        "topicsContainer"
      );

    data.subjects.forEach(subject => {

      const card =
        document.createElement("div");

      card.className =
        "col-md-6 col-lg-4 mb-4";

      const isCompleted =
        localStorage.getItem(
          subject.title
        ) === "completed";

      card.innerHTML = `

        <div class="card h-100 topic-card">

          <img
            src="${subject.image}"
            class="card-img-top"
          >

          <div class="card-body">

            <h5>

              ${subject.title}

            </h5>

            <p>

              ${subject.description}

            </p>

            <audio controls class="w-100">

              <source
                src="${subject.audio}"
                type="audio/mpeg"
              >

            </audio>

            <button
              class="btn mt-3 complete-btn
              ${isCompleted
                ? "btn-secondary"
                : "btn-success"}">

              ${isCompleted
                ? "Completed ✓"
                : "Mark Complete"}

            </button>

          </div>

        </div>

      `;

      card.addEventListener(
        "click",
        () => {

          document.getElementById(
            "currentTopic"
          ).innerHTML =
          `Currently Studying: ${subject.title}`;

          document.getElementById(
            "detailTitle"
          ).innerHTML =
          subject.title;

          document.getElementById(
            "detailDescription"
          ).innerHTML =
          subject.description;

          document.getElementById(
            "studySummary"
          ).innerHTML =
          generateSummary(subject.title);

          document.getElementById(
            "studyTip"
          ).innerHTML =
          getStudyTip(subject.title);

          document.getElementById(
            "topicDetails"
          ).classList.remove(
            "d-none"
          );

          loadQuiz(subject.title);

        }
      );

      container.appendChild(card);

    });

    updateCompletedTopics();

    loadSavedNotes();

    loadGoal();

  })

  .catch(error => {

    console.error(
      "Topics failed to load:",
      error
    );

  });

/* SEARCH TOPICS */

document.addEventListener(
  "input",
  function(e) {

    if(e.target.id === "searchInput") {

      const cards =
        document.querySelectorAll(
          ".topic-card"
        );

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

        }

        else {

          card.parentElement.style.display =
            "none";

        }

      });

    }

  }
);

/* COMPLETE */

document.addEventListener(
  "click",
  function(e) {

    if(
      e.target.classList.contains(
        "complete-btn"
      )
    ) {

      e.stopPropagation();

      const topic =
        e.target.parentElement
          .querySelector("h5")
          .innerText;

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

  }
);

/* PROGRESS */

function updateCompletedTopics() {

  const buttons =
    document.querySelectorAll(
      ".complete-btn"
    );

  let count = 0;

  buttons.forEach(button => {

    if(
      button.innerHTML.includes(
        "Completed"
      )
    ) {

      count++;

    }

  });

  document.getElementById(
    "progressText"
  ).innerHTML =
  `Completed Topics: ${count}`;

}

/* GOALS */

function saveGoal() {

  const goal =
    document.getElementById(
      "goalInput"
    ).value;

  localStorage.setItem(
    "dailyGoal",
    goal
  );

  document.getElementById(
    "goalText"
  ).innerHTML =
  `Daily Goal: ${goal} Topics`;

}

function loadGoal() {

  const savedGoal =
    localStorage.getItem(
      "dailyGoal"
    );

  if(savedGoal) {

    document.getElementById(
      "goalText"
    ).innerHTML =
    `Daily Goal: ${savedGoal} Topics`;

  }

}

/* RESOURCE SEARCH */

function searchResources() {

  currentSearch =
    document.getElementById(
      "resourceSearch"
    ).value;

  if(currentSearch.trim() !== "") {

    document.getElementById(
      "resourcePanel"
    ).classList.remove(
      "d-none"
    );

  }

}

function showGoogle() {

  window.open(

    `https://www.google.com/search?q=${currentSearch}`,

    "_blank"

  );

}

function showYouTube() {

  window.open(

    `https://www.youtube.com/results?search_query=${currentSearch}`,

    "_blank"

  );

}

function showWikipedia() {

  window.open(

    `https://en.wikipedia.org/wiki/${currentSearch}`,

    "_blank"

  );

}

function closeResources() {

  document.getElementById(
    "resourcePanel"
  ).classList.add(
    "d-none"
  );

}

/* NOTES */

document.addEventListener(
  "input",
  function(e) {

    if(e.target.id === "studyNotes") {

      localStorage.setItem(

        `notes-${currentDeck}`,

        e.target.value

      );

    }

  }
);

function loadSavedNotes() {

  const savedNotes =
    localStorage.getItem(
      `notes-${currentDeck}`
    );

  if(savedNotes) {

    document.getElementById(
      "studyNotes"
    ).value =
    savedNotes;

  }

}

function openDeck(deckName) {

  currentDeck = deckName;

  document.getElementById(
    "notesDeckTitle"
  ).innerHTML =
  `Notes For: ${deckName}`;

  const savedDeckNotes =
    localStorage.getItem(
      `notes-${deckName}`
    );

  document.getElementById(
    "studyNotes"
  ).value =
  savedDeckNotes || "";

}

/* QUIZ */

function loadQuiz(topic) {

  document.getElementById(
    "quizPanel"
  ).classList.remove(
    "d-none"
  );

  let question = "";

  let choices = [];

  let correct = 0;

  if(topic.includes("Algorithms")) {

    question =
      "What is the main goal of an algorithm?";

    choices = [
      "Solve problems step-by-step",
      "Increase storage",
      "Create graphics"
    ];

    correct = 0;

  }

  else if(topic.includes("Operating")) {

    question =
      "What does an operating system manage?";

    choices = [
      "Only internet access",
      "Hardware and software resources",
      "Only graphics"
    ];

    correct = 1;

  }

  else {

    question =
      "What is cybersecurity focused on?";

    choices = [
      "Increasing RAM",
      "Protecting systems and data",
      "Improving graphics"
    ];

    correct = 1;

  }

  currentCorrectAnswer = correct;

  document.getElementById(
    "quizQuestion"
  ).innerHTML = question;

  document.getElementById(
    "choice0"
  ).innerHTML = choices[0];

  document.getElementById(
    "choice1"
  ).innerHTML = choices[1];

  document.getElementById(
    "choice2"
  ).innerHTML = choices[2];

  document.getElementById(
    "quizResult"
  ).innerHTML = "";

}

function checkAnswer(choice) {

  const result =
    document.getElementById(
      "quizResult"
    );

  if(choice === currentCorrectAnswer) {

    result.innerHTML =
      "Correct! Great job.";

    result.style.color =
      "#4ade80";

  }

  else {

    result.innerHTML =
      "Incorrect. Try again.";

    result.style.color =
      "#f87171";

  }

}

/* STUDY TIPS */

function getStudyTip(topic) {

  return `
    Review notes consistently
    and practice active recall.
  `;

}

/* SUMMARIES */

function generateSummary(topic) {

  return `
    Review the major concepts
    and reinforce understanding
    through quizzes and practice.
  `;

}

/* TIMER */

function startTimer() {

  let time = 1500;

  const timerDisplay =
    document.getElementById(
      "timer"
    );

  const countdown =
    setInterval(() => {

      let minutes =
        Math.floor(time / 60);

      let seconds =
        time % 60;

      timerDisplay.innerHTML =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

      time--;

      if(time < 0) {

        clearInterval(
          countdown
        );

        timerDisplay.innerHTML =
          "Study Session Complete!";

      }

    }, 1000);

}

/* RESET */

function resetProgress() {

  localStorage.clear();

  location.reload();

}

/* MODALS */

function openDeckModal(deckName) {

  openDeck(deckName);

  const modal =
    new bootstrap.Modal(

      document.getElementById(
        "deckModal"
      )

    );

  document.getElementById(
    "deckModalTitle"
  ).innerHTML = deckName;

  let description = "";

  let topics = [];

  if(deckName === "Algorithms") {

    description =
      "Master recursion, sorting, and optimization.";

    topics = [
      "Binary Search",
      "Sorting",
      "Recursion",
      "Complexity"
    ];

  }

  else if(
    deckName ===
    "Operating Systems"
  ) {

    description =
      "Learn process scheduling and memory management.";

    topics = [
      "Threads",
      "Processes",
      "Scheduling",
      "Memory"
    ];

  }

  else {

    description =
      "Explore cybersecurity concepts and protection systems.";

    topics = [
      "Encryption",
      "Authentication",
      "Threat Detection"
    ];

  }

  document.getElementById(
    "deckModalDescription"
  ).innerHTML = description;

  const list =
    document.getElementById(
      "deckTopics"
    );

  list.innerHTML = "";

  topics.forEach(topic => {

    const li =
      document.createElement("li");

    li.innerHTML = topic;

    list.appendChild(li);

  });

  modal.show();

}

/* SERVICE WORKER */

if("serviceWorker" in navigator) {

  navigator.serviceWorker

    .register("./service-worker.js")

    .then(() =>

      console.log(
        "Service Worker Registered"
      )

    );

}
