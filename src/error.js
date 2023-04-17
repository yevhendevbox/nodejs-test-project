process.on('uncaughtException', () => {
  // Do some thing in here to catch an error
});

process.on('unhandledRejection', () => {
  // do some thing in here to handle async errors in Node.js
});
