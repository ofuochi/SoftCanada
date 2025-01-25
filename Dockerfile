# Step 1: Use Node.js 20 base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lpine*.json ./

# Install dependencies with caching
RUN --mount=type=cache,target=/root/.npm \
  --mount=type=cache,target=/app/node_modules,id=node_modules \
  npm ci --prefer-offline

# Copy the rest of the application files
COPY . .

# Build the application with cache
RUN --mount=type=cache,target=/app/.next,id=next_cache \
  npm run build

# Step 2: Serve the application
FROM node:20-alpine AS runner

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

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]