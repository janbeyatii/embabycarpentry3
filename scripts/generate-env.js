#!/usr/bin/env node

/**
 * Helper script to generate environment variable values
 * Usage: node scripts/generate-env.js
 */

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('\n=== Environment Variables Generator ===\n');

  // Generate JWT_SECRET
  const jwtSecret = crypto.randomBytes(64).toString('hex');
  console.log('✅ JWT_SECRET generated:');
  console.log(jwtSecret);
  console.log('');

  // Generate ADMIN_PASSWORD_HASH
  const password = (await question('Enter your admin password: ')).trim();
  if (!password) {
    console.log('❌ Password is required');
    rl.close();
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  // Escape $ for .env (Next.js expands $VAR); use this in .env so the hash is not corrupted
  const hashForEnv = hash.replace(/\$/g, '\\$');
  console.log('\n✅ ADMIN_PASSWORD_HASH generated:');
  console.log(hash);
  console.log('\n✅ For .env (use this line so $ is not expanded):');
  console.log('ADMIN_PASSWORD_HASH=' + hashForEnv);
  console.log('');

  // Display summary
  console.log('\n=== Copy these values to Vercel Environment Variables ===\n');
  console.log('JWT_SECRET=' + jwtSecret);
  console.log('ADMIN_PASSWORD_HASH=' + hashForEnv);
  console.log('\n=== SMTP Configuration ===');
  console.log('You need to get these from your email provider:');
  console.log('- SMTP_HOST (e.g., smtp.gmail.com)');
  console.log('- SMTP_PORT (usually 587)');
  console.log('- SMTP_USER (your email address)');
  console.log('- SMTP_PASSWORD (app password for Gmail, or regular password)');
  console.log('- SMTP_FROM (usually same as SMTP_USER)');
  console.log('- ADMIN_EMAIL (where to receive inquiries)');
  console.log('\n=== Database ===');
  console.log('POSTGRES_URL - Get this from Vercel Dashboard → Storage → Your Database');
  console.log('');

  rl.close();
}

main().catch(console.error);
