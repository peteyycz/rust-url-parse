const path = require('path');
const ffi = require('ffi');

const library_name = path.resolve(__dirname, './target/release/libffi');
const api = ffi.Library(library_name, {
  get_query: ['string', ['string']]
});

module.exports = {
  getQuery: api.get_query
};
