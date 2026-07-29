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
