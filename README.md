## Description

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
| take | serial_number | registry when you take a book | /acervo take <serial_number> |
| return | serial_number | registry when you return a book | /acervo return <serial_number> |
| consult | serial_number | consult if a book is avaliable | /acervo return <serial_number> |
