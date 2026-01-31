'use client'

import { useRef, useState } from 'react'

const styles = {
  zone: {
    border: '2px dashed var(--border)',
    borderRadius: '1rem',
    padding: '2rem',
    textAlign: 'center' as const,
    background: 'var(--black)',
    color: 'var(--text-secondary)',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'border-color 0.2s, background 0.2s'
  },
  zoneOver: {
    borderColor: 'var(--yellow)',
    background: 'rgba(245, 191, 35, 0.05)'
  },
  thumbs: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  thumb: {
    position: 'relative' as const,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    aspectRatio: '1',
    background: 'var(--black-light)'
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  remove: {
    position: 'absolute' as const,
    top: '0.5rem',
    right: '0.5rem',
    width: '2.4rem',
    height: '2.4rem',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(0,0,0,0.7)',
    color: '#fff',
    fontSize: '1.4rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1
  },
}

export function ImageUploader({
  value = [],
  onChange,
  disabled = false,
  compact = false
}: {
  value: string[]
  onChange: (urls: string[]) => void
  disabled?: boolean
  compact?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Upload failed')
    return data.url
  }

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length || disabled) return
    setUploading(true)
    try {
      const urls: string[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (!file.type.startsWith('image/')) continue
        const url = await uploadFile(file)
        if (url) urls.push(url)
      }
      if (urls.length) onChange([...value, ...urls])
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed. Try again.')
    } finally {
      setUploading(false)
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const onDragLeave = () => setDragOver(false)

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && !disabled && inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        style={{
          ...styles.zone,
          ...(dragOver ? styles.zoneOver : {}),
          ...(compact ? { padding: '1rem', minHeight: '8rem', fontSize: '1.35rem' } : {}),
          pointerEvents: disabled ? 'none' : undefined,
          opacity: disabled ? 0.6 : 1
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          style={{ display: 'none' }}
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
        {uploading ? (
          <span>Uploading...</span>
        ) : (
          <>
            <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.5rem' }}>
              Add photos
            </strong>
            Drag photos here or click to choose (JPEG, PNG, WebP, GIF — max 4 MB each)
          </>
        )}
      </div>

      {value.length > 0 && (
        <div style={{ ...styles.thumbs, ...(compact ? { gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: '0.6rem', marginTop: '0.8rem' } : {}) }}>
          {value.map((url, i) => (
            <div key={`${url}-${i}`} style={styles.thumb}>
              <img src={url} alt="" style={styles.thumbImg} />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => remove(i)}
                  style={styles.remove}
                  title="Remove"
                  aria-label="Remove image"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
