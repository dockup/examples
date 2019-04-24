Static sites
============

## Usage

Copy the following into your project:

1. ./Dockerfile
2. ./dockup

## How it works

The Dockerfile in this example does the following:

1. Compile the static site using `npm run build`.
2. Copy `/dist` over to an nginx image
3. Replaces "https://api.myapp.com" in JS files inside `/dist` directory with a dynamic value (See below).
4. Start the nginx container

## Replacing static URLs with dynamic Dockup URLs
If your JS bundle is created with a static backend API URL, say "https://api.myapp.com",
you'll need to replace that with dynamic Dockup URLs because each Dockup deployment
gets its own backend API service running on a different hostname. To do this,
set the following environment variables in the frontend container by editing your
blueprint in Dockup:

```
BACKEND_API_URL=https://api.myapp.com
DOCKUP_API_URL=${DOCKUP_PORT_ENDPOINT_backend_3000}
```

This replaces `https://api.myapp.com` with a URL that points to port 3000 running
on "backend" container. 3000 should be a public port on this container.
