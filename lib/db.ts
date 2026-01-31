import { sql } from '@vercel/postgres'

// Re-export for use in query modules (e.g. getActiveOffers)
export { sql }

// Helper for find by ID
export async function findById<T = any>(table: string, id: string): Promise<T | null> {
  try {
    const result = await sql.query(`SELECT * FROM ${table} WHERE id = $1`, [id])
    return (result.rows[0] as T) || null
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Helper for find all with optional filters
export async function findAll<T = any>(
  table: string,
  filters?: Record<string, any>,
  orderBy?: string
): Promise<T[]> {
  try {
    let query = `SELECT * FROM ${table}`
    const params: any[] = []
    let paramIndex = 1

    if (filters && Object.keys(filters).length > 0) {
      const conditions = Object.entries(filters).map(([key, value]) => {
        params.push(value)
        return `${key} = $${paramIndex++}`
      })
      query += ` WHERE ${conditions.join(' AND ')}`
    }

    if (orderBy) {
      query += ` ORDER BY ${orderBy}`
    }

    const result = await sql.query(query, params)
    return result.rows as T[]
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

// Helper for insert operations
export async function insert(table: string, data: Record<string, any>): Promise<any> {
  try {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ')
    const columns = keys.join(', ')

    const queryText = `
      INSERT INTO ${table} (${columns})
      VALUES (${placeholders})
      RETURNING *
    `

    const result = await sql.query(queryText, values)
    return result.rows[0] || null
  } catch (error) {
    console.error('Database insert error:', error)
    throw error
  }
}

// Helper for update operations
export async function update(
  table: string,
  id: string,
  data: Record<string, any>
): Promise<any> {
  try {
    const keys = Object.keys(data)
    const values = Object.values(data)
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ')

    const queryText = `
      UPDATE ${table}
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `

    const result = await sql.query(queryText, [id, ...values])
    return result.rows[0] || null
  } catch (error) {
    console.error('Database update error:', error)
    throw error
  }
}

// Helper for delete operations
export async function remove(table: string, id: string): Promise<boolean> {
  try {
    await sql.query(`DELETE FROM ${table} WHERE id = $1`, [id])
    return true
  } catch (error) {
    console.error('Database delete error:', error)
    throw error
  }
}
