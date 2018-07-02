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
    this.utilsSetup
      .then(() => {
        const queue = this.newQueue();

        this.stepsOrder.forEach(step => queue.add(this.runStep(step)));

        return queue;
      })
      .then(() => {
        console.log(this.writeFiles);
      });
  }

  getStepOrder(step = this.currentStep) {
    if (step === 'init') return 0;

    return this.stepsOrder.indexOf(step) + 1;
  }

  runStep(step) {
    return () => {
      this.currentStep = step;

      if (!this.steps[step]) return Promise.resolve();

      const queue = this.newQueue();

      this.steps[step].forEach((callback) => {
        if (typeof callback !== 'function') return;

        queue.add(() => callback());
      });

      return queue;
    };
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
