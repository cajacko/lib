let projectDir = process.cwd();

exports.get = () => Promise.resolve(projectDir);

exports.set = (dir) => {
  projectDir = dir;
};
