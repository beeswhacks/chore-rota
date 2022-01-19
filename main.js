var faithPara = document.getElementById("Faith");
var jackPara = document.getElementById("Jack");
var footerPara = document.getElementById("footerPara");

// seedDate should be the day before week 1 starts (e.g. Sunday 2nd, if Monday 1st is the first day of week 1)
var seedDate = new Date("2021-10-31");
var today = new Date(Date.now());

daysInWeek1 = [1, 2, 3, 4, 5, 6, 7];
daysInWeek2 = [8, 9, 10, 11, 12, 13, 14];
daysInWeek3 = [15, 16, 17, 18, 19, 20, 21];
daysInWeek4 = [22, 23, 24, 25, 26, 27, 0];

var startWeek1 = daysInWeek1[0];
var startWeek2 = daysInWeek2[0];
var startWeek3 = daysInWeek3[0];
var startWeek4 = daysInWeek4[0];

// Create text for footer showing today's date 
var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
footerPara.innerHTML = "Today's date: " + today.toLocaleDateString('en-GB', dateOptions);

function getWeekCycle (date) {

    dateDiff = Math.floor((today - seedDate) /(1000 * 60 * 60 * 24));

    // Rota completes a cycle in 4 weeks. 7 * 4 = number of days in a cycle.
    // dateDiff % (7 * 4) is therefore number of complete days since current cycle started.
    daysSinceCycleStart = dateDiff % (7 * 4);
    console.log("Days since cycle started: " + daysSinceCycleStart);

    if (daysSinceCycleStart >= startWeek1 && daysSinceCycleStart < startWeek2) {
        cycleWeek = 1;
    } else if (daysSinceCycleStart >= startWeek2 && daysSinceCycleStart < startWeek3) {
        cycleWeek = 2;
    } else if (daysSinceCycleStart >= startWeek3 && daysSinceCycleStart < startWeek4) {
        cycleWeek = 3;
    } else if (daysSinceCycleStart >= startWeek4 || daysSinceCycleStart == 0) {
        cycleWeek = 4;
    }

    return cycleWeek;
};

var cycleWeek = getWeekCycle(seedDate);

// Assign each cleaner an ID to prevent names being hard written into code
cleaners = {
    1 : "Jack",
    2 : "Faith"
};

// Create empty rooms array. Each room will be added to the array by the room constructor.
var rooms = [];

class room {
    constructor(roomName, firstCleaner, secondCleaner, week) {
        this.roomName = roomName;

        // Each cleaner cleans each room 2 weeks in a row
        if ([1, 2].includes(week)) {
            this.cleanerID = firstCleaner;
        } else if ([3, 4].includes(week)) {
            this.cleanerID = secondCleaner;
        }

        // Each cleaner alternates between a deep clean and a quick clean each week
        if ([1, 3].includes(week)) {
            this.cleanLevel = "deep";
        } else if ([2, 4].includes(week)) {
            this.cleanLevel = "quick";
        }

        this.cleanerName = cleaners[this.cleanerID];

        rooms.push(this);
    }
};

kitchen = new room('Kitchen', 1, 2, cycleWeek);
bathroom = new room('Bathroom', 2, 1, cycleWeek);

class cleaner {
    constructor(name, ID) {
        this.name = name;
        this.ID = ID;
    }

    getCleaningString() {
        var cleaningString = 'This week:<ul>';
        rooms.forEach(element => {
            if (this.ID == element.cleanerID) {
                cleaningString += '<li>' + element.roomName + ', ' + element.cleanLevel + ' clean.</li>';
            }
        })
        cleaningString += '</ul>';
        return cleaningString;
    }
}

jack = new cleaner('Jack', 1);
faith = new cleaner('Faith', 2);

jackPara.innerHTML = jack.getCleaningString();
faithPara.innerHTML = faith.getCleaningString();