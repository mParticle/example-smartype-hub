let configFile;
let config;

// Reads JSON config passed in as argument
try {
  configFile = process.argv[2];
  config = require(`../${configFile}`);
} catch (error) {
  throw error;
}

let outputArray = [];
// Iterates through Data Plans in SmartypeHubConfig object to generate
// map of Data Plans and Versions
config.smartypeHubConfig.dataPlans.map((dataPlan) => {
  dataPlan.versions.map((version) => {
    outputArray.push({ dataPlanId: dataPlan.dataPlanId, version });
  });
});

// Wraps output into a format that can be read by Github Actions
const output = {
  include: outputArray,
};

// Echos the stringified JSON so that the `generate-matrix.set-matrix` step can
// pick up the JSON object.
console.log(JSON.stringify(output));
