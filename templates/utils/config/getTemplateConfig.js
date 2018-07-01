const webQuestions = require('./questions/web');

const getTemplateConfig = (template) => {
  if (!template) return Promise.resolve({});

  switch (template) {
    case 'Website':
      return webQuestions();
    default:
      return Promise.resolve({});
  }
};

module.exports = getTemplateConfig;
