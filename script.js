const text = "NEET TRACKER 2027";

const title = document.getElementById("title");

let i = 0;

function typeWriter(){

    if(i < text.length){

        title.textContent += text.charAt(i);

        i++;

        setTimeout(typeWriter,80);

    }

}

const EXAM_DATE = new Date("May 2, 2027");

const today = new Date();

const difference = EXAM_DATE - today;

const daysLeft = Math.ceil(
    difference / (1000 * 60 * 60 * 24)
);

document.getElementById("daysLeft").textContent =
daysLeft + " DAYS LEFT";

typeWriter();

const monthTitle = document.getElementById("monthTitle");

const dates = document.getElementById("dates");

let currentDate = new Date();

const completedDays =
JSON.parse(localStorage.getItem("completedDays")) || {};


const months = [

"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"

];




function renderCalendar(){

    dates.innerHTML="";

    const year=currentDate.getFullYear();

    const month=currentDate.getMonth();

    monthTitle.textContent =
    months[month] + " " + year;

    const firstDay =
    new Date(year,month,1).getDay();

    const lastDate =
    new Date(year,month+1,0).getDate();

    for(let i=0;i<firstDay;i++){

        const empty=document.createElement("div");

        dates.appendChild(empty);

    }

       for(let day=1;day<=lastDate;day++){

    const box=document.createElement("div");

    box.textContent=day;

    const today = new Date();

today.setHours(0,0,0,0);

const currentBoxDate = new Date(year, month, day);

if(currentBoxDate > today){

    box.classList.add("future-day");

}

    const key =
    year + "-" + month + "-" + day;

    if(completedDays[key]){

        box.classList.add("completed-day");

    }

    box.addEventListener("click",function(){

    const clickedDate = new Date(year, month, day);

    const today = new Date();

    today.setHours(0,0,0,0);

    if(clickedDate > today){

        return;

    }

    box.classList.toggle("completed-day");

    if(box.classList.contains("completed-day")){

        completedDays[key]=true;

    }

    else{

        delete completedDays[key];

    }

    localStorage.setItem(
        "completedDays",
        JSON.stringify(completedDays)
    );

});



    dates.appendChild(box);

}

}


renderCalendar();

document.getElementById("nextMonth").onclick=function(){

    currentDate.setMonth(
        currentDate.getMonth()+1
    );

    renderCalendar();

};

document.getElementById("prevMonth").onclick=function(){

    currentDate.setMonth(
        currentDate.getMonth()-1
    );

    renderCalendar();

};


const newNoteBtn = document.getElementById("newNoteBtn");

const noteEditor = document.getElementById("noteEditor");

const noteDate = document.getElementById("noteDate");

newNoteBtn.addEventListener("click", function(){

    noteEditor.style.display = "block";

    const today = new Date();

    noteDate.value = today.toDateString();

});












let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingNoteIndex = null;

const saveNote = document.getElementById("saveNote");

const noteTitle = document.getElementById("noteTitle");

const noteContent = document.getElementById("noteContent");

const notesList = document.getElementById("notesList");


saveNote.addEventListener("click", function(){

    const note = {

        date: noteDate.value,

        title: noteTitle.value,

        content: noteContent.value

    };


    if(editingNoteIndex !== null){

    notes[editingNoteIndex] = note;

    editingNoteIndex = null;

}

else{

    notes.unshift(note);

}   


    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );


    displayNotes();


    noteTitle.value="";

    noteContent.value="";

    noteEditor.style.display="none";


});


function displayNotes(){

    notesList.innerHTML="";


    if(notes.length===0){

        notesList.innerHTML=
        "No journal entries yet.";

        return;

    }


    notes.forEach(function(note){

        const card=document.createElement("div");


        card.className="note-card";


        card.innerHTML=

        `
        <h3>${note.date}</h3>

        <h4>${note.title}</h4>

        <p>${note.content.substring(0,150)}...</p>

        `;


        notesList.appendChild(card);


    card.addEventListener("click", function(){

    openNote(note);

    });


    });

}


displayNotes();


function openNote(note){

    noteEditor.style.display = "block";

    noteDate.value = new Date(note.date)
    .toISOString()
    .split("T")[0];

    noteTitle.value = note.title;

    noteContent.value = note.content;

    editingNoteIndex = notes.indexOf(note);

}