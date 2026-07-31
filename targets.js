const weeklyHours = document.getElementById("weeklyHours");

const weeklyProgress = document.getElementById("weeklyProgress");

const weeklyPercentage = document.getElementById("weeklyPercentage");

const weeklyPrediction = document.getElementById("weeklyPrediction");

const backButton = document.getElementById("backButton");

const weeklyAverage =
document.getElementById("weeklyAverage");

const monthlyAverage =
document.getElementById("monthlyAverage");

const weeklyProjection =
document.getElementById("weeklyProjection");

const monthlyProjection =
document.getElementById("monthlyProjection");

const monthlyHours =
document.getElementById("monthlyHours");

const monthlyProgress =
document.getElementById("monthlyProgress");

const monthlyPercentage =
document.getElementById("monthlyPercentage");

const monthlyPrediction =
document.getElementById("monthlyPrediction");

backButton.addEventListener(
  "click",

  function () {
    window.location.href = "sessions.html";
  },
);

function renderWeeklyProgress(){

    const weeklyGoal = 56;

    const hours = getWeeklyStudyHours();

    weeklyHours.textContent =
        hours.toFixed(1) + "h / 56h";

    let percent =
        (hours / weeklyGoal) * 100;

    if(percent > 100){

        percent = 100;

    }

    weeklyProgress.style.width =
        percent + "%";

    weeklyPercentage.textContent =
        percent.toFixed(0) + "%";

    if(percent < 50){

        weeklyProgress.style.background = "#e53935";

    }

    else if(percent < 90){

        weeklyProgress.style.background = "#ffb300";

    }

    else{

        weeklyProgress.style.background = "#43a047";

    }

    let remaining =
        Math.max(0, weeklyGoal - hours);

    let today = new Date();

    let day = today.getDay();

    let daysLeft = day === 0 ? 1 : 8 - day;

    let requiredPerDay =
        remaining / daysLeft;

    if(hours >= weeklyGoal){

        let extra = hours - weeklyGoal;

        weeklyPrediction.innerHTML =
            "🎉 Weekly Target Achieved!<br><br>" +
            "🏆 " +
            extra.toFixed(1) +
            "h Above Target";

    }

    else{

        weeklyPrediction.innerHTML =
            "Need <b>" +
            remaining.toFixed(1) +
            "h</b> more<br><br>" +
            "Study about <b>" +
            requiredPerDay.toFixed(1) +
            "h/day</b>";

    }

}

function renderMonthlyProgress(){

    const monthlyGoal = 240;

    const hours = getMonthlyStudyHours();

    monthlyHours.textContent =
        hours.toFixed(1) + "h / 240h";

    let percent =
        (hours / monthlyGoal) * 100;

    if(percent > 100){

        percent = 100;

    }

    monthlyProgress.style.width =
        percent + "%";

    monthlyPercentage.textContent =
        percent.toFixed(0) + "%";

    if(percent < 50){

        monthlyProgress.style.background = "#e53935";

    }

    else if(percent < 90){

        monthlyProgress.style.background = "#ffb300";

    }

    else{

        monthlyProgress.style.background = "#43a047";

    }

    let remaining =
        Math.max(0, monthlyGoal - hours);

    let today = new Date();

    let lastDay = new Date(

        today.getFullYear(),

        today.getMonth() + 1,

        0

    ).getDate();

    let daysLeft =
        lastDay - today.getDate() + 1;

    let requiredPerDay =
        remaining / daysLeft;

    if(hours >= monthlyGoal){

        let extra = hours - monthlyGoal;

        monthlyPrediction.innerHTML =
            "🎉 Monthly Target Achieved!<br><br>" +
            "🏆 " +
            extra.toFixed(1) +
            "h Above Target";

    }

    else{

        monthlyPrediction.innerHTML =
            "Need <b>" +
            remaining.toFixed(1) +
            "h</b> more<br><br>" +
            "Study about <b>" +
            requiredPerDay.toFixed(1) +
            "h/day</b>";

    }

}

function renderStatus(){

    const weeklyPercent =
        (getWeeklyStudyHours()/56)*100;

    const monthlyPercent =
        (getMonthlyStudyHours()/240)*100;

    const average =
        (weeklyPercent + monthlyPercent)/2;

    if(average>=90){

        statusTitle.innerHTML =
        "🟢 Ahead of Schedule";

        statusMessage.innerHTML =
        "Excellent consistency.<br>You are on pace to exceed your study goals.";

    }

    else if(average>=60){

        statusTitle.innerHTML =
        "🟡 On Track";

        statusMessage.innerHTML =
        "You are progressing well.<br>Stay consistent and you'll reach your targets.";

    }

    else{

        statusTitle.innerHTML =
        "🔴 Behind Schedule";

        statusMessage.innerHTML =
        "Increase your daily study time.<br>You are currently behind your target.";

    }

}

function renderCurrentPace(){

    const weeklyHours = getWeeklyStudyHours();

    const today = new Date();

    let day = today.getDay();

    if(day===0){

        day = 7;

    }

    const weeklyAvg = weeklyHours/day;

    weeklyAverage.textContent =
    weeklyAvg.toFixed(1)+" h/day";

    const projectedWeek =
    weeklyAvg*7;

    if(projectedWeek>=56){

        weeklyProjection.innerHTML =
        projectedWeek.toFixed(1)+
        " h ✅";

    }

    else{

        weeklyProjection.innerHTML =
        projectedWeek.toFixed(1)+
        " h ❌";

    }

    const monthlyHours = getMonthlyStudyHours();

    const dayOfMonth =
    today.getDate();

    const monthlyAvg =
    monthlyHours/dayOfMonth;

    monthlyAverage.textContent =
    monthlyAvg.toFixed(1)+" h/day";

    const lastDay =
    new Date(

        today.getFullYear(),

        today.getMonth()+1,

        0

    ).getDate();

    const projectedMonth =
    monthlyAvg*lastDay;

    if(projectedMonth>=240){

        monthlyProjection.innerHTML =
        projectedMonth.toFixed(1)+
        " h ✅";

    }

    else{

        monthlyProjection.innerHTML =
        projectedMonth.toFixed(1)+
        " h ❌";

    }

}

renderWeeklyProgress();

renderMonthlyProgress();

renderStatus();

renderCurrentPace();