var seedDate = new Date("2021-11-1");
var today = new Date(Date.now());

daysInWeek1 = [1, 2, 3, 4, 5, 6, 7];
daysInWeek2 = [8, 9, 10, 11, 12, 13, 14];
daysInWeek3 = [15, 16, 17, 18, 19, 20, 21];
daysInWeek4 = [22, 23, 24, 25, 26, 27, 0];
console.log("Seed date is " + seedDate)
console.log("Today is " + today)

function getWeekCycle (date) {
    // dateDiff is slightly flawed as I live in a country that practices daylight saving time.
    // Won't worry about it for now as it should only be an issue if I am checking the 
    // cleaning rota between 12 and 1 AM. If that happens then something has clearly gone 
    // wrong in my life and the cleaning rota being incorrect is a lesser problem.
    dateDiff = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(seedDate.getFullYear(), seedDate.getMonth(), seedDate.getDate()) ) /(1000 * 60 * 60 * 24));
    // Rota completes a cycle in 4 weeks. 7 * 4 = number of days in a cycle.
    // dateDiff % (7 * 4) is therefore number of days since current cycle started.
    daysSinceCycleStart = dateDiff % (7 * 4);
    if (daysSinceCycleStart in daysInWeek1) {
        cycleWeek = 1;
    } else if (daysSinceCycleStart in daysInWeek2) {
        cycleWeek = 2;
    } else if (daysSinceCycleStart in daysInWeek3) {
        cycleWeek = 3;
    } else if (daysSinceCycleStart in daysInWeek4) {
        cycleWeek = 4;
    };

    return cycleWeek;
};
var cycleWeek = getWeekCycle(seedDate);
console.log(cycleWeek);

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

var kitchen = {
    1 : {"PersonID" : 1, "Level" : "Deep"},
    2 : {"PersonID" : 1, "Level" : "Quick"},
    3 : {"PersonID" : 2, "Level" : "Deep"},
    4 : {"PersonID" : 2, "Level" : "Deep"}
}
var bathroom = {
    1 : {"PersonID" : 2, "Level" : "Deep"},
    2 : {"PersonID" : 2, "Level" : "Quick"},
    3 : {"PersonID" : 1, "Level" : "Deep"},
    4 : {"PersonID" : 1, "Level" : "Deep"}
}

