// @flow

import fetch from 'node-fetch';
import merge from 'lodash/merge';

/**
 * Manage github through its api
 */
class GitHub {
  /**
   * Initialise the class and ensure a token is passed in
   */
  constructor(token) {
    this.token = token;

    if (!this.token) throw new Error('No token set in GitHub class');
  }

  /**
   * Wrapper around fetch to always pass the access token and correct path
   */
  _fetch(endpoint, { allowStatusCodes, ...opts } = {}) {
    if (!endpoint.startsWith('/')) {
      throw new Error('Endpoint must start with a "/"');
    }

    const url = `https://api.github.com${endpoint}?access_token=${this.token}`;

    const options = merge(
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      opts
    );

    return fetch(url, options).then((res) => {
      // Some responses are expected to fail, but we still want the result
      if (!allowStatusCodes || !allowStatusCodes.includes(res.status)) {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(`Non 200 status code returned for Github API: ${res.status}`);
        }
      }

      return res.json();
    });
  }

  /**
   * Does a repo exist with the given name and user
   */
  repoExists(name, user, { mustBePrivate }) {
    const endpoint = `/repos/${user}/${name}`;

    return this._fetch(endpoint, { allowStatusCodes: [404] }).then((data) => {
      if (!data.id) {
        if (data.message) {
          logger.debug(`Could not confirm repo exists, here's why: "${data.message}"`);
        }

        return false;
      }

      if (mustBePrivate && !data.private) {
        throw new Error(`Repo at ${endpoint} is not private, mustBePrivate has been set to true`);
      }

      return true;
    });
  }

  /**
   * Create a repo with the given name and user
   */
  createRepo(name, opts = {}) {
    return this._fetch('/user/repos', {
      method: 'POST',
      body: JSON.stringify({
        name,
        ...opts,
      }),
    }).then((data) => {
      if (!data.id) {
        throw new Error(`Could not create the repo: ${data.message || 'No response from api'}`);
      }
    });
  }
}

export default GitHub;
