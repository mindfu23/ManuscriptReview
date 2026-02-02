# Manuscript Koala

AI-powered manuscript review tool for fiction writers.

**Live Site:** https://manuscript-koala.netlify.app

## Overview

Manuscript Koala provides automated feedback on fiction manuscripts, including:

- **Typo Check** - Spelling errors and typos
- **Grammar Check** - Grammar issues in narrative text
- **Line Edit Polish** - Adverbs, word echoes, passive voice detection
- **Character List & Arcs** - Character appearances and development tracking
- **Plot Summary** - Scene-by-scene plot beats
- **Possible Plot Holes** - Continuity and logic issues
- **Developmental Review** - Overall tone, strengths, areas to improve

### Advanced Options
- Style Consistency (voice, POV, tense)
- Character Dialogue Voice analysis
- Pacing & Tension curve
- Theme Detection

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                    This Repo (Frontend)                              │
│  React 18 + TypeScript + Vite + Tailwind + Zustand + Capacitor      │
│  Deployed to Netlify                                                 │
└────────────────────────────────────┬────────────────────────────────┘
                                     │ HTTPS API calls
                                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    novel-editing-tools (Backend)                     │
│  FastAPI + Python                                                    │
│  Deployed to Google Cloud Run                                        │
│                                                                      │
│  analyzers.py  →  Pure analysis logic (dataclass output)            │
│  formatters.py →  Presentation layer (markdown/JSON)                │
│  api.py        →  FastAPI wrapper                                   │
└─────────────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Language | TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| State | Zustand |
| Mobile | Capacitor (iOS/Android) |
| Deployment | Netlify |

## Project Structure

```
src/
├── components/
│   ├── FileUpload.tsx        # Drag-and-drop file upload
│   ├── ReviewOptions.tsx     # Checkbox panel for review types
│   ├── ReviewProgress.tsx    # Upload/processing progress
│   ├── ReviewResults.tsx     # Collapsible section results display
│   └── Navbar.tsx
├── pages/
│   ├── Home.tsx              # Main two-column layout
│   └── Admin.tsx             # Tone settings panel
├── services/
│   └── api.ts                # API client with multi-option support
├── store/
│   └── reviewStore.ts        # Selected options + review state
├── App.tsx
└── main.tsx
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Frontend runs at `http://localhost:3000`.

### Backend Setup

The backend is in a separate repo (`novel-editing-tools`):

```bash
cd ../antigravity-and-others/novel-editing-tools
pip install -e ".[api]"
uvicorn api:app --reload --port 8000
```

### Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:8000
```

For production, this is set in Netlify to the Cloud Run URL.

## Backend Architecture

The backend separates analysis from presentation for reusability:

### analyzers.py (Pure Data)
Returns Python dataclasses with structured analysis results:
- `analyze_typos()` → `TypoAnalysis`
- `analyze_grammar()` → `GrammarAnalysis`
- `analyze_line_edit()` → `LineEditAnalysis`
- `analyze_characters()` → `CharacterAnalysis`
- `analyze_plot_structure()` → `PlotAnalysis`
- `analyze_plot_holes()` → `PlotHolesAnalysis`
- `analyze_style()` → `StyleAnalysis`
- `analyze_dialogue()` → `DialogueAnalysis`
- `analyze_pacing()` → `PacingAnalysis`
- `analyze_themes()` → `ThemeAnalysis`
- `analyze_all()` → Dict of all analyses

### formatters.py (Presentation)
Transforms analysis dataclasses into output formats:
- `format_*_markdown()` - Markdown output for each analysis type
- `format_all_json()` - JSON serialization for all analyses
- `ReviewSectionFormatter` - Web API section formatting

This separation allows:
- AI agents to consume structured data directly
- CLI tools to use JSON output
- Other frontends to define their own presentation

## Tone System

Feedback tone affects how results are presented (not the underlying analysis):

| Tone | Style |
|------|-------|
| Gentlest | Encouraging, supportive (default) |
| Gentle | Friendly suggestions |
| Balanced | Neutral, professional |
| Direct | Clear, minimal praise |
| Harsh | Critical, direct issues |

Configure via the admin panel (`/admin` route).

## Deployment

### Frontend (Netlify)
Auto-deploys from `main` branch.

Required environment variable:
- `VITE_API_URL` = Cloud Run backend URL

### Backend (Cloud Run)
Auto-deploys via GitHub Actions when Python files change.

Required GitHub secrets:
- `GCP_PROJECT_ID`
- `GCP_SA_KEY`
- `ANTHROPIC_API_KEY`
- `ADMIN_PASSWORD`

## Related Projects

- **novel-editing-tools** - Backend analysis scripts and API
- **Novelizer** - Full novel writing app (shares component patterns)
- **StoryPlot** - Story plotting tool (shares deployment pattern)
