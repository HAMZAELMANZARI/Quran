const userAgent = process.env.npm_config_user_agent ?? ''

if (!userAgent.startsWith('pnpm/')) {
  console.error(
    '\nThis project uses pnpm exclusively. Install dependencies with "pnpm install".\n' +
      'npm, yarn, and other package managers are not supported.\n'
  )
  process.exit(1)
}
