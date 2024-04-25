#!/bin/bash

# Check if seed flag file exists
if [ -f "./seed.flag" ]; then
    npm start
    echo "Seeding has already been completed. Skipping..."
else
    npx prisma migrate reset
    # Run Prisma schema generation
    npm run prisma:generate

    # Run Prisma database migration
    npx prisma migrate dev

    # Run database seeding
    npm run seed

    # Create seed flag file to indicate completion
    touch "./seed.flag"

    # Start the application
    npm start
fi
