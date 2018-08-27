const { join } = require('path');
const { ensureDir } = require('fs-extra');
const { RunnerTemplate } = require('@cajacko/template');
// const projectDir = require('../../utils/project/projectDir');
// const { getProjectConfig } = require('../../utils/project/projectConfig');
// const { getIsGitRepo } = require('../../utils/git/git');

class Projects extends RunnerTemplate {
  init() {
    this.runner.add('preRun', [
      () => this.getExistingConfig(),
      () => this.createProjectCloneOrUseDir(),
      () => this.getExistingConfig(),
      () => this.ensureGithubSetup(),
      () => this.ensureTravisSetup(),
      // () => this.getShouldSetMissingConfigOnly(),
      // () => this.goThroughGenericProjectConfig(),
      // () => this.goThroughExistingTemplatesConfig(),
      // () => this.askAndSetNewTemplateConfig(),
      // () => this.setNewRanWithProjectVersion(),
      // () => this.writeProjectConfig(),
    ]);
  }

  getExistingConfig() {
    return this.getProjectConfig().then((projectConfig) => {
      if (projectConfig) {
        this.runner.set('projectConfig', projectConfig);
      }
    });
  }

  createProjectOrUseDir() {
    if (this.runner.projectConfig) return Promise.resolve();

    const destPath = this.getDestPath();

    return this.git
      .getIsRepo(destPath)
      .then((isGitRepo) => {
        if (isGitRepo) return Promise.resolve();

        return this.runner.prompt({
          type: 'list',
          message: 'Do you want to clone an existing project from github or create a new one?',
          default: 'clone',
          choices: ['clone', 'new'],
        });
      })
      .then((action) => {
        if (action === 'clone') return this.cloneFromGithub();

        return this.newGithub();
      })
      .then(gitPath => this.setDestPath(gitPath));
  }

  ensureGitRepo() {
    const destPath = this.getDestPath();

    return this.git.getIsRepo(destPath).then((isGitRepo) => {
      if (isGitRepo) return Promise.resolve();

      return Promise.reject(new Error('Need to implement this step'));

      // console.log("Looks like you are not in a git repo, let's set one up. \nIf you want to run this for an existing project, cd into the project then run this command");

      // // TODO: init git repo now
      // return setupNewRepo(dir).then(() =>
      //   this.runner
      //     .prompt({
      //       type: 'confirm',
      //       name: 'shouldAddToGitHub',
      //       message: 'Do you want to add this as a new repo to GitHub?',
      //     })
      //     .then((shouldAddToGithub) => {
      //       if (!shouldAddToGithub) return Promise.resolve();

      //       return this.runner
      //         .prompt({
      //           type: 'input',
      //           name: 'name',
      //           message: 'Name for the new repo',
      //           validate: (name) => {
      //             if (!isSlug(name)) {
      //               return 'The repo name must be in a url slug like format e.g. repo-name';
      //             }

      //             return true;
      //           },
      //           default: () => {
      //             const parts = dir.split('/');
      //             return parts[parts.length - 1];
      //           },
      //         })
      //         .then(githubName => addToGithub(dir, githubName));
      //     }));
    });
  }

  getShouldSetMissingConfigOnly() {
    if (isRanWithProjectVersionMismatch()) {
      console.log('Your project config is out of date, please check everything');
      return Promise.resolve();
    }

    return getDoesHaveMissingConfig().then((hasMissingConfig) => {
      if (!hasMissingConfig) return Promise.resolve();

      return this.runner
        .prompt({
          type: 'confirm',
          message:
            'You have some missing config, do you want to only complete the missing stuff?',
          default: true,
        })
        .then((onlyCompleteMissingConfig) => {
          if (onlyCompleteMissingConfig) {
            this.runner.setProp('onlyAskMissingConfig', true);
          }

          return Promise.resolve();
        });
    });
  }

  goThroughGenericProjectConfig() {
    let questions = [
      {
        type: 'input',
        name: 'title',
        message: 'Project title. Will be used for things like the Readme title',
        default: () =>
          projectName
            .get()
            .then(name =>
              name
                .replace('-', ' ')
                .replace(
                  /\w\S*/g,
                  txt =>
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
                )),
      },
      {
        type: 'input',
        name: 'version',
        default: '0.1.0',
        message: 'Initial project version to set',
        validate: version =>
          !!semver.valid(version) || `${version} is not a valid semver`,
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description for this project',
        validate: (description) => {
          if (!description) return 'you must provide a description';
          if (description.length < 10) {
            return 'Please provide a description longer than 10 characters';
          }
          if (description.length > 300) {
            return 'Please provide a description shorter than 300 characters';
          }

          return true;
        },
      },
      {
        type: 'input',
        name: 'keywords',
        filter: keywords => (!keywords || !keywords.length ? null : keywords),
        message:
          "Add some keywords for package.json, we'll automatically include tags for all technologies supplied by the lib module for your project.",
      },
      {
        type: 'boolean',
        name: 'noLicense',
        default: false,
        message: 'Should this project have NO LICENSE set?',
      },
      {
        type: 'boolean',
        name: 'publicOnNPM',
        default: false,
        message: 'Is this project going to be published to npm?',
      },
      {
        type: 'input',
        name: 'authorName',
        default: 'Charlie Jackson',
        message: 'The project authors name',
      },
      {
        type: 'input',
        name: 'authorEmail',
        default: 'contact@charliejackson.com',
        message: 'The project authors email address',
      },
      {
        type: 'input',
        name: 'authorUrl',
        default: 'https://charliejackson.com',
        message: 'The project authors url',
      },
      {
        type: 'input',
        name: 'bugEmail',
        filter: email => (!email || !email.length ? null : email),
        message:
          "Supply a custom email for bugs here or we'll use the author email as a fallback",
        validate: (email) => {
          if (!email) return true;

          return (
            validator.isEmail(email) ||
            'Please supply a valid email address or leave empty for the default'
          );
        },
      },
    ];

    questions = filterQuestions(questions);

    if (!questions.length) return Promise.resolve();

    return this.runner.prompt(questions);
  }
}

module.exports = Projects;
