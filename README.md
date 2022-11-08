# Teletalk messenger (server)

<!-- [![CI](https://github.com/S-STALWART-S/teletalk-server/actions/workflows/ci.yml/badge.svg)](https://github.com/S-STALWART-S/teletalk-server/actions/workflows/ci.yml) -->

![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/s-stalwart-s/teletalk-server/Teletalk%20Server%20CI/teletalk-server-main?label=CI)
![Test](test/badge.svg)
![Codecov branch](https://img.shields.io/codecov/c/github/s-stalwart-s/teletalk-server/teletalk-server-main?label=Coverage)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/s-stalwart-s/teletalk-server/Teletalk%20Server%20Build/teletalk-server-main?label=Build)
[![Known Vulnerabilities](https://snyk.io/test/github/s-stalwart-s/teletalk-server/badge.svg)](https://snyk.io/test/github/s-stalwart-s/teletalk-server)
![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/s-stalwart-s/teletalk-server/Teletalk%20Server%20Code%20Style/teletalk-server-main?label=Code%20style)
![GitHub](https://img.shields.io/github/license/s-stalwart-s/teletalk-server?label=License)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/S-STALWART-S/teletalk-server/teletalk-server-main?label=Version)

<!-- [![GitHub Super-Linter](https://github.com/<OWNER>/<REPOSITORY>/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter) -->

### Technical details

The app is based on the ExpressJS NodeJS framework.

### Running locally

1. **Install node.js & npm.**
   Probably, you should use [nvm](https://github.com/nvm-sh/nvm).

2. **Install dependencies:**

```bash
npm install
```

or

```bash
yarn install
```

3. **Set environments**
   All required environments for run dev|test server existed on environments folder.

**Run app in development mode:**

```bash
npm run start:dev
```

**Run tests:**

```bash
npm run test:dev
```

**Run in production mode:**

1. **Setup sms provider:**
   A sms provider needed for send verification code to clients. Buy for your own and set the settings and stuffs on SmsClient class (located in /src/classes). The functionality of SmsClient is up to you and your provider. Im working on it to replace this requirement with free version and also adding verification system with email.
2. **Setup .env file.**
   Create production.env on environments folder at root of project. Setup this environments:

- JWT_MAIN_SECRET for jwt main secret
- JWT_SIGN_IN_SECRET for verification secret
- MONGO_URL_PRODUCTION for your database (mongoDB) address

3. Build production app:

```bash
npm run build
```

4. Start app:

```bash
npm start:production
```
