// @flow

const errors = {
  1: {
    code: 1,
    label: 'General Error',
    title: "Damn! We've had a crash.",
    message:
      "Don't worry, we've notified our rescue team that something went wrong",
  },
  2: {
    code: 2,
    label: '404',
    title: 'Where are you!',
    message: "We're not sure how you got here, but this page does not exist",
  },
  3: {
    code: 3,
    label: 'Dev Error',
    title: "Damn! We've messed up.",
    message:
      "Looks like we broke something. Don't worry, we've notified our rescue team that something went wrong",
  },
};

export default errors;
