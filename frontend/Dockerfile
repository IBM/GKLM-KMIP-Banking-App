# Use the official Node.js image
FROM node:20-slim AS base

# Set the working directory in the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the package files to leverage Docker caching
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code, excluding node_modules
COPY . .

# Build the Next.js app
RUN pnpm run build

# Expose the frontend port
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "run", "dev"]