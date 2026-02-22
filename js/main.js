(() => {
  'use strict';
  const csInterface = new CSInterface();

  const init = () => {
    themeManager.init();
    const btn_test = document.querySelector("#btn_test");

    const callback = () => undefined;
    const init_script = (eval_script, param, has_callback = true) => {
      has_callback ? eval_script(param, () => callback()) : eval_script(param);
    };
    
    btn_test.addEventListener(`click`, () => init_script(csInterface.evalScript, 'sayHello()'));
  }
  init();
})();
    
