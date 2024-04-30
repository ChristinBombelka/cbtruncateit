/*
 * truncateIt 0.9
 *
 * Copyright Christin Bombelka
 * 2024-04-29
 * https://github.com/ChristinBombelka/
 */

; (function ($, window, document, undefined) {
	var pluginName = 'truncateIt',
		defaults = {
			duration: 250,
			method: 2, //method 1 - Truncate by cell height, method 2 - Truncate by lines with line-clamp
			heightclose: 24,
			lines: 3,
			labelopen: 'open',
			labelclose: 'close',
			onlytruncate: false,
			autoCloseInContainer: false,
			afterInit: $.noop,
			beforeOpen: $.noop,
			afterOpen: $.noop,
			beforeClose: $.noop,
			afterClose: $.noop,
			update: $.noop,
		}

	function runTruncate() {
		$('.truncateit').each(function () {

			var container = $(this),
				wrap = container.find('.truncateit__wrap'),
				content = container.find('.truncateit__content');

			container.removeClass('truncateit--disable');

			if (container.hasClass('truncateit--method-2')) {
				var lineHeight = parseFloat(content.css('line-height'));
				wrap.data('heightclose', lineHeight * wrap.data('lines'));
			}

			if (wrap.data('heightclose') >= content.height()) {
				container.addClass('truncateit--disable');

				wrap.css('height', '');

			} else {
				wrap.data('heightopen', content.height());

				if (container.hasClass('truncateit--open')) {
					wrap.css('height', wrap.data('heightopen'));
				} else {
					wrap.css('height', wrap.data('heightclose'));
				}
			}
		});
	}
	runTruncate();

	function runClose(container, options) {
		var wrap = container.find('.truncateit__wrap');

		if ($.isFunction(options.beforeClose)) {
			options.beforeClose.call(this, container, wrap);
		}

		wrap.css('height', wrap.data('heightopen') + 'px');

		setTimeout(function () {
			wrap.css('height', wrap.data('heightclose') + 'px');

			setTimeout(function () {

				container.removeClass('truncateit--open');

				if ($.isFunction(options.afterClose)) {
					options.afterClose.call(this, container, wrap);
				}
			}, options.duration);
		})
	}

	function runOpen(container, options) {
		var wrap = container.find('.truncateit__wrap');

		wrap.css('height', wrap.data('heightopen') + 'px');

		container.addClass('truncateit--open');

		setTimeout(function () {

			wrap.css('height', '');

			if ($.isFunction(options.afterOpen)) {
				options.afterOpen.call(this, container, wrap);
			}
		}, options.duration);
	}

	function Plugin(element, options) {
		this.options = $.extend({}, defaults, options, $(element).data());
		this._defaults = defaults;
		this._name = pluginName;
		this.element = element;
		this.init(this.options);
		this.attachEvents(this.element, this.options);
	}

	Plugin.prototype = {
		init: function (options) {
			var item = $(this.element);
			var labelopen = options.labelopen;
			var labelclose = options.labelclose;

			if (item.data('labelopen')) {
				labelopen = item.data('labelopen')
			}

			if (item.data('labelclose')) {
				labelclose = item.data('labelclose')
			}

			var buttonShow = $('<span class="truncateit__button truncateit__button-show">' + labelopen + '</span>');
			var butttonHide = $('<span class="truncateit__button truncateit__button-hide">' + labelclose + '</span>');
			var buttons = $('<span class="truncateit__buttons"></span>');

			item.addClass('truncateit__wrap');

			item.wrap('<div class="truncateit"></div>').data(options);

			item.wrapInner('<div class="truncateit__content">');

			if (options.onlytruncate) {
				buttons.addClass('truncateit__buttons--disabled');
			}

			if (item.data('heightclose')) {
				item.data('heightclose', item.data('heightclose'));
			} else {
				item.data('heightclose', options.heightclose);
			}

			item.css({
				'transition-duration': options.duration + 'ms',
			});

			butttonHide.appendTo(buttons);
			buttonShow.appendTo(buttons);

			buttons.insertAfter(item);

			if (options.method == 2) {
				var content = item.find('.truncateit__content'),
					previewText = content.clone();

				item.closest('.truncateit').addClass('truncateit--method-2');

				previewText
					.removeClass('truncateit__content')
					.addClass('truncateit__preview')
					.appendTo(item);

				previewText.css({
					'-webkit-line-clamp': options.lines.toString(),
				});

				item.data('lines', options.lines);
			}

			if ($.isFunction(options.afterInit)) {
				options.afterInit.call(this, item);
			}

			runTruncate();

		},
		attachEvents: function (el, options) {
			var container = $(el).closest('.truncateit');

			container.on('click', '.truncateit__button', function () {
				var item = $(this),
					container = item.closest('.truncateit');

				if ($.isFunction(options.beforeOpen)) {
					options.beforeOpen.call(this, container, item);
				}

				if (item.hasClass('truncateit__buttons--disabled')) {
					return;
				}

				if (container.hasClass('truncateit--open')) {
					runClose(container, options);
				} else {

					if (options.autoCloseInContainer) {
						var otherOpen = $(options.autoCloseInContainer).find('.truncateit--open');

						if (otherOpen.length) {
							runClose(otherOpen);
						}
					}

					runOpen(container, options);
				}
			});

			if (!$(document).data('truncateit-initialized')) {
				$(window).on('resize', function () {
					runTruncate();
				});

				$(document).data('truncateit-initialized', true);
			}
		}
	}

	$.fn.truncateit = function (options) {

		if (options == 'update') {
			runTruncate();
			return;
		}

		return this.each(function () {
			var el = $(this);

			if (typeof options === 'undefined') {
				options = {}
			}

			if (el.data('onlytruncate')) {
				options.onlytruncate = el.data('onlytruncate');
			}

			if (el.data('truncatelines')) {
				options.lines = el.data('truncatelines');
			}

			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			} else if ($.isFunction(Plugin.prototype[options])) {
				$.data(this, 'plugin_' + pluginName)[options]();
			}
		});

	}
})(jQuery, window, document);