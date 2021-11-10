// seedDate should be the Sunday before week 1 starts (if Monday is the first day of the week)
var seedDate = new Date("2021-10-31");
var today = new Date(Date.now());

daysInWeek1 = [1, 2, 3, 4, 5, 6, 7];
daysInWeek2 = [8, 9, 10, 11, 12, 13, 14];
daysInWeek3 = [15, 16, 17, 18, 19, 20, 21];
daysInWeek4 = [22, 23, 24, 25, 26, 27, 0];

console.log("Seed date is " + seedDate)
console.log("Today is " + today)

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

// Constructor to create new person
var Person = function (ID, name) {
    this.ID = ID;
    this.name = name;

    this.showPerson = function () {
        console.log("Person " + this.ID + ": " + this.name);
    }

    // this.getJob = function (seedDate) {

    // }
}

var person1 = new Person(1, "Jack");
var person2 = new Person(2, "Faith");
// person1.showPerson();
// person2.showPerson();

var Room = function (ID, name, firstCleaner, secondCleaner, roomWeek) {
    this.ID = ID;
    this.name = name;

    this.schedule = {
        1 : {"PersonID" : firstCleaner, "Level" : "Deep"},
        2 : {"PersonID" : firstCleaner, "Level" : "Quick"},
        3 : {"PersonID" : secondCleaner, "Level" : "Deep"},
        4 : {"PersonID" : secondCleaner, "Level" : "Quick"}
    };

    // Need to think about the logic for this method, or if it is necessary.
    // var.whoIsCleaning = function (roomWeek) {
    //     if (roomWeek == 1) {
    //         roomCleaner = Personschedule[1]["PersonID"]
    //     }
    // }
}