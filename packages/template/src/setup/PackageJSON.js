// @flow

import { orderObj } from '@cajacko/template-utils';
import { readJSON, writeJSON } from 'fs-extra';
import { join } from 'path';
import SetupTemplate from '../modules/SetupTemplate';

const projectJSON = {
  name: 'weewee',
  version: '0.1.0',
  description: 'Example project',
  license: 'MIT',
  scripts: {
    start: 'node .scripts/template.js start',
    init: 'node .scripts/template.js init',
    test: 'node .scripts/template.js test',
    build: 'node .scripts/template.js build',
    deploy: 'node .scripts/template.js deploy',
    upgrade: 'node .scripts/template.js upgrade',
  },
};

const packageJSONOrder = [
  'name',
  'version',
  'description',
  'bin',
  'scripts',
  'main',
  'license',
];

const endPriority = ['dependencies', 'devDependencies', 'peerDependencies'];

/**
 * Decide what the package.json file should look like based on the project
 * config
 */
class PackageJSON extends SetupTemplate {
  /**
   * Set the initial packageJSON object
   *
   * @param {*} args The args needed by the class
   *
   * @return {Void} No return value
   */
  constructor(...args) {
    super(...args);

    this.packageJSON = projectJSON;
  }

  /**
   * Get all the dependencies and peerDependencies in the lib module and add
   * them as peer dependencies to the project. Mainly so flow and eslint can
   * figure out whats going on
   *
   * @return {Promise} Promise that resolves when we've added the dependencies
   */
  addLibDepsAsPeer() {
    const libJSONPath = join(
      this.projectDir,
      'node_modules/@cajacko/lib/package.json'
    );

    return readJSON(libJSONPath).then(({ dependencies, peerDependencies }) => {
      /**
       * Add all the packages supplied to the func, to the queue to get
       * installed
       *
       * @param {Object} packages An object representing all the packages and
       * their versions
       *
       * @return {Void} No return value
       */
      const addPackages = (packages) => {
        if (!packages || typeof packages !== 'object') return;

        Object.keys(packages).forEach((key) => {
          const version = packages[key];

          this.npm.add({
            [key]: { version, type: 'peer' },
          });
        });
      };

      addPackages(dependencies);
      addPackages(peerDependencies);
    });
  }

  /**
   * Just before installing the dependencies, add the lib deps
   *
   * @return {Promise} Promise that resolves when we've queued up the
   * dependencies
   */
  preInstallDependencies() {
    if (
      this.templatesUsed.includes('mobile-app') ||
      this.templatesUsed.includes('graphql')
    ) {
      return this.addLibDepsAsPeer();
    }

    return Promise.resolve();
  }

  /**
   * After file setup, setup the defaults for the package.json file. Doing it
   * here in case any other setup files want to do stuff before hand
   *
   * @return {Promise} Promise that resovles when we've queued up everything
   */
  postSetupFiles() {
    if (this.projectConfig.ignorePackageJSON) return Promise.resolve();

    if (this.projectConfig) {
      const {
        slug, description, license, templates,
      } = this.projectConfig;
      this.packageJSON.name = slug;
      this.packageJSON.description = description;
      this.packageJSON.license = license;

      if (templates) {
        Object.keys(templates).forEach((template) => {
          const {
            type, bin, files, main, dependencies,
          } = templates[template];

          if (type !== 'npm-module') return;

          if (main) this.packageJSON.main = main;

          if (!this.packageJSON.files) this.packageJSON.files = files || [];

          this.packageJSON.files.push('dist/**/*');

          if (bin) {
            Object.keys(bin).forEach((command) => {
              const path = bin[command];

              if (!this.packageJSON.bin) this.packageJSON.bin = {};

              this.packageJSON.bin[command] = path;
            });
          }

          if (dependencies) {
            Object.keys(dependencies).forEach((key) => {
              const version = dependencies[key];

              this.npm.add({
                [key]: { version },
              });
            });
          }
        });
      }
    }

    return this.fs.writeJSON(
      orderObj(this.packageJSON, packageJSONOrder, endPriority),
      'package.json'
    );
  }

  /**
   * During the post install step, reorder the package.json file. As it
   * get's modified during the install step, and may go out of order.
   *
   * @return {Promise} Resolves when the file has been written
   */
  postInstallDependencies() {
    const packageJSONPath = join(this.projectDir, 'package.json');

    return readJSON(packageJSONPath).then(packageJSON =>
      writeJSON(
        packageJSONPath,
        orderObj(packageJSON, packageJSONOrder, endPriority),
        { spaces: 2 }
      ));
  }
}

export default PackageJSON;
