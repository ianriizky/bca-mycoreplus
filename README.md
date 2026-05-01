# BCA MyCore+

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)
[![Release](https://badgen.net/github/release/ianriizky/bca-mycoreplus 'Release')](https://github.com/ianriizky/bca-mycoreplus/releases)
[![Pipeline Status](https://github.com/ianriizky/bca-mycoreplus/actions/workflows/ci-cd.yml/badge.svg 'Pipeline Status')](https://github.com/ianriizky/bca-mycoreplus/actions/workflows/ci-cd.yml)
[![Codecov Coverage](https://codecov.io/github/ianriizky/bca-mycoreplus/graph/badge.svg?token=KI8KPL8FX9)](https://codecov.io/github/ianriizky/bca-mycoreplus)

## Table of contents

- [BCA MyCore+](#bca-mycore)
  - [Table of contents](#table-of-contents)
  - [Description](#description)
  - [Requirements](#requirements)
  - [Tech stack](#tech-stack)
  - [Project setup](#project-setup)
  - [Run test](#run-test)
  - [Author](#author)
  - [Changelog](#changelog)
  - [License](#license)

## Description

Web application for BCA MyCore+.

## Requirements

- [![Bun](https://img.shields.io/badge/Bun%201.3.13-000000?logo=bun&logoColor=white 'Bun')](https://bun.sh)

## Tech stack

- [![TypeScript](https://img.shields.io/badge/TypeScript%206.0.3-007ACC?logo=typescript&logoColor=white 'TypeScript')](https://www.typescriptlang.org)
- [![React](https://img.shields.io/badge/React%2019.2.5-61DAFB?logo=react&logoColor=white 'React')](https://react.dev)
- [![Vite](https://img.shields.io/badge/Vite%208.0.10-646CFF?logo=vite&logoColor=white 'Vite')](https://vite.dev)
- [![TailwindCSS](https://img.shields.io/badge/TailwindCSS%204.2.4-06B6D4?logo=tailwindcss&logoColor=white 'TailwindCSS')](https://tailwindcss.com)

## Project setup

> It is expected that you already have all required tools at [Requirements](#requirements) section installed on your local machine.

1. Clone the repository

   ```bash
   $ git clone https://github.com/ianriizky/bca-mycoreplus.git
   ```

2. Install dependencies

   ```bash
   $ bun install
   ```

3. Run the project

   ```bash
   $ bun --bun run start:dev
   ```

> Use `bun --bun run <command>` to force using Bun runtime when running commands. Read [Bun documentation](https://bun.sh/docs/runtime#bun) for more information.

## Run test

```bash
$ bun run test
$ bun run test:cov
$ bun run test:int:show-report # show internal test results in browser
```

## Author

- [Septianata Rizky Pratama](https://github.com/ianriizky)

## Changelog

You can read the changelog [here](CHANGELOG.md).

## License

You can read the license [here](LICENSE.md).
