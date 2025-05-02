# Contributing to Vibly

Thank you for considering contributing to Vibly! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Release Process](#release-process)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an inclusive and respectful community.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/sh20raj/vibly.git
   cd vibly
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

1. **Make your changes** in your feature branch.
2. **Build the project** to verify your changes:
   ```bash
   npm run build
   ```
3. **Run the development server** to see your changes in action:
   ```bash
   npm run dev
   ```
4. **Lint your code** to ensure it follows our coding standards:
   ```bash
   npm run lint
   ```
5. **Format your code** using Prettier:
   ```bash
   npm run format
   ```
6. **Commit your changes** with a descriptive commit message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```
7. **Push your changes** to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

## Pull Request Process

1. **Create a pull request** from your fork to the main repository.
2. **Fill out the pull request template** with a description of your changes.
3. **Wait for review** from the maintainers.
4. **Make any requested changes** based on the review feedback.
5. **Once approved**, your pull request will be merged by a maintainer.

## Coding Standards

We follow the [JavaScript Standard Style](https://standardjs.com/) with some modifications:

- Use single quotes for strings
- Use 2 spaces for indentation
- Use semicolons at the end of statements
- Use camelCase for variables and functions
- Use PascalCase for classes and components

Our ESLint and Prettier configurations enforce these standards. You can run:

```bash
npm run lint
npm run format
```

## Testing

We use Jest for testing. Please write tests for new features and ensure existing tests pass:

```bash
npm test
```

## Documentation

Please update the documentation when adding or modifying features:

- Update the README.md if necessary
- Update or add JSDoc comments to your code
- Update the API documentation in docs/API.md
- Add examples if appropriate

## Release Process

The release process is handled by the maintainers. We follow semantic versioning:

- **Major version (x.0.0)**: Breaking changes
- **Minor version (0.x.0)**: New features without breaking changes
- **Patch version (0.0.x)**: Bug fixes and minor improvements

Thank you for contributing to Vibly!
