FROM node
WORKDIR /app

COPY package.json .
RUN ["npm", "install"]

COPY . .

RUN ["npx", "prisma", "migrate", "dev"]
RUN ["npx", "prisma", "db", "seed"]

CMD ["npm", "run", "start:dev"]