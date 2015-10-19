
(function ($) {

    var timeline;
    var data;

    $.fn.ApplyTimeLine = function (options) {

        // settings
        var config = {
            'dataURL': '',
            'el': ''
        };
        if (options) { $.extend(config, options); }

        if (options.dataURL == null || options.el == '') {
            console.log('TimeLinePlugin: Please pass all parameters.');
        }

        $.ajax({
            url: options.dataURL,
            dataType: "text",
            success: function (data) {

                var jsonData = jQuery.parseJSON(data);
                var finalData = [];
                var item;
                var counter = 1;
                var meta;
                var descIndex;

                $(jsonData.data).each(function () {
                    counter = 1;
                    item = this;
                    meta = jsonData.meta;


                    $(meta).each(function () {
                        if (this.group == 0 && this.meta == "ELEMENT.DESCRIPTION") {
                            descIndex = counter;
                            return;
                        }
                        counter++;
                    });

                    var granttItem = new Object();
                    granttItem.start = Date.parse(item.d[5].replace(/-/g, "/")); //item.d[5];
                    granttItem.end = Date.parse(item.d[7].replace(/-/g, "/")); //item.d[7];
                    granttItem.content = item.d[1];

                    finalData.push(granttItem);

                });

                console.log(finalData);

                
                // specify options
                var options = {
                    'width': '100%',
                    'height': '300px',
                    'editable': false,   // enable dragging and editing events
                    'style': 'box'
                };

                // Instantiate our timeline object.
                timeline = new links.Timeline(document.getElementById('mytimeline'), options);

                function onRangeChanged(properties) {
                    document.getElementById('info').innerHTML += 'rangechanged ' +
                            properties.start + ' - ' + properties.end + '<br>';
                }

                // attach an event listener using the links events handler
                //links.events.addListener(timeline, 'rangechanged', onRangeChanged);

                // Draw our timeline with the created data and options
                timeline.draw(finalData);



                return data;
            },
            error: function (XHR, textStatus, errorThrown) {
                alert("error: " + errorThrown);
            }
        });



        return this;

    };

}(jQuery));



