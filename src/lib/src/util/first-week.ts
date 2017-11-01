function getFirstNonNullFromColumn<T>(matrix: (T | null)[][], colNo: number): T {
  let i = -1
  while (matrix[++i][colNo] == null) {}
  return matrix[i][colNo]!
}

export const firstWeek = (matrix: (Date | null)[][]): Date[] => {
  return Array.from({length: 7})
    .map((_, index) => index)
    .map(colNo => getFirstNonNullFromColumn(matrix, colNo))
}
