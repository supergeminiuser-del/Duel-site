# Brainrot Duel Arena

The ultimate competitive esports platform for Roblox "Steal a Brainrot" players.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5 (Credentials)
- **AI:** OpenAI GPT-4o Vision
- **Styling:** Tailwind CSS + Framer Motion

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Database
```bash
docker-compose up -d
```

### 3. Configure Environment
```bash
cp .env.example .env
# Fill in your NEXTAUTH_SECRET and OPENAI_API_KEY
```

### 4. Run Migrations
```bash
npx prisma migrate dev --name init
```

### 5. Start the App
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
brainrot-duel-arena/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router pages & API routes
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   └── v1/
│   │   │       ├── auth/register/route.ts
│   │   │       └── duels/create/route.ts
│   │   ├── brainrots/page.tsx # Brainrot Database
│   │   ├── dashboard/page.tsx # User Dashboard
│   │   ├── duels/create/page.tsx
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx           # Home page
│   ├── lib/
│   │   ├── auth.ts            # NextAuth config
│   │   ├── prisma.ts          # Prisma client
│   │   └── utils.ts           # Utility functions
│   ├── modules/
│   │   └── ai/
│   │       └── vision.service.ts  # GPT-4o Vision AI
│   └── services/
│       └── duel.service.ts    # Duel business logic
├── .env.example
├── docker-compose.yml
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```
