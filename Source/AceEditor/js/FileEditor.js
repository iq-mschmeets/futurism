<<<<<<< .mine
﻿
(function ($) {

    var editor;
    var __urls;
    var __msgLabel;
    var fileURL;
    var __fileName;
    var extension;
    var __findReplaceDialog;
    var __curAnchor;
    var __dataAttrib = [];

    $.fn.MarkupEditor = function (options) {

        if (options == 'save') {
            save();
            return;
        }
        else if (options == 'reset') {
            reset();
            return;
        }
        else if (options == 'findReplace') {
            findReplace();
            return;
        }
        else if (options == 'find') {
            find();
            return;
        }
        else {
            showMessage(__msgLabel, 'No such method defined !!!', 'error', true);
        }


        // settings
        var config = {
            'editorEL': '',
            'fileListEL': 1000,
            'urls': '',
            'msgLabel': ''
        };
        if (options) { $.extend(config, options); }

        //Start***Validating Input parameters
        if (options.editorEL == null || options.editorEL == '') {
            console.error('error: editorEL Parameter is empty.');
            return;
        }

        if (options.fileListEL == null || options.fileListEL == '') {
            console.error('error: fileListEL Parameter is empty.');
            return;
        }

        if (options.urls == null || options.urls == '') {
            console.error('error: urls Parameter is empty.');
            return;
        }
        //End***Validating Input parameters

        __urls = options.urls;
        __msgLabel = options.msgLabel;

        $(options.fileListEL + ' li a').click(function (e) {
            e.preventDefault();

            __curAnchor = $(this);

            __dataAttrib = [];

            $.each(this.attributes, function (i, attrib) {
                if (attrib.name.indexOf('data-') > -1) {
                    var item = {
                        "name": attrib.name,
                        "value": attrib.value
                    };

                    __dataAttrib.push(item);
                }
            });


            $(options.fileListEL + ' li a').each(function (index) {
                $(this).removeClass('selected');
            });

            $(this).addClass('selected');

            fileURL = $(this).attr('href');
            __fileName = $(this).text();
            //var extension = fileURL.replace(/^.*\./, '');
            extension = $(this).attr('data-type');

            $.ajax({
                url: fileURL,
                dataType: "text",
                success: function (data) {

                    editor = ace.edit(options.editorEL.replace('#', ''));
                    editor.setTheme("ace/theme/chrome");
                    if (extension == 'js')
                        extension = 'javascript';
                    editor.getSession().setMode("ace/mode/" + extension.toLowerCase());
                    editor.setValue(data, -1);
                },
                error: function (XHR, textStatus, errorThrown) {
                    alert("error: " + errorThrown);
                }
            });
        });

        function save() {

            if (__urls != null && __urls.length > 0) {
                var saveURL;

                $(__urls).each(function () {
                    if (extension == $(this)[0].type)//If File type match get the Save URL
                    {
                        saveURL = $(this)[0].url;
                    }
                });

                if (saveURL != null) {
                    //alert(saveURL);

                    showMessage(__msgLabel, 'Saving file...', 'info', false);

                    var fileContent = JSON.stringify({ 'fileContent': editor.getSession().getValue() });

                    var formData = new FormData();
                    formData.append('FileContent', fileContent);
                    formData.append('FileURL', fileURL);
                    formData.append('FileName', __fileName);

                    $.each(__dataAttrib, function (item) {
                        formData.append($(this)[0].name , $(this)[0].value);
                    });

                    //var dataToSend = JSON.stringify({ 'fileContent': formData });

                    $.ajax({
                        url: saveURL,
                        type: "POST",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            showMessage(__msgLabel, 'File saved...', 'success', true);
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            showMessage(__msgLabel, err.Message, 'error', true);
                        }

                    });

                }
                else {
                    //alert('No save url defined for the ' + extension + '.');
                    showMessage(__msgLabel, 'No save url defined for the ' + extension + '.', 'error', true);
                }
            }

        }

        function reset() {
            $.ajax({
                url: fileURL,
                dataType: "text",
                success: function (data) {

                    //editor = ace.edit(options.editorEL.replace('#', ''));
                    editor.setTheme("ace/theme/chrome");
                    if (extension == 'js')
                        extension = 'javascript';
                    editor.getSession().setMode("ace/mode/" + extension.toLowerCase());
                    editor.setValue(data, -1);
                },
                error: function (XHR, textStatus, errorThrown) {
                    alert("error: " + errorThrown);
                }
            });
        }

        function showMessage(selector, msg, type, autohide) {
            var cls;
            if (type == 'error')
                cls = 'alert alert-danger';
            else if (type == 'info')
                cls = 'alert alert-info';
            else if (type == 'warning')
                cls = 'alert alert-warning';
            else if (type == 'success')
                cls = 'alert alert-success';
            else
                cls = 'alert alert-info';

            $(selector).removeClass();
            $(selector).addClass(cls);
            $(selector).text(msg);
            $(selector).show();

            if (autohide) {
                setTimeout(function () {
                    $(selector).hide();
                }, 5000);
            }
        }

        function find() {
            editor.execCommand("find");
        }

        function findReplace() {
            editor.execCommand("replace");
        }

        return this;
    };

}(jQuery));





=======

