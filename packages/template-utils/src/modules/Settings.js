// @flow

import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';
import { join } from 'path';
import { readJSON, writeJSON, ensureFile } from 'fs-extra';

/**
 * Manage user settings, can get, set and delete values that will persist
 * on the users machine
 */
class Settings {
  /**
   * Setup the class, define the initial props, and bind the public methods
   *
   * @param {String} fileName The file name to store settings in
   * @param {Object} [options] Additional options to pass in
   *
   * @return {Void} No return value
   */
  constructor(fileName, { useInMemoryCache, doNotResetOnFailure } = {}) {
    if (!fileName) throw new Error('No file name specified for the settings');

    this.settings = null;
    this.useInMemoryCache = !!useInMemoryCache;
    this.hasGotInitialValues = false;
    this.doNotResetOnFailure = !!doNotResetOnFailure;
    this.queuedProcesses = [];
    this.currentProcess = null;

    const homeDir = process.env.HOME || process.env.USERPROFILE;

    this.filePath = join(
      homeDir,
      fileName.startsWith('.') ? fileName : `.${fileName}`
    );

    this.set = this.set.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
    this._updateSettings = this._updateSettings.bind(this);
  }

  /**
   * Set a value in the store. If no location is passed, all the settings are
   * changed
   *
   * @param {Any} value The value to set
   * @param {String} [location] The object location to set the value to
   *
   * @return {Promise} Resolves when the setting has been saved
   */
  set(value, location) {
    return this._updateSettings()
      .then(() => {
        if (location) {
          set(this.settings, location, value);
        } else {
          this.settings = value;
        }

        return this._writeSettings(this.settings);
      })
      .then(this._updateSettings);
  }

  /**
   * Get all or a specific setting
   *
   * @param {String} [location] The object location to get a setting for
   *
   * @return {Promise} Resolves with the specified setting
   */
  get(location) {
    return this._updateSettings().then(() => {
      if (!location) return this.settings;

      return get(this.settings, location);
    });
  }

  /**
   * Delete a specific or all settings
   *
   * @param {String} [location] Object location to delete in the settings
   *
   * @return {Promise} Resolves when the setting has been deleted
   */
  delete(location) {
    return this._updateSettings()
      .then(() => {
        if (location) {
          unset(this.settings, location);
        } else {
          this.settings = {};
        }

        return this._writeSettings(this.settings);
      })
      .then(this._updateSettings);
  }

  /**
   * Queue up any promise func that gets passed in. So only 1 func can run at a
   * time. Useful as we're reading and writing to the same file all the time
   *
   * @param {Function} callback The promise func to put in the queue
   *
   * @return {Promise} Resolves when the callback has finished
   */
  _throttle(callback) {
    return new Promise((resolve, reject) => {
      /**
       * Call the callback and resolve/reject the promise as necessary
       *
       * @return {Promise} Whatever
       */
      const promiseResolver = () =>
        callback()
          .then(resolve)
          .catch(reject);

      if (this.currentProcess) {
        this.queuedProcesses.push(promiseResolver);
      } else {
        this.currentProcess = promiseResolver()
          .then(success => ({ success }))
          .catch(error => ({ error }))
          .then(({ success, error }) => {
            this.currentProcess = null;

            const nextProcess = this.queuedProcesses[0];

            if (nextProcess) {
              this.currentProcess = nextProcess();
            }

            if (error) throw error;

            return success;
          });
      }
    });
  }

  /**
   * Write the settings to the store, passes through the throttle
   *
   * @param {Object} settings The settings to write
   *
   * @return {Promise} Resolves when finished
   */
  _writeSettings(settings) {
    return this._throttle(() =>
      writeJSON(this.filePath, settings, { spaces: 2 }).then(() => settings));
  }

  /**
   * Get all the settings, passes through the throttle
   *
   * @return {Promise} Resolves with the settings
   */
  _readSettings() {
    return this._throttle(() => readJSON(this.filePath));
  }

  /**
   * Get the latest settings and add them to the class
   *
   * @return {Promise} Resolves when completed
   */
  _updateSettings() {
    if (this.hasGotInitialValues && this.useInMemoryCache) {
      return Promise.resolve();
    }

    return ensureFile(this.filePath)
      .then(() =>
        this._readSettings().catch((e) => {
          if (this.doNotResetOnFailure) return Promise.reject(e);

          return this._writeSettings({});
        }))
      .then((settings) => {
        this.settings = settings;
        this.hasGotInitialValues = true;
        return this.settings;
      });
  }
}

export default Settings;
