#!/bin/bash

echo "HERE"
echo "${@:2}"

if [ -d "$NVM_DIR" ]
then
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  nvm install $1
  nvm use $1
fi

echo "${@:2}"

${@:2}
