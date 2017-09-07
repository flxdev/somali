function SendMail(form) {
    this.form = form;
    this.init();
}
SendMail.prototype = {
    form: {},
    parentFunction: null,
    init: function () {
        var _this = this;
        if (typeof this.form === 'object') {
            if (this.form.hasOwnProperty('validationConfig') && typeof this.form.validationConfig === "object") {
                this.parentFunction = this.form.validationConfig.onSuccess;
                this.form.validationConfig.onSuccess = function () {
                    return _this.submit();
                }
            } else {
                this.form.onsubmit = function () {
                    return _this.submit();
                }
            }
        }
    },
    submit: function (e) {
        $.ajax({
            url: $(this.form).attr('action'),
            data: $(this.form).serialize(),
            type: $(this.form).attr('method')
        });

        if (typeof this.parentFunction === "function") {
            this.parentFunction(e);
        }

        return false;

    }

};

document.addEventListener("DOMContentLoaded", function () {
    var forms = document.getElementsByClassName('send-mail'),
        count = forms.length;

    for (var i = 0; i < count; i++) {
        new SendMail(forms[i]);
    }

});
