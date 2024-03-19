let common = [
  'features/**/*.feature',
  '--require ./features/step_definitions/**/*.js',
  '--format progress-bar',
  `--format-options '{"snippetInterface": "synchronous"}'`
].join(' ');

module.exports = {
  default: common
}