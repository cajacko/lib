// @flow

const errors = {
  '100-001': {
    label: 'General Error',
    title: "Damn! We've had a crash.",
    message:
      "Don't worry, we've notified our rescue team that something went wrong",
  },
  '100-002': {
    label: '404',
    title: 'Where are you!',
    message: "We're not sure how you got here, but this page does not exist",
  },
  '100-003': {
    label: 'Dev Error',
    title: "Damn! We've messed up.",
    message:
      "Looks like we broke something. Don't worry, we've notified our rescue team that something went wrong",
  },
};

export default errors;
