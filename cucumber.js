let common = [
  'features/**/*.feature',
  '--require ./features/step_definitions/**/*.js',
  '--format progress-bar',
  `--format-options '{"snippetInterface": "synchronous"}'`,
  `--require ./src/cucumber-init.js`
].join(' ');

module.exports = {
  default: common
}