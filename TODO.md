# Manuscript Koala - Future Features

## Story Structure Chart Generation

Generate visual charts showing story structure with characters and plot points.

### Chart Types

**3-Act Structure**
- Act breaks, inciting incident, midpoint, climax, resolution
- Character involvement at each beat
- Timeline visualization

**Dan Harmon Story Circle**
- 8 beats: You, Need, Go, Search, Find, Take, Return, Change
- Per-character arc tracking
- Circular diagram with plot points

### Implementation Options

| Option | Approach | Pros | Cons |
|--------|----------|------|------|
| **A** | Server-side Python (matplotlib/plotly) | Full control, works with existing analysis | Backend complexity, image hosting |
| **B** | Client-side JS (Chart.js, D3.js, SVG) | Interactive, no server changes | More frontend code |
| **C** | Mermaid diagrams | Simple, text-based, markdown-friendly | Less visual flexibility |

### Data Requirements

- Scene/chapter boundaries
- Character appearances per scene
- Plot beat detection (inciting incident, midpoint, etc.)
- Tension/pacing data (already in `PacingAnalysis`)

### Notes

- `novel_ingestor.py` already extracts scene and character data
- Main work: mapping scenes to story structure beats
- Consider keeping this separate from Manuscript Review for personal agent workflows
