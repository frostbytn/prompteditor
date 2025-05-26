const assert = require('assert');
const transformers = require('../transformers_stub');

(async () => {
  const pipeline = await transformers.pipeline('text-generation', 'model');
  const res = await pipeline('hello');
  assert(Array.isArray(res), 'Result should be array');
  assert(res[0].generated_text.includes('hello'), 'Output should contain input text');
  console.log('All tests passed');
})();
