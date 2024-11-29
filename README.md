## Installation

```bash
# Create .env.local file with required environment variables

# Install packages
npm i
```

### Testing Locally

```bash
# Serve over HTTP
npm run dev

# Serve over HTTPS (optional)
next dev --experimental-https 
```

### Notes

Supabase

* When the domain changes, the callback URL must be updated in Supabase. Go to `Project / Authentication / URL Configuration` and set the new callback url under `Redirect URLs`. Make sure to include a wildcard `*` symbol at the end of the url because Google OAuth will return with query parameters.

### Contributors

[Michael Ren](https://github.com/micha31r), [Paul Su](https://github.com/psuuzu), [Kaylyn Thomson](https://github.com/kaylynthomson), [Ritu Devnani](https://github.com/Ritu-GD), [Arja Das](https://github.com/arjadas)