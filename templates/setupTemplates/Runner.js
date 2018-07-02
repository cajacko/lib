const FileManagement = require('./FileManagement');

class Runner extends FileManagement {
  constructor(globalTemplates) {
    super();

    this.currentStep = 'init';
    this.steps = {};
    this.stepsOrder = [
      'preRun',
      'setupFiles',
      'postSetupFiles',
      'writeFiles',
      'postWriteFiles',
      'installDependencies',
      'postInstallDependencies',
      'postRun',
    ];

    this.projectConfig = {
      projects: [],
    };

    if (globalTemplates) {
      Object.keys(globalTemplates).forEach((key) => {
        const ClassToInitiate = globalTemplates[key];
        this[key] = new ClassToInitiate(this);

        this.stepsOrder.forEach((step) => {
          if (typeof this[key][step] === 'function') {
            this.add(step, () => this[key][step]());
          }
        });
      });
    }
  }

  run() {
    this.utilsSetup.then(() => {
      const queue = [];

      this.stepsOrder.forEach(step => queue.push(() => this.runStep(step)));

      return this.promiseQueue(queue);
    });
  }

  getStepOrder(step = this.currentStep) {
    if (step === 'init') return 0;

    return this.stepsOrder.indexOf(step) + 1;
  }

  runStep(step) {
    this.currentStep = step;

    const queue = [];

    if (this.steps[step]) {
      this.steps[step].forEach((callback, i) => {
        if (typeof callback !== 'function') return;

        queue.push(() => Promise.resolve(callback()));
      });
    }

    return this.promiseQueue(queue);
  }

  add(step, funcs) {
    if (this.getStepOrder() >= this.getStepOrder(step)) {
      throw new Error(`Can't add another ${step} step, as we're doing that step already, or have already completed it`);
    }

    if (!this.steps[step]) this.steps[step] = [];

    if (Array.isArray(funcs)) {
      this.steps[step] = this.steps[step].concat(funcs);
    } else {
      this.steps[step].push(funcs);
    }
  }
}

module.exports = Runner;
