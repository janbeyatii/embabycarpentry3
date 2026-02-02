#!/usr/bin/env node

/**
 * Bulk upload portfolio images to Vercel Blob
 *
 * Usage:
 *   node scripts/upload-portfolio-to-blob.js <folder-path>
 *
 * Example:
 *   node scripts/upload-portfolio-to-blob.js ./portfolio
 *
 * Folder structure:
 *   portfolio/
 *     Backsplash/        <- category
 *       1/               <- project subfolder
 *         IMG_1790.JPG
 *         IMG_1792.JPG
 *       2/
 *         ...
 *     Bathrooms/
 *       1/
 *         ...
 *
 *   Images are grouped by category and project. Output lists URLs per project.
 *
 * Prerequisites:
 *   - BLOB_READ_WRITE_TOKEN in .env (from Vercel Dashboard → Storage → Blob)
 *   - Run with: node --env-file=.env scripts/upload-portfolio-to-blob.js <path>
 *   - Or ensure BLOB_READ_WRITE_TOKEN is set in your environment
 */

const fs = require('fs')
const path = require('path')

// Load .env if present
const envPath = path.join(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8')
  content.split('\n').forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const val = match[2].trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  })
}

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.gif']
const MAX_SIZE = 4 * 1024 * 1024 // 4 MB

function getAllImages(dir, baseDir = dir) {
  const results = []
  if (!fs.existsSync(dir)) return results
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      results.push(...getAllImages(full, baseDir))
    } else if (ALLOWED_EXT.includes(path.extname(ent.name).toLowerCase())) {
      const rel = path.relative(baseDir, full).replace(/\\/g, '/')
      const parts = rel.split('/')
      const category = parts[0] || 'uncategorized'
      const project = parts.length >= 3 ? parts[1] : ''
      results.push({
        fullPath: full,
        relativePath: rel,
        category,
        project,
      })
    }
  }
  return results
}

async function main() {
  const folder = process.argv[2]
  if (!folder) {
    console.error('Usage: node scripts/upload-portfolio-to-blob.js <folder-path>')
    console.error('Example: node scripts/upload-portfolio-to-blob.js ./my-portfolio')
    process.exit(1)
  }

  const resolved = path.resolve(process.cwd(), folder)
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    console.error('Error: Folder not found:', resolved)
    process.exit(1)
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) {
    console.error('Error: BLOB_READ_WRITE_TOKEN not set.')
    console.error('Add it to .env or run: node --env-file=.env scripts/upload-portfolio-to-blob.js', folder)
    console.error('Get the token from Vercel Dashboard → Storage → Blob')
    process.exit(1)
  }

  const images = getAllImages(resolved)
  if (images.length === 0) {
    console.error('No images found in', resolved)
    console.error('Supported formats:', ALLOWED_EXT.join(', '))
    process.exit(1)
  }

  console.log(`Found ${images.length} image(s) in ${path.basename(resolved)}\n`)

  const { put } = require('@vercel/blob')
  const flatResults = []
  const byProject = {}

  for (let i = 0; i < images.length; i++) {
    const { fullPath, relativePath, category, project } = images[i]
    const name = path.basename(fullPath)
    const stat = fs.statSync(fullPath)

    if (stat.size > MAX_SIZE) {
      console.log(`[${i + 1}/${images.length}] SKIP ${relativePath} (over 4 MB)`)
      continue
    }

    const pathPart = project
      ? `${category}-${project}`.replace(/[^a-zA-Z0-9-_]/g, '-')
      : category.replace(/[^a-zA-Z0-9-_]/g, '-')
    const blobName = `${pathPart}-${Date.now()}-${i}-${name.replace(/[^a-zA-Z0-9.-]/g, '_')}`

    try {
      const buffer = fs.readFileSync(fullPath)
      const blob = await put(blobName, buffer, {
        access: 'public',
        token,
      })
      flatResults.push({ category, project, name: relativePath, url: blob.url })

      const key = project ? `${category}/${project}` : category
      if (!byProject[key]) byProject[key] = { category, project, images: [] }
      byProject[key].images.push({ name, url: blob.url })

      console.log(`[${i + 1}/${images.length}] ✓ ${relativePath} → ${blob.url}`)
    } catch (err) {
      console.error(`[${i + 1}/${images.length}] ✗ ${relativePath}`, err.message)
    }
  }

  const outPath = path.join(process.cwd(), 'uploaded-urls.json')
  const output = {
    flat: flatResults,
    byProject: Object.values(byProject),
  }
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8')
  console.log(`\n✅ Done. ${flatResults.length} image(s) uploaded. URLs saved to ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
