var faithThisWeek = document.getElementById("faithThisWeek");
var jackThisWeek = document.getElementById("jackThisWeek");
var faithNextWeek = document.getElementById("faithNextWeek");
var jackNextWeek = document.getElementById("jackNextWeek");
var footerPara = document.getElementById("footerPara");

// cycleStartDate should be the day before week 1 starts (e.g. Sunday 2nd, if Monday 1st is the first day of week 1)
var cycleStartDate = new Date("2021-10-31");
var today = new Date(Date.now());

// the numbers refer to the remainder when the number of days since the seed date is divided by the length of the
// cycle (28 days). The last day in week 4 is 0 because 28/28 leaves a remainder of 0.
daysInWeek1 = [1, 2, 3, 4, 5, 6, 7];
daysInWeek2 = [8, 9, 10, 11, 12, 13, 14];
daysInWeek3 = [15, 16, 17, 18, 19, 20, 21];
daysInWeek4 = [22, 23, 24, 25, 26, 27, 0];

var startWeek1 = daysInWeek1[0];
var startWeek2 = daysInWeek2[0];
var startWeek3 = daysInWeek3[0];
var startWeek4 = daysInWeek4[0];

function getDaysSinceCycleStart (startDate) {
    // Rota is on a 4 week cycle, so (7 * 4) days in each cycle
    var daysInCycle = 7 * 4;

    // JavaScript stores date objects as milliseconds, so will need number of milliseconds in a day
    var millisecondsInADay = 1000 * 60 * 60 * 24;

    dayDiff = Math.floor((today - startDate) / millisecondsInADay);

    // Rota completes a cycle in 4 weeks. 7 * 4 = number of days in a cycle.
    // dayDiff % (7 * 4) is therefore number of complete days since current cycle started.
    daysSinceCycleStart = dayDiff % daysInCycle;

    return daysSinceCycleStart;
}

daysSinceCycleStart = getDaysSinceCycleStart(cycleStartDate);

function getWeekInCycle (daysSinceCycleStart) {

    if (daysSinceCycleStart >= startWeek1 && daysSinceCycleStart < startWeek2) {
        cycleWeek = 1;
    } else if (daysSinceCycleStart >= startWeek2 && daysSinceCycleStart < startWeek3) {
        cycleWeek = 2;
    } else if (daysSinceCycleStart >= startWeek3 && daysSinceCycleStart < startWeek4) {
        cycleWeek = 3;
    } else if (daysSinceCycleStart >= startWeek4 || daysSinceCycleStart == 0) {
        cycleWeek = 4;
    } else {
        console.log("cycleWeek could not be determined. daysSinceCycleStart: " + daysSinceCycleStart);
    }

    return cycleWeek;
}

var weekInCycle = getWeekInCycle(cycleStartDate);

function getNextWeekInCycle (week) {
    week += 1;

    if (week > 4) {
        week -= 4;
    }

    return week;
}

var nextWeekInCycle = getNextWeekInCycle(weekInCycle);

function getLastWeekInCycle (week) {
    week -= 1;

    if (week < 1) {
        week += 4;
    }

    return week;
}

var lastWeekInCycle = getLastWeekInCycle(weekInCycle);

function getDaysLeftInCycle (weekInCycle, daysSinceCycleStart) {
    var index = window['daysInWeek' + weekInCycle].indexOf(daysSinceCycleStart);
    var daysLeft = 7 - index;
    return daysLeft;
}

daysLeftInCycle = getDaysLeftInCycle(weekInCycle, daysSinceCycleStart);

function getCountDownString (daysLeftInCycle) {
    if (daysLeftInCycle == 1) {
        return '<span style="color: #F4511E; font-weight: bold;">Last day</span> to complete chores!';
    } else if (daysLeftInCycle == 2) {
        return '<span style="color: #F4511E; font-weight: bold;">1 day left</span> after today to complete chores.';
    } else {
        return daysLeftInCycle - 1 + ' days left after today to complete chores.';
    }
}

footerPara.innerHTML = getCountDownString(daysLeftInCycle);

// Create empty rooms array. Each room will be added to the array by the room constructor.
var rooms = [];

class room {
    constructor(roomName, firstCleaner, secondCleaner) {
        
        this.roomName = roomName;

        this.cleaningSchedule = {
            1 : {cleanerID : firstCleaner, cleanLevel : 'deep'},
            2 : {cleanerID : firstCleaner, cleanLevel : 'quick'},
            3 : {cleanerID : secondCleaner, cleanLevel : 'deep'},
            4 : {cleanerID : secondCleaner, cleanLevel : 'quick'}
        }

        rooms.push(this);
    }
}

kitchen = new room('Kitchen', 1, 2);
bathroom = new room('Bathroom', 2, 1);

class cleaner {
    constructor(name, ID) {
        this.name = name;
        this.ID = ID;
    }

    getCleaningStringInWeek(week) {
        if (week == lastWeekInCycle) {
            var cleaningString = 'Last week: ';
        } else if (week == weekInCycle) {
            var cleaningString = 'This week: ';
        } else if (week == nextWeekInCycle) {
            var cleaningString = 'Next week: ';
        } else {
            console.log("Could not generate initial cleaningString.");
            console.log("week: " + week);
            console.log("lastWeekInCycle: " + lastWeekInCycle);
            console.log("nextWeekInCycle: " + nextWeekInCycle);
            console.log("weekInCycle: " + weekInCycle);
        }

        rooms.forEach(element => {
            if (this.ID == element.cleaningSchedule[week].cleanerID) {
                cleaningString += element.roomName + ', ' + element.cleaningSchedule[week].cleanLevel + ' clean.';
            }
        })

        return cleaningString;
    }
}

jack = new cleaner('Jack', 1);
faith = new cleaner('Faith', 2);

jackLastWeek.innerHTML = jack.getCleaningStringInWeek(lastWeekInCycle);
faithLastWeek.innerHTML = faith.getCleaningStringInWeek(lastWeekInCycle);

jackThisWeek.innerHTML = jack.getCleaningStringInWeek(weekInCycle);
faithThisWeek.innerHTML = faith.getCleaningStringInWeek(weekInCycle);

jackNextWeek.innerHTML = jack.getCleaningStringInWeek(nextWeekInCycle);
faithNextWeek.innerHTML = faith.getCleaningStringInWeek(nextWeekInCycle);

jackThisWeek.scrollIntoView();
faithThisWeek.scrollIntoView();