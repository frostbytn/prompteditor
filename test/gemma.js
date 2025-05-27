import { Wllama } from 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/index.js';

async function run() {
  try {
    const wasmURL = 'https://cdn.jsdelivr.net/npm/@wllama/wllama@latest/esm/single-thread/wllama.wasm';
    const llama = new Wllama(
      { 'single-thread/wllama.wasm': wasmURL },
      { parallelDownloads: 1, allowOffline: false }
    );
    const modelRepo = 'google/gemma-3-1b-it-qat-q4_0-gguf';
    const modelFile = 'gemma-3-1b-it-qat-q4_0.gguf';
    await llama.loadModelFromHF(modelRepo, modelFile);
    let out = '';
    for await (const chunk of llama.createCompletion('Hello,', { nPredict: 1 })) {
      out += chunk;
    }
    console.log('Generated token:', out);
  } catch (err) {
    console.error('Generation failed:', err);
    if(err && err.stack){
      console.error(err.stack);
    }
    process.exitCode = 1;
  }
}
run();
