module.exports = (template) => {
  switch (template) {
    case 'website':
      return 'web';

    default:
      throw new Error(`Given template does not exist in @cajacko/lib: ${String(template)}`);
  }
};
