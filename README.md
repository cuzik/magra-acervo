## Description

  ![Continuous Integration - API](https://github.com/cuzik/magra-acervo/workflows/Continuous%20Integration%20-%20API/badge.svg)

  Um sistema simples para organização e automação de estoque/livraria.

## Installation

```sh
$ yarn
```

## Up DB

```sh
$ yarn dev:up
```

## Running the app

```sh
# development
$ yarn start
# watch mode
$ yarn start:dev
```

## Test

```sh
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Usage

| Command | params | Description | Usage |
|---------|---|---|---|
| help | - | return a list of command and usage | /acervo help |
| list | - | return a link that contains the dashboard with a list of all book and copies | /acervo list |
| take | serial_number | registry when you take a book | /acervo take <serial_number> |
| return | serial_number | registry when you return a book | /acervo return <serial_number> |
| consult | serial_number | consult if a book is avaliable | /acervo return <serial_number> |
| add | title author [serial_number, serial_number, ...] | add a book and copies | /acervo add <title> <author> [ <list_of_serial_numbers> ] |

## Improves

- command `add` need more validation
- crate command `remove` book ou copybook
- create unit tests (?)
