/*!
 * jQuery Seperate Plugin v1.0.0
 * https://github.com/davemedema/jquery-seperate
 *
 * @author Dave Medema / @davemedema
 * @version 1.0.0
 * @preserve
 *
 * Copyright 2013 Dave Medema
 * This work is free. You can redistribute it and/or modify it under the
 * terms of the Do What The Fuck You Want To Public License, Version 2,
 * as published by Sam Hocevar. See LICENSE.txt for more details.
 */

(function($) {
  'use strict';

  var Seperate = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.seperate.defaults, options || {});
    this.insert();
  };

  Seperate.prototype = {

    constructor: Seperate,

    insert: function() {
      var that = this,
          rowElements = [],
          rowTop = 0;

      // Clear old seperators
      $('.sep', this.$element).remove();

      // Match rows
      this.$element.children().each(function() {
        var $el = $(this);

        if ($el.position().top !== rowTop) {
          for (var i = 0; i < rowElements.length; i++) {
            if ((i + 1) === rowElements.length) break;
            rowElements[i].after(that.options.sep);
          }

          rowElements = [];
          rowTop = $el.position().top;
        }

        rowElements.push($el);
      });

      // Match final row
      for (var j = 0; j < rowElements.length; j++) {
        if ((j + 1) === rowElements.length) break;
        rowElements[j].after(that.options.sep);
      }
    }

  };

  var old = $.fn.seperate;

  $.fn.seperate = function(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('seperate');
      if (!data || data === 'yes') {
        $this.data('seperate', (data = new Seperate(this, option)));
      } else {
        data.insert();
      }
    });
  };

  $.fn.seperate.defaults = {
    sep: '<li class="sep">/</li>'
  };

  $.fn.seperate.noConflict = function() {
    $.fn.seperate = old;
    return this;
  };

  function seperate() {
    $('[data-seperate="yes"]').each(function() {
      $(this).seperate();
    });
  }

  // Seperate on DOM ready
  $(seperate);

  // Seperate on resize
  $(window).resize(seperate);

})(window.jQuery);
