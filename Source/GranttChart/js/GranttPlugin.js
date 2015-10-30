
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

        if ((options.dataURL == null && options.name_lookup == null) 
            || options.el == '' 
            || options.startDateMetaColumn == '' 
            || options.endDateMetaColumn == '') {
            console.log('GranttPlugin: Please pass all parameters.');
        }

        if( options.name_lookup ){
            $.getJSON('../request/getid?name_lookup='+options.name_lookup)
             .always( function( resp ){
                load(  '../resource/filter/'+resp.textID+'/data' );
             })
        } else {
            load( options.dataURL );
        }

        function load( dataURL ){

            $.ajax({
                url: dataURL,
                dataType: "text",
                success: function (data) {

                    var jsonData = jQuery.parseJSON(data);
                    var finalData = [];
                    var item;
                    var counter = 0;
                    var meta;

                    $(jsonData.data).each(function () {
                        item = this;
                        meta = jsonData.meta;

                        //$(item.d).each(function () {

                        //    if (meta[counter].display == true) {

                        var granttItemValues = [];
                        var granttItemDet = new Object();
                        granttItemDet.from = item.d[5];
                        granttItemDet.to = item.d[7];
                        granttItemDet.label = item.d[1];
                        granttItemDet.customClass = item.d[10];
                        granttItemValues.push(granttItemDet);

                        var granttItem = new Object();
                        granttItem.name = item.d[1];
                        granttItem.desc = item.d[3];
                        granttItem.values = granttItemValues;

                        finalData.push(granttItem);
                        //    }
                        //});
                        counter++;
                    });

                    console.log(finalData);
                    
                    // Now that the data is transformed, invoke the
                    // gantt plugin.
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

        } // end loadData.

        return this;
    };

}(jQuery));



