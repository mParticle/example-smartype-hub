let configFile;
let config;

// Reads JSON config passed in as argument
try {
  configFile = process.argv[2];
  config = require(`../${configFile}`);
} catch (error) {
  throw error;
}

// Iterates through Data Plans in SmartypeHubConfig object to generate
// map of Data Plans and Versions
config.smartypeHubConfig.dataPlans.map((dataPlan) => {
  dataPlan.versions.map((version) => {
    // Echos a list of data_plan_ids with version numbers so that
    // they can be parsed and passed into mp CLI via fetch-data-plans step
    // Also uses dots as a delimiter for parsing out via Github Action
    console.log(`${dataPlan.dataPlanId}.${version}`);
  });
});
