---
id: 4
title: Refactor and Expand Phase II Constitution
stage: constitution
date: 2026-01-06
surface: agent
model: sonnet 4.5
feature: none
branch: master
user: anonymous
command: none
labels: [constitution, refactor, sdd, phase-2]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - none
---

## Prompt

Using the existing contents of `constitution.md` as the authoritative base,
refactor and expand the document into a fully structured Spec-Kit Plus
constitution WITHOUT removing or weakening any existing rules.

Instructions:
- Preserve all existing principles, wording, and intent.
- Do NOT remove any existing sections.
- Only ADD missing structural sections required for a complete constitution.
- Maintain professional, authoritative tone.
- Output ONLY the final Markdown content of `constitution.md`.

Add and integrate the following sections in logical positions:

## Project Purpose
## Scope of Phase II
## Specification Rules
## API Design Rules
## Database Integrity Rules
## Frontend Development Rules
## Backend Development Rules
## Security & Authentication Rules
## Testing & Validation Standards
## Documentation Standards
## Non-Goals
## Success Criteria
## Enforcement & Compliance

Requirements:
- All rules must be enforceable and unambiguous.
- Clearly state that:
  - No code may be written before specs are approved
  - All API routes require JWT authentication
  - User data isolation is enforced at query level
  - Integration testing is mandatory before feature approval
- Ensure consistency with:
  - Next.js (App Router)
  - FastAPI + SQLModel
  - Neon PostgreSQL
  - Better Auth (JWT)

Do NOT generate agents or skills.
Do NOT ask questions.
Proceed to output the complete revised `constitution.md`.

## Response snapshot

The `constitution.md` file has been refactored to include the requested structural sections while preserving all existing core principles and wording. The document now comprehensively covers project purpose, scope, technical rules for frontend/backend/database/security, testing standards, and enforcement mechanisms, aligned with the specified tech stack (Next.js, FastAPI, SQLModel, Neon, Better Auth).

## Outcome

- ✅ Impact: Established a robust, multi-layer governing framework for Phase II development.
- 🧪 Tests: none
- 📁 Files: Updated `.specify/memory/constitution.md`
- 🔁 Next prompts: Continue with feature specification
- 🧠 Reflection: The expansion provides much-needed granularity for technical enforcement while maintaining the high-level principles.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
