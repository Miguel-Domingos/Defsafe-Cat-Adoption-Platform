# Admin Panel - The Defsafe Cat Adoption Platform

The admin panel allows an authenticated user to perform management operations on cat profiles, such as adding, editing, and deleting profiles.

## Main Features:

1. Admin Login:

- Authentication system using Supabase.
  Restricted access to admin functionalities after login.

2. Cat CRUD Operations:

- Create: Add new cat profiles with name, description, and image (either URL or upload).
- Read: List all registered cats on the platform.
- Update: Edit information for existing cat profiles.
- Delete: Remove cat profiles from the database.

## Technologies:

- Nuxt.js 3 Server Functions: Used for API operations and backend logic.
- Prisma ORM: Used to manage the database.
- Supabase: Used for authentication and database management.

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Miguel-Domingos/Defsafe-Cat-Adoption-Platform.git
   cd Defsafe-Cat-Adoption-Platform/Cat-Adoption-Admin/

   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Environment Variables Configuration (.env)

### 1. Create the .env file

Rename the `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 2. Add the following environment variables to the .env file:

```env
SUPABASE_URL="<SUPABASE_URL>"
SUPABASE_KEY="<SUPABASE_KEY>"
DIRECT_URL = "<DIRECT_URL>"
DATABASE_URL = "<DATABASE_URL>"

```

**example**: SUPABASE_URL= "https://my-supabase.co"

## Start the Development Server

```bash
npm run dev
```

## Important

Before running the server, make sure your prisma is well configured
If no, you can check the [Documentation](https://www.prisma.io/docs/getting-started)
