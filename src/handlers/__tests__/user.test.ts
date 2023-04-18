import * as user from '../user';

describe('user handler', () => {
  it('should create a new User', async () => {
    const req = { body: { username: 'Hello', password: 'world' } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      }
    }
    await user.createNewUser(req, res, () => { });
  });
});
