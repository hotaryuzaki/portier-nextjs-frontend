FROM node:18

# Install yarn
RUN corepack enable

WORKDIR /app

COPY . .

# Install dependencies
RUN yarn install

CMD ["yarn", "dev"]
