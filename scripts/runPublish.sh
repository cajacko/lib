set -e
cd /App

yarn install --network-concurrency 1
npx lerna publish from-git --yes
