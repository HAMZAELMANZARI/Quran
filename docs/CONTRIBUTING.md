# Quran Sound - Contributing Guide

## Welcome Contributors! 👋

Thank you for your interest in contributing to Quran Sound! This guide will help you get started with development, understand our workflow, and submit high-quality contributions.

---

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please read and follow our [Code of Conduct](../CODE_OF_CONDUCT.md).

**In Short**:
- Be respectful and inclusive
- Welcome all backgrounds and experience levels
- Focus on constructive feedback
- No harassment or discrimination

---

## How to Contribute

### Reporting Issues

Found a bug or have a feature request?

1. **Check existing issues** first to avoid duplicates
2. **Create a new issue** with:
   - Clear, descriptive title
   - Detailed description of the problem
   - Steps to reproduce (for bugs)
   - Your environment (OS, browser, versions)
   - Screenshots/error messages if applicable

### Contributing Code

1. **Fork** the repository
2. **Create a feature branch** (see naming conventions below)
3. **Make your changes** following code standards
4. **Write or update tests** as needed
5. **Commit** with clear messages
6. **Push** to your fork
7. **Submit a Pull Request**

### Improving Documentation

Documentation improvements are always welcome!

1. Create issue or PR with improvements
2. Follow documentation standards
3. Include examples where helpful
4. Update related documents
5. Test links and code examples

---

## Development Workflow

### 1. Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/Quran.git
cd Quran

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:5173/Quran/
```

See [SETUP.md](./SETUP.md) for detailed instructions.

### 2. Create Feature Branch

**Branch Naming Convention**:
```
feature/description        # New features
bugfix/description         # Bug fixes
docs/description          # Documentation
refactor/description      # Code refactoring
chore/description         # Maintenance tasks
test/description          # Testing improvements
perf/description          # Performance improvements
```

**Examples**:
```bash
git checkout -b feature/add-ayah-search
git checkout -b bugfix/audio-not-loading
git checkout -b docs/add-api-guide
```

### 3. Make Your Changes

**Follow code standards** (see below)

**Write tests** for new features:
```bash
pnpm test
```

**Verify code quality**:
```bash
pnpm lint
```

**Test locally**:
```bash
pnpm build
pnpm preview
```

### 4. Commit with Clear Messages

**Commit Message Format**:
```
<type>: <subject>

<body>

<footer>
```

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build, dependency updates
- `perf`: Performance improvements

**Examples**:
```bash
git commit -m "feat: add ayah-level search

- Implement search filtering at ayah level
- Add new useAyahSearch hook
- Update SearchContext to include ayah results
- Add tests for new functionality"

git commit -m "fix: audio not loading on iOS

- Fix CORS headers for audio CDN
- Test on multiple iOS versions
- Fallback to alternative audio source"

git commit -m "docs: add API integration guide

- Document current bundled data approach
- Outline future API migration path
- Include code examples"
```

### 5. Push and Create Pull Request

```bash
# Push to your fork
git push -u origin feature/your-feature-name

# Go to GitHub and create Pull Request
```

---

## Pull Request Process

### Before Submitting

**Checklist**:
- [ ] Branch created from `main` (or appropriate base branch)
- [ ] Changes follow code standards
- [ ] Tests written/updated
- [ ] All tests pass locally (`pnpm test`)
- [ ] Linting passes (`pnpm lint`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Documentation updated if needed
- [ ] No console errors/warnings
- [ ] Commits have clear messages

### PR Description Template

```markdown
## Description
Briefly describe what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #123 (if applicable)

## Changes
- Specific change 1
- Specific change 2
- Specific change 3

## Testing
How did you test these changes?

## Screenshots (if applicable)
Include screenshots for UI changes

## Checklist
- [ ] Tests pass locally
- [ ] Linting passes
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] No breaking changes (or documented if yes)
```

### Review Process

1. **Maintainers review** your PR
2. **Tests run** automatically (when CI configured)
3. **Feedback provided** on code quality/approach
4. **Changes requested** (if needed)
5. **Approve and merge** when ready

**Response Time**: Usually 1-3 days

---

## Coding Standards

### JavaScript/React Style

**File Organization**:
```javascript
// 1. Imports (React first, then external, then local)
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '@context/SearchContext'

