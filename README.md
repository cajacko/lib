# @cajackjo/lib

Personal library for projects made by Charlie Jackson.

This is where I keep the majority of my reusable code.

## Installation and setup

If you are not going to be developing anything within this module do a `npm i -g @cajacko/lib`.

If you are going to be developing with this package as well. Which I imagine you are, as you are probably me. Then clone the repo and run `npm link` from the repo root.

Now you should be able to make use of the `lib` command to do all sorts. Run `lib --help` To see what you can do. You will probably only use it globally for `lib init`. Everything else will be done on a per repo basis.

If you are starting a new project run `yarn init`. Follow the prompts for the project you want and then you can use all the scripts within the generated package.json. If you are ammending an existing repo, then cd into it, then run `yarn init`.

## TODO

- `lib init` without a repo setup, will generate git repo, can add to github as well, will then cd into the dir for you
- `lib init` inside existing repo, will ask if can delete all and start new
- `lib init` inside existing repo with a template setup, will just replace files that need changing

init setups package.json with dependencies needed for lint/flow and tests to work - all in dev
when install new modules, they will install within the template as well (But on run)

When run
Copy dependencies to the templates package.json, install
Copy src files to the template dir
watch src files and sync new/edit and deletions to template dir
