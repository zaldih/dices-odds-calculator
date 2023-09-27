const fs = require("fs");

const CONFIG = {
  DIST_PATH: "./dist/diceodds/assets/version.txt",
};

addTimestampToBuild();

function addTimestampToBuild() {
  const timestamp = getTimestamp();
  fs.writeFileSync(CONFIG.DIST_PATH, timestamp, "utf8");
  console.log(
    `Build timestamp file created on ${CONFIG.DIST_PATH}: ${timestamp}`
  );
}

function getTimestamp() {
  const now = new Date();

  const day = now.getDate().toString().padStart(2, "0");
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear().toString();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const timestamp = `${day}-${month}-${year} ${hours}:${minutes}`;
  return timestamp;
}
