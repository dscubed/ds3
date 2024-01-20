## Local Development

Set all required environment variables in `.env.local`. Open `.env.example` to see different fields. 

    cd ds3
    npm i
    # Serve over http
    npm run dev
    # Serve over https
    next dev --experimental-https 

Please commit all changes in to `dev` or other development branches. Do not make commit changes directly into `main`.

## Vercel

Vercel is triggered whenever a new commit is made. The `main` branch is the production codebase. Please be careful and perform thorough testing before merging new changes to `main`. Other branches such as `dev` are preview branches. Live previews are password protected and can be used to test features in a live environment.

## Supabase

When the domain changes, the callback URL must be updated in Supabase. Go to Project / Authentication / URL Configuration and set the new callback url under **Redirect URLs**. Make sure to include a wildcard **\*** symbol at the end of the url because Google OAuth will return with query parameters.

## Auth

Authentication settings are set in Google Search Console. It does not need to be updated when the domain changes.

## SEO

Base metadata are set in the root `layout.tsx`. Custom/page-specific metadata can be added in the `page.tsx` of that page.

To check if metadata has been set been set correctly, use https://metatags.io/, https://www.opengraph.xyz/ or similar third party platforms.

## Domain

## Contributing

Please add every person who has contributed in this project in `public/humans.txt`.

Made with ❤ by a dedicated team in Melbourne.

> Written with [StackEdit](https://stackedit.io/).