# Tinkermail Node.js SDK

[Tinkermail](https://www.tinkermail.io) is a simple interface that lets you integrate quickly to Amazon SES, Gmail or any other SMTP server to send your transactional emails easily and pretty much for FREE.

## Installation

```sh
$ npm install tinkermail-node
```

## Usage

```javascript
const TinkerMail = require('tinkermail-node');
const tinkerMail = new TinkerMail('YOUR_API_KEY');

// Push your contacts to tinkermail with as many attributes as you want
await tinkerMail.updateContact({
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    onboarded: false
});

// Send them emails using predefined templates
await tinkerMail.sendMail('johndoe@example.com', 'customer-welcome-email', {
    username: 'john_doe'
});
```