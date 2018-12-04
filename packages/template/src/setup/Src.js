// @flow

import SetupTemplate from '../modules/SetupTemplate';

/**
 * Add example src files
 */
class Src extends SetupTemplate {
  /**
   * During the setup files stage, add all the example files, only if no src
   * dir exists
   */
  setupFiles() {
    return this.fs.copyIfDoesNotExist('src', 'src', { isDir: true });
  }
}

export default Src;
