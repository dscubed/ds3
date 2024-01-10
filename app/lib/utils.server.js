export function pageToRange(page, limit) {
  return [(page - 1) * limit, page * limit - 1]
}