---
id: 001
title: Create NextJS skills folder structure
stage: general
date: 2026-01-05
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: unknown
command: create a skills folder in .claude and inside the folder create nextjs folder and inside the nextjs folder create skills.md and written a prompt
labels: [setup,folders,skills]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .claude/skills/nextjs/skills.md
tests:
 -
---

## Prompt

create a skills folder in .claude and inside the folder create nextjs folder and inside the nextjs folder create skills.md and written a prompt

## Response snapshot

Created the skills folder structure:
```
.claude/
└── skills/
    └── nextjs/
        └── skills.md
```

The `skills.md` file contains:
- Description of the skills directory purpose
- Instructions for creating new skills
- A template example for a NextJS page creation skill

You can now add specific NextJS skill definitions as separate `.md` files in the `.claude/skills/nextjs/` directory.

## Outcome

- ✅ Impact: Created skills folder structure for NextJS skill definitions
- 🧪 Tests: N/A
- 📁 Files: Created .claude/skills/nextjs/skills.md with template and documentation
- 🔁 Next prompts: Can add specific NextJS skill definitions
- 🧠 Reflection: Simple folder structure setup complete

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
