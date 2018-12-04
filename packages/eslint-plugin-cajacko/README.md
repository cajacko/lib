# eslint-plugin-cajacko

Personal eslint rules for Charlie Jackson

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-cajacko`:

```
$ npm install eslint-plugin-cajacko --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-cajacko` globally.

## Usage

Add `cajacko` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "cajacko"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "cajacko/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





