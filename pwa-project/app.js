let currentCorrectAnswer = 0;

let currentDeck = "General Study";

/* LOAD TOPICS */

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
        localStorage.getItem(subject.title)
        === "completed";

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

      /* CLICK CARD */

      card.addEventListener("click", () => {

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
          "studyTip"
        ).innerHTML =
        getStudyTip(subject.title);

        document.getElementById(
          "studySummary"
        ).innerHTML =
        generateSummary(subject.title);

        document.getElementById(
          "difficultyBadge"
        ).innerHTML =
        getDifficulty(subject.title);

        document.getElementById(
          "topicDetails"
        ).classList.remove("d-none");

        /* RESOURCE LINKS */

        document.getElementById(
          "youtubeLink"
        ).href =
        `https://www.youtube.com/results?search_query=${subject.title}+computer+science`;

        document.getElementById(
          "googleLink"
        ).href =
        `https://www.google.com/search?q=${subject.title}+computer+science`;

        document.getElementById(
          "wikiLink"
        ).href =
        `https://en.wikipedia.org/wiki/${subject.title}`;

        /* QUIZ */

        loadQuiz(subject.title);

      });

      container.appendChild(card);

    });

    updateCompletedTopics();

    loadSavedNotes();

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

/* COMPLETE TOPICS */

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

/* UPDATE PROGRESS */

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

/* STUDY TIPS */

function getStudyTip(topic) {

  if(topic.includes("Algorithms")) {

    return `
      Practice tracing algorithms
      step-by-step using diagrams.
    `;

  }

  if(topic.includes("Operating")) {

    return `
      Focus on process scheduling
      and memory management.
    `;

  }

  if(topic.includes("Networks")) {

    return `
      Understand how packets move
      through routers and protocols.
    `;

  }

  if(topic.includes("Cyber")) {

    return `
      Focus on encryption,
      authentication,
      and attack prevention.
    `;

  }

  return `
    Review notes consistently
    and practice active recall.
  `;

}

/* AI SUMMARIES */

function generateSummary(topic) {

  if(topic.includes("Algorithms")) {

    return `
      Algorithms solve problems
      using logical step-by-step
      procedures. Focus on sorting,
      searching, recursion,
      and optimization.
    `;

  }

  if(topic.includes("Operating")) {

    return `
      Operating systems manage
      memory, scheduling,
      processes, and hardware
      resources.
    `;

  }

  if(topic.includes("Networks")) {

    return `
      Computer networks allow
      devices to communicate
      through routing,
      DNS, and protocols.
    `;

  }

  if(topic.includes("Cyber")) {

    return `
      Cybersecurity protects systems
      and data using encryption,
      authentication,
      and threat prevention.
    `;

  }

  return `
    Review the major concepts
    and practice active recall.
  `;

}

/* DIFFICULTY */

function getDifficulty(topic) {

  if(topic.includes("Algorithms")) {

    return "Advanced";

  }

  if(topic.includes("Operating")) {

    return "Intermediate";

  }

  if(topic.includes("Networks")) {

    return "Intermediate";

  }

  return "Beginner";

}

/* QUIZZES */

function loadQuiz(topic) {

  document.getElementById(
    "quizPanel"
  ).classList.remove("d-none");

  let question = "";

  let choices = [];

  let correct = 0;

  if(topic.includes("Algorithms")) {

    question =
      "What is the primary goal of an algorithm?";

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
      "Only graphics",
      "Hardware and software resources",
      "Only internet access"
    ];

    correct = 1;

  }

  else if(topic.includes("Networks")) {

    question =
      "What do computer networks allow?";

    choices = [
      "Cooling systems",
      "Communication between devices",
      "Battery optimization"
    ];

    correct = 1;

  }

  else {

    question =
      "What is cybersecurity mainly focused on?";

    choices = [
      "Protecting systems and data",
      "Increasing RAM",
      "Improving graphics"
    ];

    correct = 0;

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

/* CHECK ANSWERS */

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
      "Incorrect. Review the topic and try again.";

    result.style.color =
      "#f87171";

  }

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

/* DECKS */

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

/* RESOURCE SEARCH */

function searchResources() {

  const query =
    document.getElementById(
      "resourceSearch"
    ).value;

  if(query.trim() !== "") {

    window.open(

      `https://www.google.com/search?q=${query}+computer+science+tutorial`,

      "_blank"

    );

  }

}

/* RESET */

function resetProgress() {

  localStorage.clear();

  location.reload();

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