module.exports = (key, { entryFile, template }) => {
  console.log('run template');
  // figure out which template dir to use
  // yarn install in template dir
  // copy and start syncing /project-dir/src to /template-dir/src/projectFiles
  // get /template-dir/src/entry to import and export /template-dir/src/projectFiles/entryFile
  // run start command in /template-dir
};
