(function ($) {
    $.fn.validate = function (validators) {
        var $sender = $(this.selector),
            value = $sender.val(),
            $container = $sender.closest(".require-validate"),
            $error = $container.find(".error-msg");
        if (validators.length > 0) {
            var check;
            for (var i = 0; i < validators.length; i++) {
                check = validators[i];
                if (check.validator) {
                    if (!check.validator(value)) {
                        if ($error.length > 0) {
                            $error.text(check.error).show(500);
                        }
                        else {
                            if ($container.attr("class").indexOf("error") === 0)
                                $container.addClass("error");
                            $error = $(String.format('<span class="error-msg">{0}</span>', check.error));
                            $container.append($error);
                            $error.show(500);
                        }
                        break;
                    } else if ($error.length > 0) $error.text("").hide();
                }
            }
        }
    };
})(jQuery)