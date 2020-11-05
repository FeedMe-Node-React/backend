const User = require('../src/models/user')
const bcrypt = require('bcryptjs')

const email = 'test@email.com'
const password = bcrypt.hashSync('password');
const name = 'Test User';

test('Users can Register', async () => {
    const user = await new User({
        email: email,
        password: password,
        name: name,
    });
    if(!user.save()) {
        throw new Error('User was not saved!');
    };
});

test('Users can Login', async () => {
    const user = await new User({
        email: email,
        password: password,
        name: name,
    });
    user.save();

    if(!User.findOne(user._id)) {
        throw new Error('User not found!')
    };
});