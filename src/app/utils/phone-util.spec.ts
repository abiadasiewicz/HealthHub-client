import { formatPhoneNr } from './phone-util';

describe('Phone util', () => {
  it('should add a space every 3 characters', () => {
    // given
    const phoneNr = '123456789';

    // when then
    expect(formatPhoneNr(phoneNr)).toBe('123 456 789');
  });
});
