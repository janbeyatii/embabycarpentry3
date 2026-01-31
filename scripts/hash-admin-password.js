#!/usr/bin/env node
/**
 * Generate ADMIN_PASSWORD_HASH for password "admin".
 * Usage: node scripts/hash-admin-password.js
 * Copy the printed line into .env and Vercel Environment Variables.
 */
const bcrypt = require('bcryptjs')

const PASSWORD = 'admin'

async function main() {
  const hash = await bcrypt.hash(PASSWORD, 10)
  const ok = await bcrypt.compare(PASSWORD, hash)
  if (!ok) {
    console.error('Verification failed')
    process.exit(1)
  }
  // For .env and Vercel: escape $ so it is not treated as variable
  const forEnv = hash.replace(/\$/g, '\\$')
  console.log('')
  console.log('Password: "' + PASSWORD + '"')
  console.log('')
  console.log('Paste this line into .env and into Vercel → Settings → Environment Variables:')
  console.log('')
  console.log('ADMIN_PASSWORD_HASH=' + forEnv)
  console.log('')
  console.log('In Vercel, set the *value* to (without the key):')
  console.log(forEnv)
  console.log('')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
