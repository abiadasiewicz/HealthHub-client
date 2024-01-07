export const sortByField = <T, K extends keyof T>(array: T[], field: K, ascending = true): T[] => {
  const sortedArray = [...array];

  sortedArray.sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (valueA < valueB) {
      return ascending ? -1 : 1;
    } else if (valueA > valueB) {
      return ascending ? 1 : -1;
    } else {
      return 0;
    }
  });

  return sortedArray;
};
