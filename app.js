/*
I am doing it in a 2 ways.The first way is when i amd going through the readData.js where we are filtering when we are reading the
data itself.

2nd way we will do it here only.
*/
const { result, isHabitablePlanet } = require("./readData");
const fs = require("fs");
const csv = require("csv-parse");

//console.log(`${result.length} are the habitable planets`);

const habitablePlanetList = [];

fs.createReadStream("./kepler_data.csv")
  .pipe(
    csv.parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    habitablePlanetList.push(data);
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(`${habitablePlanetList.length} the list of total planets`);
    filterHabitablePlanets();
    // console.log(`${habitablePlanetList.length} the list of total planets`);
  });

function filterHabitablePlanets() {
  habitablePlanetList.forEach((element) => {
    if (isHabitablePlanet(element)) {
      console.log(element["kepler_name"]);
    }
  });
}
