/**
 * @type {NodeJS.ProcessEnv}
 */

const env = process.env;

/**
 *
 * @param {NodeJS.ProcessEnv} variable - Environment variable env.ANY
 * @param {string} description - Environment variable NAME
 */

function checkEnv(variable, description) {
  if (!variable) {
    console.log(`FATAL ERROR: ${description} not defined`);
    process.exit(1);
  }
}

module.exports = {
  env,
  checkEnv,
};
