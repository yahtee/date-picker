export default (weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
  return Array.from({length: 7}).map((_, index) => weekStartsOn + index % 7)
}
