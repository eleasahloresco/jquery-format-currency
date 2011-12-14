(function ($) {
	
	/* Might be necessary to use the setTimeout with 0 milliseonds to ensure the change event is fired! */

	$.fn.autoFormatCurrency = function(options) {
		
		var settings = $.extend({
				formatOnStart: true,
				formatString: "n0"
			}, options),

			// Number keys (top of keyboard, and numeric keypad), delete, backspace
			keyCodes = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 46, 8, 110, 190];

		return this.each(function() {
			
			var $this = $(this);

			if (settings.formatOnStart) {
				formatCurrency($this, false);
			}

			$this.off(".autoformatcurrency");
			$this.on("keyup.autoformatcurrency", function(event) {
				if ($.inArray(event.keyCode, keyCodes) > -1) {
					formatCurrency($(this), true);
				}
			});

			$this.on("paste.autoformatcurrency", function(event) {
				formatCurrency($(this), false);
			});

			$this.on("blur.autoformatcurrency", function(event) {
        if ($(this).val() !== $(this).data("originalValue")) {
           $(this).data("originalValue", $(this).val());
           $(this).change();
        } 
    	});

			$(this).data("originalValue", $(this).val());

		});

		function formatCurrency($this, setCaretPosition) {

			var rawValue = $this.val(),
				floatValue = Globalize.parseFloat(rawValue);

			if ($.isNumeric(floatValue)) {
				var formattedValue = Globalize.format(floatValue, settings.formatString),
					caretPosition = 0;

				if (setCaretPosition) {
					caretPosition = $this.caret().end + (formattedValue.length - rawValue.length);
				}

				if (formattedValue !== rawValue) {
					$this.val(formattedValue);

					if (setCaretPosition) {
						$this.caret(caretPosition, caretPosition);
					}
				}
			}

		}

	};

})(jQuery);