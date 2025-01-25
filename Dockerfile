# Step 1: Use Node.js 20 base image
FROM node:20-alpine AS base
RUN npm install -g npm@11.0.0

# Set working directory
WORKDIR /app

# Copy package files (corrected file pattern)
COPY package.json package-lock*.json ./

# Install dependencies with caching (removed node_modules cache mount)
RUN --mount=type=cache,target=/root/.npm \
  npm ci

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build -- --no-lint

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

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]