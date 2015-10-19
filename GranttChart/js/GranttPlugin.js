
(function ($) {

    $.fn.ApplyGrantt = function (options) {

        // settings
        var config = {
            'dataURL': '',
            'el': '',
            'startDateMetaColumn': '',
            'endDateMetaColumn': ''
        };
        if (options) { $.extend(config, options); }

        if (options.dataURL == null || options.el == '' || options.startDateMetaColumn == '' || options.endDateMetaColumn == '') {
            console.log('GranttPlugin: Please pass all parameters.');
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

                    //$(item.d).each(function () {

                    //    if (meta[counter].display == true) {

                    var granttItemValues = [];
                    var granttItemDet = new Object();
                    granttItemDet.from = item.d[5];
                    granttItemDet.to = item.d[7];
                    granttItemDet.label = item.d[descIndex];
                    granttItemDet.customClass = item.d[10];
                    granttItemValues.push(granttItemDet);

                    var granttItem = new Object();
                    granttItem.name = item.d[descIndex];
                    granttItem.desc = item.d[3];
                    granttItem.values = granttItemValues;

                    finalData.push(granttItem);
                    //    }
                    //});

                });

                console.log(finalData);

                $(options.el).gantt({
                    source: finalData,
                    scale: "weeks",
                    minScale: "weeks",
                    maxScale: "months",
                    onItemClick: function (data) {
                        alert("Item clicked - show some details");
                    },
                    onAddClick: function (dt, rowId) {
                        alert("Empty space clicked - add an item!");
                    },
                    onRender: function () {
                        console.log("chart rendered");
                    }
                });

                prettyPrint();

                return data;
            },
            error: function (XHR, textStatus, errorThrown) {
                alert("error: " + errorThrown);
            }
        });



        return this;

    };

}(jQuery));



