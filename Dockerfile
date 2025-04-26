# syntax=docker/dockerfile:1.4

# Step 1: Use Node.js 20 base image
FROM node:23-alpine3.20 AS base
RUN npm install -g npm@11.3.0

# Set working directory
WORKDIR /app

ARG SOFTCAN_GITHUB_OWNER
ARG SOFTCAN_GITHUB_REPO
ARG SOFTCAN_GITHUB_BRANCH
ARG COSMOS_ENDPOINT

ENV SOFTCAN_GITHUB_OWNER=$SOFTCAN_GITHUB_OWNER \
  SOFTCAN_GITHUB_REPO=$SOFTCAN_GITHUB_REPO \
  SOFTCAN_GITHUB_BRANCH=$SOFTCAN_GITHUB_BRANCH \
  COSMOS_ENDPOINT=$COSMOS_ENDPOINT

# Copy package files (corrected file pattern)
COPY package.json package-lock*.json ./

# Install dependencies with caching (removed node_modules cache mount)
RUN --mount=type=cache,target=/root/.npm \
  npm ci

# Copy the rest of the application files
COPY . .

# Set secrets and build the application
RUN --mount=type=secret,id=SOFTCAN_GITHUB_PAT \
  --mount=type=secret,id=COSMOS_KEY \
  export SOFTCAN_GITHUB_PAT=$(cat /run/secrets/SOFTCAN_GITHUB_PAT) && \
  export COSMOS_KEY=$(cat /run/secrets/COSMOS_KEY) && \
  npm run build -- --no-lint

# Step 2: Serve the application
FROM node:23-alpine3.20 AS runner

# Set environment variables for production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Copy only production dependencies
COPY --from=base /app/node_modules ./node_modules
# Copy the build output
COPY --from=base /app/.next ./.next
# Copy other required files
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/public ./public

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]