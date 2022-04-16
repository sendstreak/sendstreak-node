# Tinkermail Node.js SDK

Tinkermail is a transactional and marketing email sending platform for the growing businesses.

> NOTE: The platform is currently in closed beta!

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