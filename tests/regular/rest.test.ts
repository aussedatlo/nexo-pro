import { getSignature } from '../../src/utils/rest';

const SECRET = 'secret';

describe('Rest utils', () => {
  it('should calculate signature correctly', async () => {
    expect(getSignature(SECRET, '100028998329')).toEqual(
      'Ap/kbdGYLfIxc4SSQTdXHBuJiha+FoQwgWIrRKjRBOk='
    );
    expect(getSignature(SECRET, '100028998330')).toEqual(
      'FoEZ+bqWqp2WCzh7xV8IjW/6kzVhPoOa35hC/lM1Ncc='
    );
  });
});
