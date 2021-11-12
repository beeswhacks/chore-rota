// seedDate should be the Sunday before week 1 starts (if Monday is the first day of the week)
var seedDate = new Date("2021-10-31");
var today = new Date(Date.now());

daysInWeek1 = [1, 2, 3, 4, 5, 6, 7];
daysInWeek2 = [8, 9, 10, 11, 12, 13, 14];
daysInWeek3 = [15, 16, 17, 18, 19, 20, 21];
daysInWeek4 = [22, 23, 24, 25, 26, 27, 0];

function getWeekCycle (date) {

    dateDiff = Math.floor((today - seedDate) /(1000 * 60 * 60 * 24));

    // Rota completes a cycle in 4 weeks. 7 * 4 = number of days in a cycle.
    // dateDiff % (7 * 4) is therefore number of days since current cycle started.
    daysSinceCycleStart = dateDiff % (7 * 4);
    console.log("Days since cycle started: " + daysSinceCycleStart);

    if (daysSinceCycleStart >= daysInWeek1[0] && daysSinceCycleStart <= daysInWeek1[daysInWeek1.length - 1]) {
        cycleWeek = 1;
    } else if (daysSinceCycleStart >= daysInWeek2[0] && daysSinceCycleStart <= daysInWeek2[daysInWeek2.length - 1]) {
        cycleWeek = 2;
    } else if (daysSinceCycleStart >= daysInWeek3[0] && daysSinceCycleStart <= daysInWeek3[daysInWeek3.length - 1]) {
        cycleWeek = 3;
    } else if ((daysSinceCycleStart >= daysInWeek4[0] && daysSinceCycleStart <= daysInWeek4[daysInWeek4.length - 1]) || daysSinceCycleStart == 0) {
        cycleWeek = 4;
    };

    return cycleWeek;
};
var cycleWeek = getWeekCycle(seedDate);
console.log("Current week in the cycle: " + cycleWeek);


// Create array of cleaners
// cleaners = [new Person(1, "Jack"), new Person(2, "Faith")]
cleaners = {
    1 : "Jack",
    2 : "Faith"
}

var kitchenClean =  function (week) {

     if ([1, 2].includes(week)) {
         cleanerID = 1;
     } else if ([3, 4].includes(week)) {
         cleanerID = 2;
     };

     if ([1, 3].includes(week)) {
        cleanLevel = "deep";
     } else if ([2, 4].includes(week)) {
        cleanLevel = "quick";
     }

     return _kitchenClean = {
         cleanerID : cleanerID,
         cleanerName : cleaners[cleanerID],
         cleanLevel : cleanLevel
     };
};

var bathroomClean =  function (week) {

    if ([1, 2].includes(week)) {
        cleanerID = 2;
    } else if ([3, 4].includes(week)) {
        cleanerID = 1;
    };

    if ([1, 3].includes(week)) {
       cleanLevel = "deep";
    } else if ([2, 4].includes(week)) {
       cleanLevel = "quick";
    }

    return _bathroomClean = {
        cleanerID : cleanerID,
        cleanerName : cleaners[cleanerID],
        cleanLevel : cleanLevel
    };
};

kitchenClean1 = kitchenClean(cycleWeek);
console.log("Kitchen being " + kitchenClean1.cleanLevel + " cleaned by " + kitchenClean1.cleanerName);

bathroomClean1 = bathroomClean(cycleWeek);
console.log("Bathroom being " + bathroomClean1.cleanLevel + " cleaned by " + bathroomClean1.cleanerName);