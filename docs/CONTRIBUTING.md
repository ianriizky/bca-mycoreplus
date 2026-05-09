# Contributing Guidelines

## Welcome!

Thank you for your interest in contributing to BCA MyCore+! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct:

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on constructive feedback
- Report inappropriate behavior

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing opinions
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment, discrimination, or intimidation
- Offensive comments or personal attacks
- Trolling or inflammatory behavior
- Unwelcome sexual attention
- Any form of abuse

## Getting Started

### Prerequisites

- Node.js 18.0.0+
- Bun 1.0.0+ or npm 9.0.0+
- Git 2.30.0+
- GitHub account

### Setup Development Environment

1. **Fork the repository**:
   - Click "Fork" button on GitHub
   - Clone your fork: `git clone https://github.com/YOUR_USERNAME/bca-mycoreplus.git`

2. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/ianrizky/bca-mycoreplus.git
   ```

3. **Install dependencies**:

   ```bash
   cd bca-mycoreplus
   bun install
   ```

4. **Start development server**:

   ```bash
   bun run dev
   ```

5. **Verify setup**:
   ```bash
   bun run test
   ```

## Development Workflow

### Creating a Feature Branch

```bash
# Update main branch
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

**Branch naming conventions**:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Test additions
- `chore/` - Maintenance tasks

### Making Changes

1. **Make your changes**:
   - Edit files as needed
   - Follow code style guidelines
   - Keep changes focused and minimal

2. **Run tests**:

   ```bash
   bun run test
   ```

3. **Check code quality**:

   ```bash
   bun run lint
   ```

4. **Format code**:
   ```bash
   bun run format
   ```

### Committing Changes

**Commit message format**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (formatting, semicolons, etc.)
- `refactor` - Code refactoring
- `test` - Test additions/changes
- `chore` - Maintenance tasks

**Examples**:

```
feat(canvas): add text formatting support

Add bold, italic, and underline formatting options
to the FloatingToolbar component.

Closes #123
```

```
fix(clipboard): handle unsupported browsers

Add fallback download option for browsers that
don't support the Clipboard API.

Fixes #456
```

### Pushing Changes

```bash
# Push to your fork
git push origin feature/your-feature-name
```

### Creating a Pull Request

1. **Go to GitHub**:
   - Navigate to your fork
   - Click "New Pull Request"

2. **Fill in PR details**:
   - **Title**: Clear, concise description
   - **Description**: Explain changes and why
   - **Related Issues**: Link to related issues
   - **Screenshots**: Add if UI changes

3. **PR template**:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues

Closes #123

## Testing

Describe testing performed:

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No new warnings generated
```

## Code Style Guidelines

### TypeScript

- **Strict mode**: Always enabled
- **No `any` types**: Use proper types
- **Explicit return types**: For all functions
- **Interfaces**: For all props and state

```typescript
// ✅ Good
interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

export const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

// ❌ Bad
export const Button = (props: any) => {
  return <button {...props}>{props.label}</button>
}
```

### React Components

- **Functional components**: Always use functional components
- **Hooks**: Use React hooks for state and effects
- **Props interface**: Define for all components
- **Memoization**: Use React.memo when appropriate

```typescript
// ✅ Good
interface CardProps {
  title: string
  content: string
}

export const Card: FC<CardProps> = React.memo(({ title, content }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
})

// ❌ Bad
export default function Card(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <p>{props.content}</p>
    </div>
  )
}
```

### CSS & Styling

- **Tailwind CSS**: Use utility classes
- **No inline styles**: Avoid style prop
- **Mobile-first**: Design for mobile first
- **Responsive**: Use Tailwind breakpoints

```tsx
// ✅ Good
<div className="flex flex-col gap-4 md:flex-row md:gap-8">
  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
    Click me
  </button>
</div>

// ❌ Bad
<div style={{ display: 'flex', gap: '16px' }}>
  <button style={{ padding: '8px 16px', backgroundColor: 'blue' }}>
    Click me
  </button>
</div>
```

### File Organization

- **One component per file**: `ComponentName/index.tsx`
- **Co-locate tests**: `ComponentName.test.tsx`
- **Consistent naming**: Match file and export names
- **Clear structure**: Logical file organization

```
src/
├── components/
│   ├── CanvasEditor/
│   │   ├── index.tsx
│   │   ├── CanvasEditor.test.tsx
│   │   └── hooks/
│   │       └── useCopyShortcut.ts
│   └── FloatingToolbar/
│       ├── index.tsx
│       └── FloatingToolbar.test.tsx
├── stores/
│   ├── canvasStore.ts
│   └── canvasStore.test.ts
└── lib/
    ├── clipboard.ts
    └── clipboard.test.ts
