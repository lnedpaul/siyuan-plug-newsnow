import type { Database } from "db0"
import { Cache } from "./cache"
import { UserTable } from "./user"

export interface DatabaseConfig {
  db: Database
  cache: Cache
  user: UserTable
}

export async function initDatabase(db: Database): Promise<DatabaseConfig> {
  const cache = new Cache(db)
  const user = new UserTable(db)
  
  await cache.init()
  await user.init()
  
  return {
    db,
    cache,
    user
  }
}