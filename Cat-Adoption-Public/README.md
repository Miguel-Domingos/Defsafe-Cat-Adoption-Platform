# User Frontend - The Defsafe Cat Adoption Platform

This is the public interface where users can view available cats for adoption and submit adoption requests.

## Main Features:

1. Available Cat Listings:

- Displays all cats that are available for adoption.
- Each cat profile includes the name, description, and image.

2. Adoption Form:

- ach cat has an "Adopt" button, redirecting the user to a form.
- Once the form is filled out, the adoption request is saved in the database for the admin’s approval.

3. Request Confirmation:

- After submitting the form, a confirmation message is displayed to the user.

## Technologies:

- Nuxt.js 3: Framework used for building the frontend.
- Tailwind CSS: Used for styling the page.
- Pinia: Used for state management.
- Zod: Used for form validation.

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Miguel-Domingos/Defsafe-Cat-Adoption-Platform.git
   cd Defsafe-Cat-Adoption-Platform/Cat-Adoption-Public/

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
