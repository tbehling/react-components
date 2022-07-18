// Handles formatting of data returned by DatoCMS
export function normalizeTableData({
  hasColumnHeaders,
  collapsibleRows,
  table,
}) {
  const { columns, data } = table
  return {
    columns: hasColumnHeaders ? columns : null,
    rows: data.map((row, rowIdx) => {
      return Object.keys(row).reduce((acc, key) => {
        if (key === columns[0]) {
          console.log(key, row[key])
          acc.header = row[key]
        } else {
          const arr = acc.cells ? acc.cells : []
          arr[columns.indexOf(key) - 1] = row[key]
          acc.cells = arr
        }
        acc.isCollapsible = collapsibleRows.includes(rowIdx)
        return acc
      }, {} as any)
    }),
  }
}
