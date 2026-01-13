---
id: 003
title: Ratify Phase II Full-Stack Constitution v1.0.0
stage: constitution
date: 2026-01-05
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: unknown
command: sp.constitution
labels: [constitution, SDD, architecture, governance]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
tests:
 - null
---

## Prompt

sp.constitution

You are operating under a Spec-Kit Plus workflow for a Phase II full-stack Todo application.
This constitution defines the non-negotiable principles, constraints, and quality standards
that all agents must follow throughout planning, specification, and execution.

PROJECT PURPOSE
The goal of Phase II is to evolve a previously completed CLI-based Todo application
into a secure, production-ready full-stack web application suitable for hackathon evaluation.
The system must support multiple users, persistent storage, authentication, and clean architecture.

CORE PRINCIPLES
- Specification-first development: no implementation without an approved spec.
- Separation of concerns: frontend, backend, database, and auth must remain decoupled.
- User data isolation is mandatory and must never be violated.
- Security over convenience: authentication and authorization are required everywhere.
- Clarity over cleverness: readable, maintainable, and well-documented design.

ARCHITECTURAL CONSTRAINTS
- Frontend must use Next.js (App Router) with TypeScript.
- Backend must use FastAPI with SQLModel.
- Database must be PostgreSQL (Neon Serverless).
- Authentication must be JWT-based using Better Auth.
- All API access must require authentication unless explicitly documented otherwise.

AGENT GOVERNANCE
- ProductSpecAgent is the single source of truth for requirements and acceptance criteria.
- BackendAPIAgent may not define UI behavior.
- FrontendAgent may not redefine backend contracts.
- DatabaseAgent controls schema integrity and relationships.
- AuthSecurityAgent has final authority on auth and security decisions.
- IntegrationTesterAgent validates end-to-end behavior and blocks approval if acceptance criteria fail.

SPECIFICATION RULES
- All features must include:
  - Clear description
  - User stories
  - Acceptance criteria
  - Error and edge-case handling
- API specifications must include:
  - Endpoint paths
  - HTTP methods
  - Auth requirements
  - Request/response schemas
- Database specs must define ownership and relations explicitly.

QUALITY & VALIDATION STANDARDS
- Every feature must be testable end-to-end.
- JWT tokens must be validated on every protected request.
- Users must never be able to access another user’s tasks.
- Failure states must be documented (auth failure, validation errors, empty states).

TESTING & ACCEPTANCE
- IntegrationTesterAgent validates:
  - Frontend ↔ Backend ↔ Database integration
  - Authentication flow correctness
  - Authorization enforcement
  - Data persistence and isolation
- No feature is considered complete until it passes integration validation.

DOCUMENTATION STANDARDS
- All documentation must be written in clear, concise Markdown.
- Specs must be structured and easy to audit.
- Decisions and tradeoffs must be explicitly documented.
- Assumptions must be stated clearly.

NON-GOALS
- No premature optimization.
- No undocumented shortcuts.
- No UI-only features without backend validation.
- No hardcoded secrets or credentials.

SUCCESS CRITERIA
Phase II is considered successful when:
- The app supports authenticated multi-user task management.
- All core CRUD flows work end-to-end.
- Specs, architecture, and implementation align cleanly.
- The project is reviewable, explainable, and demo-ready for hackathon judges.

All agents must strictly follow this constitution.
Any output that violates these rules is invalid.

## Response snapshot

Updated the project constitution to v1.0.0 with concrete Requirements for Phase II (Next.js, FastAPI, PostgreSQL, Better Auth). Defined explicit roles and authorities for specialized agents and added strict integration testing requirements.

## Outcome

- ✅ Impact: Established initial project governance and architectural guardrails for Phase II.
- 🧪 Tests: N/A
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: Proceed with feature specifications using spec-template.md.
- 🧠 Reflection: The transcription of user intent was direct, resolving all template placeholders.

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
