# Supabase Integration Guide — Four Dee Motion Pictures HRMS

## ✅ What's Integrated

This application now has full **Supabase** integration for:

| Feature | Status | Module |
|---------|--------|--------|
| **PostgreSQL Database** | ✅ Active | `src/db/` — Drizzle ORM |
| **Supabase Auth** | 🔌 Ready | `src/lib/supabase/auth.ts` |
| **Supabase Storage** | 🔌 Ready | `src/lib/supabase/storage.ts` |
| **Supabase SSR** | 🔌 Ready | `src/lib/supabase/server.ts` |
| **Supabase Client** | 🔌 Ready | `src/lib/supabase/client.ts` |
| **Middleware Auth** | 🔌 Ready | `src/middleware.ts` |
| **Auth Context** | 🔌 Ready | `src/contexts/AuthContext.tsx` |
| **Type Safety** | 🔌 Ready | `src/lib/supabase/types.ts` |

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Create a Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Set database password & region
4. Wait for provisioning (~2 minutes)

### Step 2: Get API Keys

Go to **Project Settings → API** and copy:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`
- **Database password** → For `DATABASE_URL`

### Step 3: Update `.env` File

```bash
# Open src/lib/supabase/.env.example or the .env file

NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# For production, use Supabase PostgreSQL URL:
DATABASE_URL=postgresql://postgres.YOUR_PROJECT_ID:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres
```

> ⚠️ **Never commit your `.env` file to version control!**

---

## 🔐 Setting Up Supabase Auth

### Enable Email/Password Auth

1. Go to **Authentication → Providers**
2. Ensure **Email** provider is enabled
3. Go to **Authentication → Settings**
4. Set site URL: `https://your-domain.com`

### Create Auth Users

```bash
# Via Supabase Dashboard:
# Authentication → Users → Add User
# OR use the API:

curl -X POST https://YOUR_PROJECT.supabase.co/auth/v1/signup \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@fourdee.com",
    "password": "demo123",
    "data": {
      "full_name": "Arjun Kapoor",
      "role": "super_admin",
      "employee_id": "4DMP001"
    }
  }'
```

### Map Supabase Users to Employees

After creating a Supabase auth user, create a matching record in the `users` table:

```sql
INSERT INTO users (id, employee_id, email, password_hash, full_name, role, is_active)
VALUES (
  '<supabase_user_id>',  -- Get from Authentication → Users
  '4DMP001',
  'admin@fourdee.com',
  'supabase_managed',  -- Supabase handles password
  'Arjun Kapoor',
  'super_admin',
  true
);

INSERT INTO employees (user_id, employee_code, first_name, last_name, department, designation, email, joining_date)
VALUES (
  '<supabase_user_id>',
  '4DMP001',
  'Arjun',
  'Kapoor',
  'Production',
  'Managing Director',
  'admin@fourdee.com',
  '2022-01-15'
);
```

---

## 💾 Setting Up Supabase Storage

### Create Storage Buckets

Go to **Storage → New Bucket** and create:

| Bucket Name | Public | Purpose |
|------------|--------|---------|
| `profiles` | ✅ Yes | User profile photos |
| `assets` | ❌ No | Production media assets |
| `documents` | ❌ No | Company documents |
| `expenses` | ❌ No | Expense receipts |

### Set Row Level Security (RLS) Policies

```sql
-- Profiles bucket - anyone can read, only owner can write
CREATE POLICY "Public profiles are readable"
ON storage.objects FOR SELECT
USING (bucket_id = 'profiles');

CREATE POLICY "Users can upload own profile"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profiles' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Assets bucket - authenticated users only
CREATE POLICY "Authenticated users can read assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'assets' AND auth.role() = 'authenticated');

CREATE POLICY "Admins can upload assets"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'assets' AND auth.role() = 'authenticated'
);
```

---

## 📊 Database Migration to Supabase

### Option A: Import SQL Schema

1. Go to **SQL Editor** in Supabase
2. Run the schema from `drizzle` introspection

### Option B: Use Drizzle Push

```bash
# After setting DATABASE_URL to Supabase
npx drizzle-kit push
```

### Option C: Import from Local DB

```bash
# Export from local
pg_dump -h localhost -U postgres app_db > supabase-import.sql

# Import to Supabase
psql "postgresql://postgres.YOUR_PROJECT:PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres" < supabase-import.sql
```

---

## 🔧 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js Application                    │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────────┐ │
│  │ Client    │  │ Server   │  │  AuthContext (Client)  │ │
│  │ @supabase │  │ @supabase│  │  - signIn/signOut      │ │
│  │ /client   │  │ /server  │  │  - Session listener    │ │
│  └─────┬─────┘  └─────┬─────┘  └──────────┬───────────┘ │
│        │              │                   │              │
│  ┌─────┴──────────────┴───────────────────┴──────────┐  │
│  │                  Middleware                        │  │
│  │  - Session validation                              │  │
│  │  - Route protection                                │  │
│  │  - User headers for API routes                     │  │
│  └─────────────────────┬─────────────────────────────┘  │
│                        │                                 │
│  ┌─────────────────────┴─────────────────────────────┐  │
│  │              API Routes                            │  │
│  │  /api/auth/login  /api/auth/validate              │  │
│  │  /api/seed         /api/health                     │  │
│  └─────────────────────┬─────────────────────────────┘  │
└────────────────────────┼────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐    ┌─────▼─────┐   ┌────▼────┐
    │  Auth   │    │ PostgreSQL│   │ Storage │
    │  Users  │    │  Tables   │   │ Buckets │
    │ Sessions│    │  (23 tbl) │   │ Profiles│
    └─────────┘    └───────────┘   │ Assets  │
                                   │ Docs    │
                                   └─────────┘
```

---

## 📝 Key Files

| File | Purpose |
|------|---------|
| `src/lib/supabase/client.ts` | Browser-side Supabase client |
| `src/lib/supabase/server.ts` | Server-side Supabase client (cookies) |
| `src/lib/supabase/admin.ts` | Service role client (server only) |
| `src/lib/supabase/auth.ts` | Auth helpers (signIn, signUp, etc.) |
| `src/lib/supabase/storage.ts` | File upload helpers |
| `src/lib/supabase/types.ts` | Full database type definitions |
| `src/middleware.ts` | Next.js middleware for auth routing |
| `src/contexts/AuthContext.tsx` | React auth context provider |

---

## 🔒 Security Checklist

- [ ] Enable **Row Level Security (RLS)** on all tables
- [ ] Set up **API keys** with minimal permissions
- [ ] Use **service_role key** only on server-side (never client)
- [ ] Enable **Email Confirmation** for new users
- [ ] Set up **Rate Limiting** on auth endpoints
- [ ] Configure **Custom Claims** for role-based access
- [ ] Enable **Audit Logging** in Supabase dashboard
- [ ] Set up **Backup Schedule** for the database

---

## 🧪 Testing Checklist

After connecting Supabase:

- [ ] Login page shows connected status
- [ ] User can sign in with email/password
- [ ] Session persists on page refresh
- [ ] Profile photo uploads to Supabase Storage
- [ ] Asset uploads work for production media
- [ ] Database queries return Supabase data
- [ ] Middleware redirects unauthenticated users
- [ ] Sign out clears session properly

---

## 📞 Support

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Supabase Guide**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
- **Drizzle ORM + Supabase**: https://orm.drizzle.team/docs/guides/postgresql
