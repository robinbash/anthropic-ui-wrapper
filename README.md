# anthropic-ui-wrapper

Small Chat-GPT like ui clone to drop and use LLM APIs with

## Setup

```bash
# create a new project in the current directory
npm npm install -g firebase-tools
npm install
```

## Local Dev

create .env with values from firebase project.
create service account in firebase project settings and paste json to FIREBASE_SERVICE_ACCOUNT env var.

```bash
npm run emulators
npm run dev
```

## Deploy

Test prodution build

```bash
npm run build
npm run preview
```

Vercel:
Link your forked repo on your Vercel account and set variables from .env
