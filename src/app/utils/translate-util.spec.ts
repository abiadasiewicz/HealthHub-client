import { DataKeys, translateKeysToEng } from './translate-util';

describe('Translate util', () => {
  it('should translate given parameters to Eng', () => {
    // given
    const testData: { given: DataKeys; expectedResult: string }[] = [
      {
        given: 'Imię',
        expectedResult: 'firstName',
      },
      {
        given: 'Nazwisko',
        expectedResult: 'lastName',
      },
      {
        given: 'Nr telefonu',
        expectedResult: 'phone',
      },
      {
        given: 'PESEL',
        expectedResult: 'pesel',
      },
      {
        given: 'Data urodzenia',
        expectedResult: 'birthDate',
      },
    ];

    // when then
    testData.forEach((data) => {
      expect(translateKeysToEng(data.given)).toEqual(data.expectedResult);
    });
  });
});
