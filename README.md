# @pushrocks/qenv
easy promised environments

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/qenv)
* [gitlab.com (source)](https://gitlab.com/pushrocks/qenv)
* [github.com (source mirror)](https://github.com/pushrocks/qenv)
* [docs (typedoc)](https://pushrocks.gitlab.io/qenv/)

## Status for master
[![build status](https://gitlab.com/pushrocks/qenv/badges/master/build.svg)](https://gitlab.com/pushrocks/qenv/commits/master)
[![coverage report](https://gitlab.com/pushrocks/qenv/badges/master/coverage.svg)](https://gitlab.com/pushrocks/qenv/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/qenv.svg)](https://www.npmjs.com/package/@pushrocks/qenv)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/qenv/badge.svg)](https://snyk.io/test/npm/@pushrocks/qenv)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

qenv works with two files:

- **qenv.yml** - specifies which ENV vars are required.
- **env.yml** - specifies all env vars that are not already set in the current environment.

Now obviously you can set build specific env vars in many CI environments.
So there we do not need an **env.yml** since all ENV vars are in place
However when on another machine you can have a env.yml that will be added to the environment by qenv.

```javascript
import { Qenv } from 'qenv';

const myQenv = new Qenv('path/to/dir/where/qenv.yml/is/', 'path/to/dir/where/env.yml/is(');
```

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://maintainedby.lossless.com)
