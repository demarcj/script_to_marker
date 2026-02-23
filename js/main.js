(() => {
  'use strict';
  const csInterface = new CSInterface();

  const init = () => {
    themeManager.init();
    const script_to_marker = document.querySelector("#script_to_marker");
    const clear_script = document.querySelector("#clear_script");
    
    script_to_marker.addEventListener(`click`, () => csInterface.evalScript('script_to_marker()'));
    clear_script.addEventListener(`click`, () => csInterface.evalScript('handle_clear_script()'));
  }
  init();
})();
    
