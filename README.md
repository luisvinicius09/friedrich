# Setup DB

### Requirements:

- Docker installed and running

Run `docker compose up -d` on the terminal

# Run unit tests

No database/docker needed

- **NPM**: npm test
- **PNPM**: pnpm test
- **YARN**: yarn test

# Setup & Run E2E tests

### Make sure that database is running on docker

- Using **NPM** (default)

  - npm run test:e2e

- Using **PNPM**

  - pnpm link ./prisma/vitest-environment-prisma
  - pnpm test:e2e

- Using **YARN**
  - **It will fail at the moment**

# Run app

- **NPM**: npm run start:dev
- **PNPM**: pnpm start:dev
- **YARN**: yarn start:dev
