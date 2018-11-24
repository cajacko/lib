const { AfterAll, BeforeAll, setDefaultTimeout } = require('cucumber');
const docker = require('./constants/docker');

setDefaultTimeout(60 * 1000);

BeforeAll({ timeout: 60 * 1000 }, () =>
  docker
    .stop()
    .then(docker.cleanImages)
    .then(docker.start));

AfterAll({ timeout: 60 * 1000 }, () => docker.stop().then(docker.cleanImages));
