export function pageToRange(page, limit) {
  return [(page - 1) * limit, page * limit - 1]
}

export function formatDate (dateString) {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}