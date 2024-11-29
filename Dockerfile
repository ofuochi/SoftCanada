# Step 1: Use Node.js 20 base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

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
