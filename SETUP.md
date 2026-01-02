# Reputation System Setup Guide

## Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install prisma @prisma/client
npm install -D prisma
```

### 2. Set Up Database

#### Option A: PostgreSQL (Recommended for Production)
```bash
# Install PostgreSQL (if not installed)
# macOS
brew install postgresql

# Ubuntu/Debian
sudo apt-get install postgresql

# Start PostgreSQL
brew services start postgresql  # macOS
sudo service postgresql start   # Linux

# Create database
createdb ratemybuild

# Set environment variable
echo 'DATABASE_URL="postgresql://localhost:5432/ratemybuild"' > .env
```

#### Option B: SQLite (Quick Development)
```bash
# Just set the environment variable
echo 'DATABASE_URL="file:./dev.db"' > .env
```

For SQLite, update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "sqlite"  // Change from "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Generate Prisma Client & Push Schema
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push
```

### 4. Verify Setup
```bash
# Open Prisma Studio to view database
npx prisma studio

# Should open http://localhost:5555
# You'll see: User, Reputation, Session, etc. tables
```

### 5. Test the System

Create a test file: `test-reputation.ts`
```typescript
import { ReputationCalculator } from './src/lib/reputation/calculator';
import { SessionTracker } from './src/lib/reputation/session-tracker';

async function test() {
  // Initialize a user's reputation
  const userId = 'test-user-123';
  const reputation = await ReputationCalculator.initializeUserReputation(userId);
  console.log('Initial reputation:', reputation);

  // Get reputation display
  const display = await ReputationCalculator.getUserReputationDisplay(userId);
  console.log('Display:', display);
}

test();
```

Run:
```bash
npx tsx test-reputation.ts
```

### 6. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

The navigation should show the reputation component (loading state initially, then actual data when user logs in).

## Detailed Setup

### Database Migration Strategy

#### Development
```bash
# Make schema changes in prisma/schema.prisma
# Then push to dev database
npx prisma db push
```

#### Production
```bash
# Create migration files
npx prisma migrate dev --name add_reputation_system

# Apply to production
npx prisma migrate deploy
```

### Seeding Test Data

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';
import { ReputationCalculator } from '../src/lib/reputation/calculator';

const prisma = new PrismaClient();

async function main() {
  // Create test users with reputation
  const users = [
    { id: 'user-1', username: 'ProGamer123', discordId: '123' },
    { id: 'user-2', username: 'CasualPlayer', discordId: '456' },
    { id: 'user-3', username: 'TryHard999', discordId: '789' },
  ];

  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData,
    });

    await ReputationCalculator.initializeUserReputation(user.id);
  }

  console.log('Seeded 3 users with reputation!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:
```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Run:
```bash
npm install -D tsx
npx prisma db seed
```

### Environment Variables

Copy example:
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://localhost:5432/ratemybuild"
```

### Troubleshooting

#### "Prisma Client not initialized"
```bash
npx prisma generate
```

#### "Database does not exist"
```bash
# PostgreSQL
createdb ratemybuild

# Or push will create it
npx prisma db push
```

#### "Module not found: @/lib/reputation/calculator"
Check `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### "Cannot connect to database"
```bash
# Check PostgreSQL is running
pg_isready

# Check DATABASE_URL in .env
cat .env
```

#### Reset Database (Careful!)
```bash
npx prisma migrate reset
```

## Production Deployment

### Vercel + Postgres

1. **Install Vercel Postgres**
```bash
vercel env add DATABASE_URL
# Enter your Postgres connection string
```

2. **Deploy**
```bash
vercel deploy
```

3. **Run migrations**
```bash
vercel env pull .env.production
npx prisma migrate deploy
```

### Railway

1. **Add PostgreSQL plugin**
2. **Copy DATABASE_URL** from Railway dashboard
3. **Set environment variable** in Railway
4. **Deploy** - migrations run automatically

### Docker

Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: ratemybuild
      POSTGRES_PASSWORD: password
      POSTGRES_DB: ratemybuild
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data

  app:
    build: .
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://ratemybuild:password@postgres:5432/ratemybuild
    ports:
      - "3000:3000"

volumes:
  postgres-data:
```

Run:
```bash
docker-compose up
```

## Next Steps

1. ✅ Database setup complete
2. ✅ Reputation system installed
3. 🔲 Add Discord OAuth authentication
4. 🔲 Create session management UI
5. 🔲 Build LFG board with reputation filters
6. 🔲 Add moderation dashboard
7. 🔲 Implement automated tests

See `REPUTATION_SYSTEM.md` for full documentation.
