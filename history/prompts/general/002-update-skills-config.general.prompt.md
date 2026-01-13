---
id: 002
title: Update skills.md with agent skill definitions
stage: general
date: 2026-01-05
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: unknown
command: Update skills.md with agent skill definitions
labels: [setup,skills,agents]
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

skills:
  ProductSpecAgent:
    - Requirement analysis
    - Spec-Kit Plus conventions
    - User stories and acceptance criteria
    - Markdown documentation
    - Agentic Dev Stack workflow

  BackendAPIAgent:
    - FastAPI
    - REST API design
    - SQLModel ORM
    - JWT verification
    - Dependency injection
    - HTTP status codes & error handling

  FrontendAgent:
    - Next.js 16+ App Router
    - TypeScript
    - Tailwind CSS
    - Better Auth
    - JWT token handling
    - Server vs Client components

  DatabaseAgent:
    - PostgreSQL fundamentals
    - Neon Serverless PostgreSQL
    - Relational schema design
    - Indexing and performance optimization
    - Data integrity principles

  AuthSecurityAgent:
    - Better Auth configuration
    - JWT signing, verification, and expiry
    - Secure API design
    - Authorization strategies
    - Environment variable and secret management

  IntegrationTesterAgent:
    - End-to-end testing
    - API integration testing
    - Auth flow validation
    - Test case design
    - Bug reporting and reproduction
    - Acceptance criteria verification

## Response snapshot

Updated .claude/skills/nextjs/skills.md with comprehensive agent skill definitions including:

**Agents defined:**
- ProductSpecAgent: Requirement analysis, Spec-Kit Plus conventions, user stories, acceptance criteria
- BackendAPIAgent: FastAPI, REST API, SQLModel ORM, JWT verification, dependency injection
- FrontendAgent: Next.js 16+, TypeScript, Tailwind CSS, Better Auth, JWT handling, server/client components
- DatabaseAgent: PostgreSQL, Neon Serverless, schema design, indexing, performance optimization
- AuthSecurityAgent: Better Auth configuration, JWT lifecycle, secure API design, secret management
- IntegrationTesterAgent: End-to-end testing, API integration, auth validation, acceptance criteria testing

Each agent has a detailed description of their specialization and capabilities.

## Outcome

- ✅ Impact: Defined 6 agent types with their specific skills and capabilities
- 🧪 Tests: N/A
- 📁 Files: Updated .claude/skills/nextjs/skills.md with complete skill definitions
- 🔁 Next prompts: Can now use these agents for specialized tasks
- 🧠 Reflection: Complete agent skill configuration for full-stack development workflow

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
