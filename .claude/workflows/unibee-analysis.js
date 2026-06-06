export const meta = {
  name: 'unibee-architecture-analysis',
  description: 'Comprehensive codebase analysis for UniBee: architecture, problems, refactoring strategies',
  phases: ['Explore', 'Analyze', 'Synthesize'],
}

// Phase 1: Deep exploration of the codebase
phase('Explore')

const EXPLORER_PROMPT = `You are a senior software architect analyzing a React/Next.js codebase called UniBee. Thoroughly explore and document:

1. **Project Structure**: Map the entire directory structure, identify key directories and their purposes
2. **Technology Stack**: Identify framework, UI library, state management, routing, styling approach
3. **Component Architecture**: List all components, their purposes, and how they're organized
4. **Data Flow**: How data moves through the app (props, context, state management)
5. **Routing Structure**: How navigation is set up
6. **API/Data Layer**: Any API calls, data fetching patterns, mock data
7. **Styling Approach**: CSS methodology, theme system, responsive design

Read the following files completely:
- package.json
- Any config files (next.config.js, tsconfig.json, etc.)
- src/app/layout.tsx or equivalent
- src/app/page.tsx or equivalent
- All component files in src/app/components/
- Any utility files in src/app/utils/
- Any context providers
- Any hooks

Provide a detailed architecture summary with file paths and line references.`

const explorer = await agent(EXPLORER_PROMPT, {
  label: 'architecture-explorer',
  phase: 'Explore',
})

// Phase 2: Problem identification with parallel specialized agents
phase('Analyze')

const [structural, duplication, performance, maintainability] = await parallel([
  // Structural analysis
  () => agent(`Analyze structural problems in the UniBee codebase.

Identify:
1. Component organization issues (are components in logical locations?)
2. Coupling problems (are components too tightly coupled?)
3. Missing abstractions or separation of concerns violations
4. Inconsistent patterns across components
5. Missing type definitions or weak typing
6. State management architecture issues

Read ALL component files thoroughly. For each problem found, cite specific file paths and line numbers.

Return a structured list of structural problems with severity (critical/high/medium/low) and specific remediation suggestions.`),

  // Duplication analysis
  () => agent(`Find duplicated code patterns in the UniBee codebase.

Look for:
1. Repeated component logic or JSX
2. Similar styling patterns that could be abstracted
3. Duplicate type definitions
4. Repeated utility functions
5. Copy-pasted code blocks
6. Similar data structures or constants

Read ALL component files and utility files. Document each duplication with:
- File paths and line numbers of each occurrence
- The duplicated code pattern
- Suggested abstraction/refactoring approach

Return a structured list of duplications found.`),

  // Performance analysis
  () => agent(`Analyze performance concerns in the UniBee codebase.

Look for:
1. Unnecessary re-renders (missing memo, useCallback)
2. Large bundle size concerns (unused imports, large dependencies)
3. Inefficient data handling
4. Missing lazy loading or code splitting opportunities
5. Inefficient list rendering
6. Blocking operations or synchronous code
7. Missing or incorrect dependencies arrays in hooks

Read ALL component files and hooks. For each issue found, cite file paths, line numbers, and provide specific fixes.

Return a structured list of performance issues with severity and remediation.`),

  // Maintainability analysis
  () => agent(`Analyze maintainability risks in the UniBee codebase.

Look for:
1. Complex components that should be split
2. Unclear naming conventions
3. Missing or inadequate comments/documentation
4. Magic numbers or hardcoded values
5. Error handling gaps
6. Accessibility issues (missing ARIA, semantic HTML)
7. Missing prop types or validation
8. Tight coupling to implementation details
9. Testability concerns

Read ALL component files thoroughly. Document each risk with file paths, line numbers, and specific improvements.

Return a structured list of maintainability risks with severity and recommendations.`)
])

// Phase 3: Synthesize findings into actionable refactoring plan
phase('Synthesize')

const synthesizer = await agent(`You are a senior software architect synthesizing findings from multiple code analysis agents into a comprehensive refactoring plan.

## Architecture Summary (from Explorer)
${explorer}

## Problems Found:

### Structural Issues:
${JSON.stringify(structural || [], null, 2)}

### Duplication Issues:
${JSON.stringify(duplication || [], null, 2)}

### Performance Issues:
${JSON.stringify(performance || [], null, 2)}

### Maintainability Risks:
${JSON.stringify(maintainability || [], null, 2)}

## Your Task:

Create a comprehensive refactoring plan that includes:

1. **Architecture Summary**: High-level overview of the current architecture
2. **Problem Areas**: Prioritized list of issues (group by severity: Critical > High > Medium > Low)
3. **Refactoring Strategies**: For each major problem area:
   - Specific code changes needed
   - Recommended abstractions
   - Migration approach
4. **Improved Code**: Show before/after examples for the most critical refactorings
5. **Implementation Priority**: Suggested order for addressing issues

Format as a detailed markdown document that a team could use to systematically improve the codebase.

Be specific with file paths, line numbers, and actual code examples where possible.`)

return {
  explorer,
  structural: structural || [],
  duplication: duplication || [],
  performance: performance || [],
  maintainability: maintainability || [],
  refactoringPlan: synthesizer
}