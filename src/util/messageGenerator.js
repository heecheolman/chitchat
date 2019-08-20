class MessageGenerator {
  constructor(messages) {
    this.messages = messages;
    console.log('this.messages :: ', this.messages);
  }

  *messageGen() {
    if (!this.messages) return null;
    yield this.messages[0];
    yield this.messages[1];
  }
}
const messages = [
  {
    id: 0,
    content: '0번째메세지',
    createdBy: {
      id: 0,
      userName: 'heecheolman',
    },
    createdAt: '2019-08-01',
  },
  {
    id: 1,
    content: '1번째메세지',
    createdBy: {
      id: 0,
      userName: 'heecheolman',
    },
    createdAt: '2019-08-01',
  },
  {
    id: 2,
    content: '2번째메세지',
    createdBy: {
      id: 0,
      userName: 'heecheolman',
    },
    createdAt: '2019-08-01',
  },
];
const messageGenerator = new MessageGenerator(messages);
const foo = messageGenerator.messageGen();
console.log('foo :: ', foo);
console.log(foo.next());;
console.log(foo.next());;
console.log(foo.next());;
// console.log(messageGenerator.messageGen());
// console.log(messageGenerator.messageGen());
// console.log(messageGenerator.messageGen());
// console.log(messageGenerator.messageGen());
