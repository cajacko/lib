set -e
cd /App

echo "//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN" >> .npmrc
yarn install --network-concurrency 1
npx lerna publish from-package --yes
