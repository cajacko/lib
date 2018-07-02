const Utils = require('./Utils');

class Runner extends Utils {
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
      });
    }

    if (this.init) this.init();
  }

  run() {
    const queue = this.newQueue();

    this.stepsOrder.forEach(step => queue.add(this.runStep(step)));

    return queue;
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

    return this.setSteps(step, funcs);
  }

  setSteps(step, funcs) {
    if (!this.steps[step]) this.steps[step] = [];

    if (Array.isArray(funcs)) {
      this.steps[step] = this.steps[step].concat(funcs);
    } else {
      this.steps[step].push(funcs);
    }
  }
}

module.exports = Runner;
