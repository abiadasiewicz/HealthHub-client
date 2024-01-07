import { sortByField } from './sort-util';

describe('sortByField', () => {
  const array = [
    { id: 2, name: 'Ziemowit' },
    { id: 3, name: 'Adam' },
    { id: 1, name: 'Czesław' },
  ];

  it('should sort array of objects by a specified field in ascending order', () => {
    // when
    const sortedArray = sortByField(array, 'name');

    // then
    expect(sortedArray).toEqual([
      { id: 3, name: 'Adam' },
      { id: 1, name: 'Czesław' },
      { id: 2, name: 'Ziemowit' },
    ]);
  });

  it('should sort array of objects by a specified field in descending order', () => {
    // when
    const sortedArray = sortByField(array, 'name', false);

    // Assert
    expect(sortedArray).toEqual([
      { id: 2, name: 'Ziemowit' },
      { id: 1, name: 'Czesław' },
      { id: 3, name: 'Adam' },
    ]);
  });

  it('should not change the order when the sorted fields have the same value', () => {
    // given
    const givenArray = [
      { id: 2, name: 'Ziemowit' },
      { id: 3, name: 'Ziemowit' },
      { id: 1, name: 'Czesław' },
    ];

    // when
    const sortedArray = sortByField(givenArray, 'name', false);

    // Assert
    expect(sortedArray).toEqual([
      { id: 2, name: 'Ziemowit' },
      { id: 3, name: 'Ziemowit' },
      { id: 1, name: 'Czesław' },
    ]);
  });
});
