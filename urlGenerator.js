const fs = require('fs');
const url = require('url');

const faker = require('faker');

const createFakeQueryParameter = function createFakeQueryParameter () {
  return [faker.lorem.word(), faker.lorem.word()].join('=');
};

const urlLength = 10000;

const result = new Array(urlLength)
  .fill()
  .map(() => {
    return [
      faker.internet.url(),
      new Array(faker.random.number(15))
        .fill()
        .map(createFakeQueryParameter)
        .join('&')
    ].join('/?')
  });

fs.writeFileSync('./urls.json', JSON.stringify(result))
