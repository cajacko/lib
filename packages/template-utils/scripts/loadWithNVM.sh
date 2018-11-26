#!/bin/bash

# Sometimes the way we use nvm, it complains about this being set
unset PREFIX

if [ -d "$NVM_DIR" ]
then
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  nvm install $1
fi

echo "${@:2}"

${@:2}
