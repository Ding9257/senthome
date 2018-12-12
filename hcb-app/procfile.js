'use strict';

module.exports = (pandora) => {

  pandora
    .fork('assets', './app');

  /**
   * you can also use cluster mode to start application
   */
  // pandora
  //   .cluster('./app');

  /**
   * you can create another process here
   */
  // pandora
  //   .process('background')
  //   .nodeArgs(['--expose-gc']);

  /**
   * more features please visit our document.
   * https://github.com/midwayjs/pandora/
   */

};