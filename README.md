<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# nestjs-api-tutorial
```bash
$ npm i -g @nestjs/cli

$ nest new project-name
```
## 1. Module
```bash
$ nest g module [name]
```
## 2. Controller, Service
```bash
$ nest g controller [name]

$ nest g service [name]
```
## 3. Docker
### 3.1
```bash
$ docker ps

$ docker --version
```
### 3.2
`docker-compose.yml`
```bash
version: '3.9'
services:
  dev-db:
    image: postgres:15
    ports:
      - 5434:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    networks:
      - freecodecamp
networks:
  freecodecamp:
```
with service have name: dev-db
```bash
$ docker compose up dev-db -d

$ docker ps

$ docker logs [container_id]
```
## 4. Prisma
### 4.1. Set up
```bash
$ yarn add -D prisma

$ yarn add @prisma/client
```
### 4.2
```bash
$ npx prisma init
```
### 4.3: Change `.env` and `schema.prisma`
`.env`
```bash
DATABASE_URL="postgresql://postgres:123@localhost:5434/nest?schema=public"
```
### 4.4: Prisma Migrations
```bash
$ npx prisma --help

$ npx prisma migrate dev

$ npx prisma generate

$ npx prisma studio
```
### 4.5: Prisma Module
```bash
$ nest g module prisma

$ nest g service prisma --no-spec
```
`prisma.service.ts`
```bash
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient{
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:123@localhost:5434/nest?schema=public'
                }
            }
        })
    }
}
```
`prisma.module.ts`
```bash
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
```
## 5. Using Auth Dto
## 6. Pipes
### 6.1
```bash
$ yarn add class-validator class-transformer
```
`auth.dto.ts`
```bash
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
```
### 6.2: NestJs Global Pipe
`main.ts`
```bash
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  await app.listen(3333);
}
bootstrap();

```
## 7. Sign up logic
### 7.1
```bash
$ yarn add argon2
```
change `auth.service.ts`
### 7.2 Update Prisma Migrations
```bash
$ npx prisma migrate dev
```
## 8. Sign in logic
## 9. Automate postgres restart & prisma migrations
`package.json`
```bash
 "scripts": {
    "prisma:dev:deploy": "prisma migrate deploy",
    "db:dev:rm": "docker compose rm dev-db -s -f -v",
    "db:dev:up": "docker compose up dev-db -d",
    "db:dev:restart": "yarn db:dev:rm & yarn db:dev:up & sleep 1 & yarn prisma:dev:deploy",
    ...
  }
```
## 10. NestJs Config Module
```bash
$ yarn add @nestjs/config
```
## 11. Using passport js & jwt module with nestJs
```bash
$ yarn add @nestjs/passport passport

$ yarn add @nestjs/jwt passport-jwt

$ yarn add -D @types/passport-jwt
```
## 12. Get current user with access token, Guards

## 13. Custom param decorator

## 14. E2E TESTS with pactum js, Using dotenv cli with prisma
### 14.1
```bash
$ yarn add -D pactum

$ yarn add -D dotenv-cli
```
### 14.2
`docker-compose.yml`
```bash
version: '3.9'
services:
  dev-db:
    image: postgres:15
    ports:
      - 5434:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    networks:
      - freecodecamp
  test-db:
    image: postgres:15
    ports:
      - 5435:5432
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 123
      POSTGRES_DB: nest
    networks:
      - freecodecamp
networks:
  freecodecamp:
```
### 14.3 Create file 
`.env.test`
```bash
DATABASE_URL="postgresql://postgres:123@localhost:5435/nest?schema=public"
JWT_SECRET='super-secret'
```
### 14.4
`package.json`
```bash
  "scripts": {
    "test:e2e": "dotenv -e .env.test -- jest --watch --no-cache --config ./test/jest-e2e.json"

    "prisma:test:deploy": "dotenv -e .env.test -- prisma migrate deploy",
    "db:test:rm": "docker compose rm test-db -s -f -v",
    "db:test:up": "docker compose up test-db -d",
    "db:test:restart": "yarn db:test:rm & yarn db:test:up & sleep 1 & yarn prisma:test:deploy",
    ...
  }
```
## 15. Prisma database teardown logic
### 15.1
`prisma.service.ts`
```bash
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('DATABASE_URL'),
                },
            },
        });
    }
    cleanDB() {
        return this.$transaction([
            this.bookmark.deleteMany(),
            this.user.deleteMany()
        ]);
    }
}
```
### 15.2 : Write `app.e2e-spec.ts`

## 16. Auth e2e tests

## 17. User e2e tests