<div align="center">

# nexo-pro

:point_right: Unofficial Node.js connector for the Nexo Pro APIs, with TypeScript & browser support. :point_left:

[![Percentage of issues still open](http://isitmaintained.com/badge/open/aussedatlo/nexo-pro.svg)](http://isitmaintained.com/project/aussedatlo/nexo-pro 'Percentage of issues still open')
[![GitHub license](https://img.shields.io/github/license/aussedatlo/nexo-pro.svg)](https://github.com/aussedatlo/nexo-pro/blob/master/LICENSE.md)
[![npm version](https://img.shields.io/npm/v/nexo-pro)][1]
[![npm size](https://img.shields.io/bundlephobia/min/nexo-pro/latest)][1]
[![npm downloads](https://img.shields.io/npm/dt/nexo-pro)][1]
[![GitHub contributors](https://img.shields.io/github/contributors/aussedatlo/nexo-pro.svg)](https://GitHub.com/aussedatlo/nexo-pro/graphs/contributors/)
[![last commit](https://img.shields.io/github/last-commit/aussedatlo/nexo-pro)][1]
[![CodeFactor](https://www.codefactor.io/repository/github/aussedatlo/nexo-pro/badge)](https://www.codefactor.io/repository/github/aussedatlo/nexo-pro)

[1]: https://www.npmjs.com/package/nexo-pro

</div>

<div align="center">

[Report Bug](https://github.com/aussedatlo/nexo-pro/issues) · [Request Feature](https://github.com/aussedatlo/nexo-pro/issues)

</div>

## :wrench: Installation

```shell
yarn add nexo-pro
```

## :plunger: Examples

copy the `.env.template` file in `.env` and fills the variables.

run an example using `ts-node`:

```shell
ts-node examples/client.ts
```

## :open_book: Documentation

Check out the Nexo Pro API Documentation

- [Nexo Pro API Documentation](https://pro.nexo.io/api-doc-pro)

Create API credential at Nexo Pro API Management

- [Nexo Pro API Management](https://pro.nexo.io/api-management)

## :label: REST API Client

```typescript
import { Client } from 'nexo-pro';

const client = new Client({
  api_key: key,
  api_secret: secret,
});

const accountSummary = await client.getAccountSummary();
console.log(accountSummary);
```

## :test_tube: Tests

copy the `.env.template` file in `.env` and fills the variables.

run all the tests:

```shell
yarn test
```

## :package: Browser Usage

Build a bundle using webpack:

```shell
yarn install
yarn build
yarn pack
```

The bundle can be found in `./`.

---

## :wave: Contributions & Pull Requests

Contributions are encouraged, I will review any incoming pull requests.
Be sur to run `yarn test` to run all tests and `yarn prettier` to run the prettier.

## :warning: Disclamer

This is an unofficial NodeJS wrapper for the Nexo Pro exchange REST API v1. I am in no way affiliated with Nexo, use at your own risk.
