
(function ($) {

    var IntervalId;

    $.fn.LiveProgressMeter = function (options) {

        var progressBar = this;
        var progress = 0;

        // settings
        var config = {
            'url': '',
            'interval': 1000
        };
        if (options) { $.extend(config, options); }

        // call ajax method
        IntervalId = setInterval(function () {

            if (options.url == null || options.url == '')
            {
                console.log('LiveProgressMeter: URL is empty so exiting.');
                clearInterval(IntervalId);
            }

            $.ajax({
                type: "POST",
                url: options.url,
                data: "{}",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    try {
                        //validating if valid json response
                        JSON.parse(JSON.stringify(data.d))

                        //If valid json then move ahead.
                        progress = data.d.percentComplete;
                        $(data.d.messages).each(function () {
                            if (this.cssClass != null && this.cssClass != '') {
                                $('.' + this.cssClass).text(this.text);
                                //console.log(this);
                            }
                        });
                    }
                    catch (err) {
                        console.log('LiveProgressMeter: Not a valid json response from server.');
                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('LiveProgressMeter: ' + xhr.responseText);
                }
            });

            //progress++;
            $(progressBar).css("width", progress + "%");
            $(progressBar).text(progress + "%");

            //onProgress event
            if (options.onProgress !== undefined) {
                options.onProgress(progress);
            }


            if (progress >= 100) {
                clearInterval(IntervalId);
                //Completed event
                if (options.onComplete !== undefined) {
                    options.onComplete(progress);
                }
            }
        }, options.interval);

        return this;

    };

    $.fn.LiveProgressMeter.remove = function () {
        clearInterval(IntervalId);
    };

}(jQuery));



