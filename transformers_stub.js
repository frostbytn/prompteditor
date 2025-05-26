(function(global){
  async function pipeline(task, model){
    return async function(text, options){
      return [{ generated_text: `[stub:${model}] ${text}` }];
    };
  }
  const transformers = { pipeline };
  if (typeof module !== 'undefined' && module.exports){
    module.exports = transformers;
  } else {
    global.transformers = transformers;
  }
})(typeof globalThis !== 'undefined' ? globalThis : window);
