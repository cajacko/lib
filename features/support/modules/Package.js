class Package {
  constructor(packageName) {
    this.packageName = packageName;
  }

  install(docker, options) {
    if (options && options.global) {
      return docker.run(`npm i -g ${this.packageName}`);
    }
  }
}

module.exports = Package;
