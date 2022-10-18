/**
 * Sample file wrapping some legacy jQuery functionality
 *
 * Take your legacy/ad-hoc/random jQuery, Underscores and vanilla JS segments and
 * wrap them in a function closure. 
 * Pass in the libraries you use which are attached to the window/global namespace.
 */

(function ($) {
    var bigArray = ['.selector_1', '.selector_2', '.selector_3', '.selector_4', '.selector_5', '.selector_6'];
    var firstThree = _.first(bigArray, 3);
    _.each(firstThree, function (_element) {
        $(_element).remove();
    });

})(window.jQuery, window._);
