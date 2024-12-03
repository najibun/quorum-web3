# Gunakan Node.js sebagai base image
FROM node:18-alpine

# Set work directory
WORKDIR /app

# Copy package.json dan package-lock.json
COPY package*.json ./

# Install dependencies (termasuk Web3)
RUN npm install

# Copy semua file ke container
COPY . .

# Expose port aplikasi
EXPOSE 4000

# Jalankan aplikasi
CMD ["npm", "start"]

