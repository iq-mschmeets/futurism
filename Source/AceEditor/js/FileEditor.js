
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

                    var dataToSend = JSON.stringify({ 'fileContent': editor.getSession().getValue() });

                    var formData = new FormData();
                    formData.append('FileContent', dataToSend);
                    formData.append('FileURL', fileURL);
                    formData.append('FileName', 'value2');
                    formData.append('key2', 'value2');
                    formData.append('key2', 'value2');
                    formData.append('key2', 'value2');

                    $.ajax({
                        url: saveURL,
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: dataToSend, // pass that text to the server as a correct JSON String
                        success: function (msg) {
                            //alert(msg.d);
                            showMessage(__msgLabel, 'File saved...', 'success', true);
                        },
                        error: function (type) {
                            //alert("ERROR!!" + type.responseText);
                            showMessage(__msgLabel, type.responseText, 'error', true);
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
            ////editor.execCommand("find");

            //var range = editor.find('section', {
            //    wrap: true,
            //    caseSensitive: true,
            //    wholeWord: true,
            //    regExp: false,
            //    preventScroll: true // do not change selection
            //})
            ////range.start.column = 0
            ////range.end.column = Number.MAX_VALUE
            ////editor.session.replace(range, "x" + editor.session.getLine(range.start.row) + "x")
            //editor.session.replace(range, 'DEEPAK')
            //editor.selection.setRange(range)

            ////////var html = '<img style="display: block;margin: 0 auto;" src="http://placehold.it/200x100" />';

            ////////if (__findReplaceDialog == null) {
            ////////    __findReplaceDialog = $(document.createElement('div'));
            ////////    __findReplaceDialog.attr({ 'id': '__modalBG', 'style': 'display:none;' });

            ////////    __findReplaceDialog.css({
            ////////        'height': '100px',
            ////////        'width': '400px',
            ////////        'position': 'fixed',
            ////////        'top': '0',
            ////////        'left': '0',
            ////////        'right': '0',
            ////////        'margin': '0 auto',
            ////////        'background-color': 'rgba(0,0,255,0.2)'
            ////////    })
            ////////    __findReplaceDialog.append(html);
            ////////}

            ////////$(__findReplaceDialog).show(10);

            //__findReplaceDialog.html('hello there');
            //__findReplaceDialog.dialog('open');

        }

        return this;
    };

}(jQuery));





