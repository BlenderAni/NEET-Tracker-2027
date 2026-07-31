// ===============================
// STUDY DATA
// ===============================

function getSessions(){

    return JSON.parse(

        localStorage.getItem("studySessions")

    ) || [];

}



function saveSessions(studySessions){

    localStorage.setItem(

        "studySessions",

        JSON.stringify(studySessions)

    );

}


function addSession(session){

    let sessions = getSessions();

    sessions.push(session);

    saveSessions(sessions);

}


function deleteSession(id){

    let sessions = getSessions();

    sessions = sessions.filter(function(session){

        return session.id !== id;

    });

    saveSessions(sessions);

}


function updateSession(updatedSession){

    let sessions = getSessions();

    sessions = sessions.map(function(session){

        if(session.id===updatedSession.id){

            return updatedSession;

        }

        return session;

    });

    saveSessions(sessions);

}


function getLatestSessions(count=5){

    return getSessions()

    .slice()

    .reverse()

    .slice(0,count);

}


function getTotalSeconds(){

    let total = 0;

    getSessions().forEach(function(session){

        total += session.seconds;

    });

    return total;

}


function getStudyHours(date){

    let total = 0;

    getSessions().forEach(function(session){

        if(session.date===date){

            total += session.seconds;

        }

    });

    return total/3600;

}


function getFormattedTotalStudyTime(){

    let totalSeconds = getTotalSeconds();

    let days = Math.floor(totalSeconds / 86400);

    let hours = Math.floor((totalSeconds % 86400) / 3600);

    let minutes = Math.floor((totalSeconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;

}

// ===============================
// WEEKLY STUDY HOURS
// ===============================

function getWeeklyStudyHours(){

    let sessions = getSessions();

    let today = new Date();

    let day = today.getDay();

    let difference = day === 0 ? 6 : day - 1;

    let monday = new Date(today);

    monday.setDate(today.getDate() - difference);

    monday.setHours(0,0,0,0);

    let totalSeconds = 0;

    sessions.forEach(function(session){

        let sessionDate = new Date(session.date);

        sessionDate.setHours(0,0,0,0);

        if(sessionDate >= monday){

            totalSeconds += session.seconds;

        }

    });

    return totalSeconds / 3600;

}



// ===============================
// MONTHLY STUDY HOURS
// ===============================

function getMonthlyStudyHours(){

    let sessions = getSessions();

    let today = new Date();

    let currentMonth = today.getMonth();

    let currentYear = today.getFullYear();

    let totalSeconds = 0;

    sessions.forEach(function(session){

        let sessionDate = new Date(session.date);

        if(

            sessionDate.getMonth() === currentMonth &&

            sessionDate.getFullYear() === currentYear

        ){

            totalSeconds += session.seconds;

        }

    });

    return totalSeconds / 3600;

}

// ===============================
// CURRENT STUDY STREAK
// ===============================

function getCurrentStreak(){

    let sessions = getSessions();

    if(sessions.length===0){

        return 0;

    }

    // Store unique study dates

    let studyDates = new Set();

    sessions.forEach(function(session){

        studyDates.add(session.date);

    });

    let streak = 0;

    let current = new Date();

    current.setHours(0,0,0,0);

    while(true){

        let key =

            current.getFullYear()

            + "-"

            + String(current.getMonth()+1).padStart(2,"0")

            + "-"

            + String(current.getDate()).padStart(2,"0");

        if(studyDates.has(key)){

            streak++;

            current.setDate(current.getDate()-1);

        }

        else{

            break;

        }

    }

    return streak;

}

getCurrentStreak()