(function ($) {

    var editor;
    var __urls;
    var __msgLabel;
    var fileURL;
    var __fileName;
    var extension;
    var __findReplaceDialog;

    $.fn.MarkupEditor = function (options) {

        if (options == 'save') {
            save();
            return;
        }
        else if (options == 'reset') {
            reset();
            return;
        }
        else if (options == 'findReplace') {
            findReplace();
            return;
        }
        else if (options == 'find') {
            find();
            return;
        }
        else {
            showMessage(__msgLabel, 'No such method defined !!!', 'error', true);
        }


        // settings
        var config = {
            'editorEL': '',
            'fileListEL': 1000,
            'urls': '',
            'msgLabel': ''
        };
        if (options) { $.extend(config, options); }

        //Start***Validating Input parameters
        if (options.editorEL == null || options.editorEL == '') {
            console.error('error: editorEL Parameter is empty.');
            return;
        }

        if (options.fileListEL == null || options.fileListEL == '') {
            console.error('error: fileListEL Parameter is empty.');
            return;
        }

        if (options.urls == null || options.urls == '') {
            console.error('error: urls Parameter is empty.');
            return;
        }
        //End***Validating Input parameters

        __urls = options.urls;
        __msgLabel = options.msgLabel;

        $(options.fileListEL + ' li a').click(function (e) {
            e.preventDefault();

            $(options.fileListEL + ' li a').each(function (index) {
                $(this).removeClass('selected');
            });

            $(this).addClass('selected');

            fileURL = $(this).attr('href');
            __fileName = $(this).text();
            //var extension = fileURL.replace(/^.*\./, '');
            extension = $(this).attr('data-type');
            $.ajax({
                url: fileURL,
                dataType: "text",
                success: function (data) {

                    editor = ace.edit(options.editorEL.replace('#', ''));
                    editor.setTheme("ace/theme/chrome");
                    if (extension == 'js' || extension == 'script'){
                        extension = 'javascript';
                    } else if( extension == 'xslt' ){
                        extension = 'xml';
                    }
console.log("Extension: "+extension);
                    editor.getSession().setMode("ace/mode/" + extension.toLowerCase());
                    editor.setValue(data, -1);
                },
                error: function (XHR, textStatus, errorThrown) {
                    alert("error: " + errorThrown);
                }
            });
        });

        function save() {

            if (__urls != null && __urls.length > 0) {
                var saveURL;

                $(__urls).each(function () {
                    if (extension == $(this)[0].type)//If File type match get the Save URL
                    {
                        saveURL = $(this)[0].url;
                    }
                });

                if (saveURL != null) {
                    //alert(saveURL);

                    showMessage(__msgLabel, 'Saving file...', 'info', false);

                    var obj = { 
                        'fileContent': editor.getSession().getValue(),
                        'fileURL'    : __fileName 
                    };
                    var dataToSend = JSON.stringify( obj );

                    // var formData = new FormData();
                    // formData.append('fileContent', dataToSend);
                    // formData.append('fileURL', fileURL);
                    // formData.append('fileName', 'value2');
                    // formData.append('key2', 'value2');
                    // formData.append('key2', 'value2');
                    // formData.append('key2', 'value2');


                    $.ajax({
                        url: saveURL,
                        type: "POST",
                       // data: formData,
                       // processData: false,

                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: dataToSend // pass that text to the server as a correct JSON String

                    }).always(function (msg) {
                        if( /Exception/i.test( msg ) ){
                            showMessage(__msgLabel, type.responseText, 'error', true);
                        } else {
                            showMessage(__msgLabel, 'File saved...', 'success', true);
                        } 
                    });

                }
                else {
                    //alert('No save url defined for the ' + extension + '.');
                    showMessage(__msgLabel, 'No save url defined for the ' + extension + '.', 'error', true);
                }
            }

        }

        function reset() {
            $.ajax({
                url: fileURL,
                dataType: "text",
                success: function (data) {

                    //editor = ace.edit(options.editorEL.replace('#', ''));
                    editor.setTheme("ace/theme/chrome");
                    if (extension == 'js')
                        extension = 'javascript';
                    editor.getSession().setMode("ace/mode/" + extension.toLowerCase());
                    editor.setValue(data, -1);
                },
                error: function (XHR, textStatus, errorThrown) {
                    alert("error: " + errorThrown);
                }
            });
        }

        function showMessage(selector, msg, type, autohide) {
            var cls;
            if (type == 'error')
                cls = 'alert alert-danger';
            else if (type == 'info')
                cls = 'alert alert-info';
            else if (type == 'warning')
                cls = 'alert alert-warning';
            else if (type == 'success')
                cls = 'alert alert-success';
            else
                cls = 'alert alert-info';

            $(selector).removeClass();
            $(selector).addClass(cls);
            $(selector).text(msg);
            $(selector).show();

            if (autohide) {
                setTimeout(function () {
                    //$(selector).hide();
                    $(selector).text('');
console.log(cls);                    
                    $(selector).removeClass(cls);
                    $(selector).addClass('default-message');
                }, 5000);
            }
        }

        function find() {
            editor.execCommand("find");
        }

        function findReplace() {
            editor.execCommand("replace");
        }

        return this;
    };

}(jQuery));





>>>>>>> .r9
