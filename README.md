# qenv
easy promised environments

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/qenv)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/qenv)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/qenv)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/qenv/)

## Status for master
[![build status](https://GitLab.com/pushrocks/qenv/badges/master/build.svg)](https://GitLab.com/pushrocks/qenv/commits/master)
[![coverage report](https://GitLab.com/pushrocks/qenv/badges/master/coverage.svg)](https://GitLab.com/pushrocks/qenv/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/qenv.svg)](https://www.npmjs.com/package/qenv)
[![Dependency Status](https://david-dm.org/pushrocks/qenv.svg)](https://david-dm.org/pushrocks/qenv)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/qenv/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/qenv/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/qenv/badges/code.svg)](https://www.bithound.io/github/pushrocks/qenv)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
Use TypeScript for best in class instellisense.

qenv works with two files:

* **qenv.yml** - specifies which ENV vars are required.
* **env.yml** - specifies all env vars that are not already set in the current environment.

Now obviously you can set build specific env vars in many CI environments.
So there we do not need an **env.yml** since all ENV vars are in place
However when on another machine you can have a env.yml that will be added to the environment by qenv.

```javascript
import {Qenv} from "qenv";

myQenv = new Qenv("path/to/dir/where/qenv.yml/is/","path/to/dir/where/env.yml/is(");

``` 

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
