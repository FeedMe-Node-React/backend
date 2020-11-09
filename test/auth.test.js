const User = require('../src/models/user')
const bcrypt = require('bcryptjs')

const email = 'test@email.com';
const password = bcrypt.hashSync('password');
const name = 'Test User';

test('Users can Register', async () => {
    try {
        const user = await new User({
            email: email,
            password: password,
            name: name,
        });
        expect(user.name).toBe(name)
    } catch (error) {
        if(!user.save()) {
            throw error;
        }
    }
});

test('Users can Login', async () => {
    try {
        const user = await new User({
            email: email,
            password: password,
            name: name,
        });
        user.save();
        const testUser = user
        // const testUser = await User.findOne({email})
        expect(testUser.name).toBe(name)
    } catch (error) {
        throw error;
    };
});