import { createLLamaContext } from 'https://esm.sh/llama-cpp-wasm@0.1.2';

async function run() {
  try {
    const ctx = await createLLamaContext({
      wasmURL: '../lib/llama-cpp.wasm',
      modelURL: '../models/ggml-7b-q4.bin',
      nThreads: 1
    });
    const result = await ctx.run({ prompt: 'Hello,', nPredict: 1 });
    console.log('Generated token:', result);
  } catch (err) {
    console.error('Generation failed:', err);
    process.exitCode = 1;
  }
}
run();
