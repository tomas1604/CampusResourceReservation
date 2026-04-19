function requireFields(body, fields) {
  for (const field of fields) {
    if (!body[field]) {
      return `${field} is required`;
    }
  }
  return null;
}

module.exports = { requireFields };