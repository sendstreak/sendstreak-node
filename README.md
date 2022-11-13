# SendStreak Node.js SDK

[SendStreak](https://www.sendstreak.com) is a simple interface that lets you integrate quickly to Amazon SES, Gmail or any other SMTP server to send your transactional emails easily and pretty much for FREE.

## New package!

Now with no dependencies and scoped package name!

## Installation

```sh
$ npm install --save-exact @sendstreak/sendstreak-node
```

## Usage

```javascript
const SendStreak = require('@sendstreak/sendstreak-node');
const sendStreak = new SendStreak('YOUR_API_KEY');

// Push your contacts to SendStreak with as many attributes as you want
await sendStreak.updateContact({
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    onboarded: false
});

// Send them emails using predefined templates
await sendStreak.sendMail('johndoe@example.com', 'customer-welcome-email', {
    username: 'john_doe'
});
```