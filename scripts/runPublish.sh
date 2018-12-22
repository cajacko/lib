set -e
cd /App

yarn install
npx lerna publish from-git --yes
