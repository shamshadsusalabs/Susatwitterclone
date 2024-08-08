const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const UserSchema = require('../schema/CurrentUser');  // Adjust the path to your actual User model

router.post(
    '/post',
    [check('email', 'Please include a valid email').isEmail()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email } = req.body;
            let user = await UserSchema.findOne({ email });

            if (!user) {
                // If user does not exist, create a new one
                user = new UserSchema({ email });
                await user.save();  // Save the new user to the database

                // Optionally, you could also set a response here or continue to set the cookie as per below
                return res.status(201).json({
                    msg: "User created successfully",
                    user
                });
            }

            // Set cookie with email, set max age of the cookie (e.g., 24 hours)
            res.cookie('userEmail', email, {
                maxAge: 86400000, // 24 hours
                httpOnly: false,
                secure: false, // set to false for testing without HTTPS
                sameSite: 'Lax' // can be set to 'Lax' or 'Strict' for more compatibility in testing environments
            });
            

            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
