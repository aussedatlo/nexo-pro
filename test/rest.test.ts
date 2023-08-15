import { getSignature } from '../src/utils/rest';

const SECRET = 'secret';

describe('Rest utils', () => {
  it('should calculate signature correctly', async () => {
    expect(getSignature(SECRET, new Date(100028998329).toString())).toEqual(
      'Bmcn7cMMsUXbc1qF+G+DI2ik2Tdv5Sj80cNscMJnM3w='
    );
    expect(getSignature(SECRET, new Date(100128998329).toString())).toEqual(
      'hwVFyOdwQJ2sUoSGZpuc0TLhxhKAo4csxQiHnh8ez+o='
    );
  });
});