```

### Naming Conventions

- **Components**: PascalCase (`CanvasEditor`, `FloatingToolbar`)
- **Hooks**: camelCase with `use` prefix (`useCopyShortcut`)
- **Stores**: camelCase with `Store` suffix (`canvasStore`)
- **Utilities**: camelCase (`getContrastRatio`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_UNDO_STACK`)
- **Files**: Match export name or kebab-case

## Testing Guidelines

### Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest'

describe('ComponentName', () => {
  beforeEach(() => {
    // Setup
  })

  it('should do something', () => {
    // Arrange
    const input = 'test'

    // Act
    const result = functionUnderTest(input)

    // Assert
    expect(result).toBe('expected')
  })
})
```

### Unit Tests

Test individual functions and utilities:

```typescript
import { describe, it, expect } from 'vitest'
import { getContrastRatio } from '@/lib/contrast'

describe('getContrastRatio', () => {
  it('should calculate correct contrast ratio', () => {
    const ratio = getContrastRatio('#000000', '#FFFFFF')
    expect(ratio).toBe(21)
  })

  it('should handle invalid colors', () => {
    expect(() => {
      getContrastRatio('#INVALID', '#FFFFFF')
    }).toThrow()
  })
})
```

### Integration Tests

Test component interactions:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FloatingToolbar } from '@/components/FloatingToolbar'

describe('FloatingToolbar', () => {
  it('should delete object on delete button click', async () => {
    const user = userEvent.setup()
    render(<FloatingToolbar />)

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    await user.click(deleteButton)

    // Assert object deleted
  })
})
```

### Test Coverage

- **Target**: 80% code coverage
- **Critical paths**: 100% coverage
- **Edge cases**: Always test edge cases
- **Error handling**: Test error scenarios

```bash
# Run tests with coverage
bun run test:coverage
```

## Documentation

### Code Comments

- **Why, not what**: Explain why, not what code does
- **Complex logic**: Comment complex algorithms
- **TODOs**: Mark incomplete work with `// TODO:`
- **Avoid obvious**: Don't comment obvious code

```typescript
// ✅ Good
// Use debouncing to prevent excessive re-renders during rapid input
const debouncedUpdate = debounce((id, props) => {
  updateObject(id, props)
}, 300)

// ❌ Bad
// Update the object
updateObject(id, props)
```

### Documentation Files

- **README.md**: Overview and quick start
- **ARCHITECTURE.md**: System design and patterns
- **COMPONENTS.md**: Component documentation
- **API.md**: API reference
- **SETUP.md**: Developer setup
- **DEPLOYMENT.md**: Deployment guide
- **TROUBLESHOOTING.md**: Common issues

### JSDoc Comments

```typescript
/**
 * Calculate contrast ratio between two colors
 * @param color1 - First color (hex or rgb)
 * @param color2 - Second color (hex or rgb)
 * @returns Contrast ratio (1-21)
 * @throws Error if color format is invalid
 */
export function getContrastRatio(color1: string, color2: string): number {
  // Implementation
}
```

## Pull Request Review

### What Reviewers Look For

- **Code quality**: Follows style guidelines
- **Tests**: Adequate test coverage
- **Documentation**: Updated documentation
- **Performance**: No performance regressions
- **Accessibility**: WCAG 2.1 Level A compliance
- **Security**: No security vulnerabilities

### Responding to Feedback

- **Be respectful**: Accept constructive criticism
- **Explain reasoning**: Clarify your approach
- **Make changes**: Update code based on feedback
- **Request re-review**: Ask for re-review after changes

## Reporting Issues

### Bug Reports

Include:

- **Description**: Clear description of bug
- **Steps to reproduce**: Numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Environment**: OS, browser, versions
- **Screenshots**: Visual evidence

### Feature Requests

Include:

- **Description**: Clear description of feature
- **Use case**: Why is this needed
- **Proposed solution**: How should it work
- **Alternatives**: Other approaches considered

## Release Process

### Version Numbers

Follow Semantic Versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

### Release Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md`
- [ ] Run full test suite
- [ ] Build production bundle
- [ ] Create GitHub release
- [ ] Deploy to production

## Community

### Getting Help

- **Documentation**: Check `docs/` folder
- **Issues**: Search existing issues
- **Discussions**: Use GitHub discussions
- **Email**: Contact project maintainers

### Staying Updated

- **Watch repository**: Get notifications
- **Star repository**: Show support
- **Follow maintainers**: Get updates
- **Subscribe to releases**: Get release notifications

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Acknowledgments

Thank you for contributing to BCA MyCore+! Your contributions help make this project better for everyone.

---

**Last Updated**: 2026-05-10
**Version**: 1.0.0
