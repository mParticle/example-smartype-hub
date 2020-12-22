let configFile;
let config;

try {
  configFile = process.argv[2];
  config = require(`../${configFile}`);
} catch (error) {
  throw error;
}

let outputArray = [];
config.smartypeHubConfig.dataPlans.map((dataPlan) => {
  dataPlan.versions.map((version) => {
    outputArray.push({ dataPlanId: dataPlan.dataPlanId, version });
  });
});

const output = {
  include: outputArray,
};

console.log(JSON.stringify(output));
