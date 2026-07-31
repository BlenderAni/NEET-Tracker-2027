const backButton = document.getElementById("backButton");

const editModal = document.getElementById("editModal");

const cancelEdit = document.getElementById("cancelEdit");

const editDate = document.getElementById("editDate");

const editSubject = document.getElementById("editSubject");

const editMinutes = document.getElementById("editMinutes");

const editNotes = document.getElementById("editNotes");

const saveEdit = document.getElementById("saveEdit");

const targetsButton =

document.getElementById("targetsButton");

let editingSessionId = null;

backButton.addEventListener("click", function () {
  window.location.href = "time.html";
});

targetsButton.addEventListener(

    "click",

    function(){

        window.location.href="targets.html";

    }

);

const sessionsContainer = document.getElementById("sessionsContainer");

const totalSessions = document.getElementById("totalSessions");

const summaryStudyTime = document.getElementById("summaryStudyTime");

let studySessions = JSON.parse(localStorage.getItem("studySessions")) || [];

function renderSessions() {
  sessionsContainer.innerHTML = "";

  totalSessions.textContent = studySessions.length;

  if (studySessions.length === 0) {
    sessionsContainer.innerHTML = `

            <div class="empty-session">

                No study sessions yet.

            </div>

        `;

    summaryStudyTime.textContent = "0d 0h 0m";

    return;
  }

  let totalSeconds = 0;

  studySessions
    .slice()
    .reverse()
    .forEach(function (session) {
      totalSeconds += session.Seconds || 0;

      const card = document.createElement("div");

      card.className = "session-card";

      card.innerHTML = `

<div class="card-header">

    <div class="session-date">

        📅 ${session.date}

    </div>

    <div class="session-duration">

        ${session.duration}

    </div>

</div>

<div class="session-subject">

    ${session.subject || "General Study"}

</div>

<div class="session-notes">

    ${session.notes || "No notes added."}

</div>

<div class="session-buttons">

    <button class="edit-session">

        ✏ Edit

    </button>

    <button class="delete-session">

        🗑 Delete

    </button>

</div>

`;

      sessionsContainer.appendChild(card);

      const editButton = card.querySelector(".edit-session");

      editButton.addEventListener("click", function () {
        openEditModal(session);
      });

      const deleteButton = card.querySelector(".delete-session");

      deleteButton.addEventListener("click", function () {
        deleteSession(session.id);
      });
    });

  summaryStudyTime.textContent = getFormattedTotalStudyTime();
}

function deleteSession(id) {
  const confirmed = confirm("Delete this study session?");

  if (!confirmed) {
    return;
  }

  studySessions = studySessions.filter(function (session) {
    return session.id !== id;
  });

  localStorage.setItem(
    "studySessions",

    JSON.stringify(studySessions),
  );

  renderSessions();

  window.dispatchEvent(new Event("studySessionsUpdated"));
}

function openEditModal(session) {
  editingSessionId = session.id;

  editDate.value = session.date;

  editSubject.value = session.subject;

  editMinutes.value = Math.floor(session.seconds / 60);

  editNotes.value = session.notes;

  editModal.style.display = "flex";
}

renderSessions();

cancelEdit.addEventListener("click", function () {
  editModal.style.display = "none";
});

function formatStudyDuration(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);

  let minutes = Math.floor((totalSeconds % 3600) / 60);

  if (hours === 0) {
    return minutes + "m";
  }

  return hours + "h " + minutes + "m";
}

function saveEditedSession() {
  let session = studySessions.find(function (item) {
    return item.id === editingSessionId;
  });

  if (!session) {
    return;
  }

  session.date = editDate.value;

  session.subject = editSubject.value;

  session.notes = editNotes.value;

  session.seconds = Number(editMinutes.value) * 60;

  session.duration = formatStudyDuration(session.seconds);

  localStorage.setItem(
    "studySessions",

    JSON.stringify(studySessions),
  );

  editModal.style.display = "none";

  renderSessions();
}

saveEdit.addEventListener("click", function () {
  saveEditedSession();
});
