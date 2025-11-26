FROM node:22
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
expose 5173
CMD ["npm", "run", "dev", "--", "--host"]