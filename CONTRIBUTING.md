# Contributing to Quran Sound

Thanks for your interest in improving Quran Sound. Contributions of all kinds are
welcome, from bug reports and feature ideas to documentation and code.

## Code of Conduct

This project and everyone participating in it is governed by the
[Code of Conduct](./CODE_OF_CONDUCT.md). By contributing, you agree to uphold
that standard.

## Ways to contribute

- Report bugs and usability issues
- Suggest improvements or new features
- Improve documentation and accessibility
- Submit fixes, refactors, and tests

## Development setup

1. Fork the repository and clone your fork.
2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Start the app locally:

   ```sh
   pnpm dev
   ```

4. Create a branch for your work:

   ```sh
   git checkout -b feature/my-change
   ```

## Pull request guidelines

- Keep your changes focused and scoped to a single concern.
- Write clear commit messages.
- Update documentation when behavior or setup changes.
- Keep runtime API behavior covered by tests. The app fetches surah data from
  the Itqan API in `src/features/quran/api/itqanApi.js`; mock the network in
  tests instead of calling the real endpoint.
- Run the relevant validation checks before submitting:

  ```sh
  pnpm lint
  pnpm test -- --run
  pnpm build
  ```

- Open a pull request with a clear description of the problem, the solution, and
  any screenshots or examples if relevant.

## Reporting issues

When opening an issue, please include:

- a short description of the problem
- steps to reproduce it
- expected behavior
- actual behavior
- relevant environment details (browser, OS, device, etc.)

## Questions

If you are unsure about a contribution or need guidance, open an issue or start a
discussion in the repository. We are happy to help.
