export const environment = () => {
  const envvars = process.env

  const resolve = (value: string, seen = new Set()): string => {
    return value.replace(/\$\{([^}]+)\}/g, (_, k) => {
      if (seen.has(k)) {
        // Prevents infinite loops (e.g. export A="${A}")
        return ""
      } else {
        seen.add(k)
      }

      const v = process.env[k]
      if (v != null) {
        return resolve(v, seen)
      } else {
        return ""
      }
    })
  }

  for (const [key, value] of Object.entries(process.env)) {
    if (value != null) {
      envvars[key] = resolve(value)
    }
  }

  return {
    getOrThrow: (key: string) => {
      const val = envvars[key]
      if (val == null) {
        throw new Error(`key "${key}" is not set`)
      } else {
        return val
      }
    },
    entries: () => {
      return envvars
    },
    get: (key: string) => {
      return envvars[key]
    },
  }
}
