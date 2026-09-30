# velar.one

Blog post automations — tooling and workflows for planning, generating, and publishing blog posts.

## Status

Early setup. The repository structure, stack, and first automations are still being decided.

## Repository layout

```
.
├── README.md        # this file
├── .gitignore       # ignores dependencies, build output, secrets, OS files
├── .gitattributes   # consistent line endings
├── .editorconfig    # shared editor settings
└── .env.example     # template for local environment variables (no real values)
```

## Getting started

```bash
git clone https://github.com/millaelena/velar.one.git
cd velar.one
cp .env.example .env   # then fill in your own values locally
```

## Secrets

This repository is **public**. Never commit API keys, tokens, or passwords.
Put them in `.env` (ignored by git) and document the variable names in `.env.example`.

## Branches

- `main` — default branch, always in a working state.
- Feature work goes in short-lived branches (e.g. `feature/<name>`) merged into `main` via pull request.
