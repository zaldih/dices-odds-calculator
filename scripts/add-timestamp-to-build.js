const fs = require("fs");

const CONFIG = {
  ENVIRONMENT_PATH: "./src/environments/environment.ts",
};

addTimestampToBuild();

function addTimestampToBuild() {
  const timestamp = getTimestamp();
  const envText = fs.readFileSync(CONFIG.ENVIRONMENT_PATH, "utf8");
  const newEnvText = replaceBuildDate(envText, timestamp);
  fs.writeFileSync(CONFIG.ENVIRONMENT_PATH, newEnvText, "utf8");
  console.log("Build timestamp setted: ", newEnvText);
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

function replaceBuildDate(envText, timestamp) {
  return envText.replace(/(buildDate: )'(.*)'/g, `$1'${timestamp}'`);
}
