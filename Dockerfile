# FROM node:20-alpine as base
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package*.json ./
# EXPOSE 3000

# FROM base as builder
# WORKDIR /app
# COPY . .
# RUN npm run build

# # # move builds to nginx and run the front-end
# # FROM nginx:alpine
# # COPY --from=build /app/build /usr/share/nginx/html
# # RUN rm /etc/nginx/conf.d/default.conf
# # COPY ./nginx/nginx.conf /etc/nginx/conf.d
# # EXPOSE 3000
# # CMD ["nginx", "-g", "daemon off;"]


# FROM base as production
# WORKDIR /app

# ENV NODE_ENV=production
# RUN npm ci

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
# USER nextjs


# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/public ./public

# CMD npm start

# FROM base as dev
# ENV NODE_ENV=development
# RUN npm install 
# COPY . .
# CMD npm run dev

# Use an official Node.js runtime as the base image

FROM node:19.6.0-alpine
# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Build the React app
EXPOSE 3000