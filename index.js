// Practicing with tasks vs microtasks
// https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide

new Promise(() => console.log('0. promise constructor')); // trick question: we aren't resolving anything,which means we just have a body that is run synchronously

// WebAPIs push to the task queue
setTimeout(() => {
  console.log('1. timeout 1')
}, 0);
setTimeout(() => {
  console.log('2. timeout 2')
}, 0);

// Promises, MutationObserver, and queueMicrotask push to the microtask queue
Promise.resolve('2. promise').then(console.log);
queueMicrotask(() => console.log('3. queueMicrotask'));
Promise.resolve('2a. promise').then(console.log);

// process.nextTick is a Node.js specific microtask and it is executed before Promises, MutationObserver, and queueMicrotask
process.nextTick(() => console.log('4. nextTick 1'));
process.nextTick(() => console.log('5. nextTick 2'));
// https://www.red-gate.com/simple-talk/development/javascript/microtask-queues-in-node-js-event-loop/#:~:text=The%20microtask%20queue%20is%20divided,nextTick()

// new MutationObserver(() => console.log('5. Mutation obs')).observe(document.body, { attributes: true }); // client only

// All microtasks are executed before the next task
// 0. promise constructor
// 4. nextTick 1
// 5. nextTick 2
// 2. promise
// 3. queueMicrotask
// 1. timeout 1
// 2. timeout 2

// What determines when something is ticked?
// https://stackoverflow.com/questions/25915634/difference-between-process-nexttick-and-setimmediate


// promises that don't resolve never call .then
new Promise(() => console.log('0. promise constructor'))
  .then(() => console.log(`this is never called, so even thouh it returns "undefined", since it's never Challed neither is the second then`))
  .then(() => console.log('2. promise then'));

