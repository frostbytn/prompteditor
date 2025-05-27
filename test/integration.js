import { Wllama } from 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/index.js';

async function run() {
  try {
    const wasmURL = 'https://cdn.jsdelivr.net/npm/@wllama/wllama@2.3.1/esm/single-thread/wllama.wasm';
    const modelURL = 'https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_0.gguf';
    const llama = new Wllama({ 'single-thread/wllama.wasm': wasmURL });
    await llama.loadModelFromUrl(modelURL);
    const result = await llama.createCompletion('Hello,', { nPredict: 1 });
    console.log('Generated token:', Array.isArray(result) ? result.join('') : result);
  } catch (err) {
    console.error('Generation failed:', err);
    if(err && err.stack){
      console.error(err.stack);
    }
    process.exitCode = 1;
  }
}
run();