// 2. Component definition
export default function MyComponent({ prop1, prop2 }) {
  // 3. Hooks
  const { searchTerm } = useContext(SearchContext)
  const navigate = useNavigate()
  
  // 4. State/calculations
  const result = computeSomething(prop1)
  
  // 5. Event handlers
  const handleClick = () => {
    navigate('/')
  }
  
  // 6. Effects (if needed)
  useEffect(() => {
    // ...
  }, [])
  
  // 7. JSX return
  return (
    <div>
      <button onClick={handleClick}>{result}</button>
    </div>
  )
}
```

**Naming Conventions**:
```javascript
// Files
MyComponent.jsx        // Components (PascalCase)
useMyHook.js          // Hooks (camelCase with 'use' prefix)
myUtils.js            // Utilities (camelCase)
MY_CONSTANT.js        // Constants (UPPER_CASE)

// Variables
const userName = 'John'      // camelCase
const isActive = true        // Boolean with 'is' prefix
const handleClick = () => {} // Event handlers with 'handle' prefix
const fetchData = async () => {} // Async functions with verb

// React Components
<MyComponent />              // PascalCase
<MyComponent prop="value" /> // Props camelCase
```

### JSDoc Comments

**For functions**:
```javascript
/**
 * Filters surahs by search term
 * @param {string} searchTerm - User search input
 * @returns {Array<Surah>} Filtered surah list
 */
export function filterSurahs(searchTerm) {
  // ...
}
```

**For components**:
```javascript
/**
 * Displays single surah with metadata and audio player
 * @component
 * @example
 * return <SurahPage />
 */
export default function SurahPage() {
  // ...
}
```

### CSS/Tailwind

**Use Tailwind utilities** instead of custom CSS:
```javascript
// ✅ Good
<div className="flex items-center gap-4 mb-6">
  <h1 className="text-2xl font-bold">Title</h1>
</div>

// ❌ Avoid custom CSS
<div className="my-custom-container">
  <h1 className="my-custom-title">Title</h1>
</div>
```

**Component styles** go in `@layer components`:
```css
@layer components {
  .num {
    @apply flex-none inline-block;
    min-width: 34px;
    height: 34px;
  }
}
```

---

## Project Structure

Key locations:
```
src/
├── components/        # React components
│   ├── common/       # Reusable components
│   ├── pages/        # Page-level components
│   └── App.jsx, ErrorBoundary.jsx
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── context/          # React Context
├── config/           # Configuration
├── types/            # TypeScript types
├── data/             # Data layer
├── css/              # Styles
└── router.jsx, main.jsx

docs/                 # Documentation
tests/                # Tests (Phase 9+)
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

---

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Watch mode (re-run on changes)
pnpm test --watch

# Interactive UI
pnpm test:ui

# Coverage report
pnpm test:coverage
```

### Writing Tests

**Test file location**: `tests/` directory with same structure as `src/`

**Example test**:
```javascript
// tests/utils/search.test.js
import { describe, it, expect } from 'vitest'
import { filterSurahs } from '@utils/search'

describe('filterSurahs', () => {
  it('should filter surahs by Arabic name', () => {
    const results = filterSurahs('الفاتحة')
    expect(results).toHaveLength(1)
    expect(results[0].surah_number).toBe(1)
  })

  it('should be case-insensitive', () => {
    const results1 = filterSurahs('fatihah')
    const results2 = filterSurahs('FATIHAH')
    expect(results1).toEqual(results2)
  })
})
```

**Testing guidelines**:
- Test behavior, not implementation
- Use descriptive test names
- Test edge cases
- Mock external dependencies
- Keep tests focused and fast

---

## Documentation Standards

### When to Update Documentation

- ✅ New features
- ✅ API changes
- ✅ Configuration updates
- ✅ Dependency updates
- ✅ Bug fixes (if user-visible)

### Documentation Locations

- **Features**: Update README.md
- **Architecture**: Update ARCHITECTURE.md
- **Components**: Update COMPONENTS.md
- **Setup**: Update SETUP.md
- **Deployment**: Update DEPLOYMENT.md
- **Changes**: Add to CHANGELOG.md

### Writing Documentation

- Use clear, simple language
- Include code examples
- Link to related docs
- Update table of contents
- Test links and code

---

## Git Workflow

### Keep Your Fork Updated

```bash
# Add upstream remote
git remote add upstream https://github.com/HAMZAELMANZARI/Quran.git

