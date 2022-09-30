const formatSql = (sql) =>
  sql
    .split("\n")
    .map((x) => x.trim())
    .join(" ");

module.exports = {
  formatSql,
};
