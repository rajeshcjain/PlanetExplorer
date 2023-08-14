const fs = require("fs");
const csv = require("csv-parse");

const result = [];

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream("./kepler_data.csv")
  .pipe(
    csv.parse({
      comment: "#",
      columns: true,
    })
  )
  //This will be called for each row in the csv
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      result.push(data);
    }
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(`${result.length} are the habitable planet`);
    console.log("done");
  });

module.exports.result = result;
module.exports.isHabitablePlanet = isHabitablePlanet;