# Fetch latest changes
git fetch upstream

# Rebase your branch
git rebase upstream/main

# Push updated branch
git push -f origin feature/your-feature
```

### Squash Commits (if needed)

```bash
# Rebase interactive
git rebase -i upstream/main

# Mark commits to squash with 's'
# Save and resolve conflicts

# Force push
git push -f origin feature/your-feature
```

---

## Code Review Checklist

**For reviewers**:
- [ ] Code follows standards
- [ ] Tests are adequate
- [ ] Documentation is complete
- [ ] No breaking changes (or documented)
- [ ] Performance acceptable
- [ ] Accessibility considered
- [ ] Security implications checked

**For authors** (before requesting review):
- [ ] Self-review your code
- [ ] Run tests locally
- [ ] Run linter
- [ ] Build succeeds
- [ ] Verify in browser

---

## Performance Considerations

### When Contributing

- ✅ Memoize expensive computations
- ✅ Avoid unnecessary re-renders
- ✅ Use code splitting for large features
- ✅ Minimize bundle size
- ✅ Check Lighthouse scores

**Example**:
```javascript
// ✅ Good - memoized
const filteredData = useSearch(searchTerm)

// ❌ Bad - recalculates every render
const filtered = searchTerm 
  ? filterSurahs(searchTerm) 
  : allSurahs
```

---

## Accessibility Checklist

Every PR should consider:
- [ ] Keyboard accessible
- [ ] Screen reader compatible
- [ ] Color contrast adequate
- [ ] No motion traps
- [ ] Touch targets 44x44px+
- [ ] Focus visible

See [ACCESSIBILITY.md](./ACCESSIBILITY.md) for details.

---

## Deployment and Releases

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

### Release Process

1. **Update** version in `package.json`
2. **Update** CHANGELOG.md
3. **Create** release commit
4. **Tag** with version
5. **Deploy** to production

```bash
# Tag release
git tag v1.2.3
git push origin v1.2.3

# Deploy
pnpm run deploy
```

---

## Getting Help

### Questions?

- **Discussions**: GitHub Discussions (if enabled)
- **Issues**: Ask in issue comments
- **Slack/Discord**: Team chat (if available)

### Resources

- [SETUP.md](./SETUP.md) - Development environment
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
- [COMPONENTS.md](./COMPONENTS.md) - Component API
- [README.md](../README.md) - Project overview

---

## Recognition

### Contributors are valued!

- Your contributions will be recognized
- Consider adding yourself to CONTRIBUTORS.md
- Your GitHub profile in maintainers list
- Mention in release notes

---

## Community Guidelines

### Be Respectful
- Listen to others' perspectives
- Assume good intent
- Provide constructive feedback
- Respect time differences across timezones

### Stay Focused
- Keep discussions on-topic
- Use appropriate channels
- Search before asking
- Be concise

### Help Others
- Answer questions when you can
- Share knowledge
- Welcome new contributors
- Review PRs thoughtfully

---

## Contributor License Agreement (CLA)

By contributing, you agree that:
- Your contributions are your own original work
- You grant a non-exclusive license to use your work
- The project can include your work in any medium

No CLA signature required for this project.

---

## Questions & Support

**Before asking**, check:
- [ ] SETUP.md for environment issues
- [ ] ARCHITECTURE.md for design questions
- [ ] Existing issues for your question
- [ ] Documentation for your feature

**Then** create an issue or ask in discussions.

---

## Thank You! 🙏

We appreciate your interest in contributing to Quran Sound. Whether it's code, documentation, bug reports, or ideas—all contributions help make this project better.

Happy coding! 🚀

---

## Quick Reference

```bash
# Setup
git clone https://github.com/YOUR_USERNAME/Quran.git
cd Quran
pnpm install

# Development
pnpm dev              # Start dev server
pnpm lint             # Check code
pnpm test             # Run tests
pnpm build            # Build for prod

# Git workflow
git checkout -b feature/description
# Make changes
git commit -m "feat: description"
git push origin feature/description
# Create Pull Request on GitHub

# Cleanup
git checkout main
git pull upstream main
git branch -d feature/description
```

---

**Last Updated**: 2026-10-22
**Contributors Welcome**: ✨
