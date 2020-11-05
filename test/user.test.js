const User = require('../src/models/user');
const bcrypt = require('bcryptjs');

test('User can Update Status', async () => {
    const email = 'test@email.com';
    const password = bcrypt.hashSync('password');
    const name = 'Test User';

    const user =  await new User({
        email: email,
        password: password,
        name: name,
    });
    user.save();

    const userId = user._id
    const newStatus = 'NEW STATUS'

    const currentUser = User.findByIdAndUpdate(userId);
    currentUser.status = newStatus;

    if (currentUser.status !== newStatus) {
        throw new Error('User status not updated!')
    }
});