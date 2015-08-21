var __curImg = null;
var __files = [];
var __options;
$.fn.extend({
    OpenDialog:function()
    {
        var customModal = $('<div id="__dlg1" class="modal fade in" role="dialog" aria-hidden="false" style="display: block; padding-left: 17px;"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><h4 class="modal-title">Detail</h4></div><div class="modal-body">' +
                                        '<div class="form-horizontal">' +
                                        '<fieldset>' +

                                       

                                        '<!-- Text input-->' +
                                        '<div class="form-group">' +
                                        '<label class="col-md-4 control-label" for="__txtName">Name</label>  ' +
                                        '<div class="col-md-4">' +
                                        '<input id="__txtName" name="NAME" type="text" placeholder="Name" class="form-control input-md" required="">' +

                                        '</div>' +
                                        '</div>' +

                                        '<!-- Text input-->' +
                                        '<div class="form-group">' +
                                        '<label class="col-md-4 control-label" for="__txtSubject">Subject</label>  ' +
                                        '<div class="col-md-4">' +
                                        '<input id="__txtSubject" name="SUBJECT" type="text" placeholder="Subject" class="form-control input-md" required="">' +

                                        '</div>' +
                                        '</div>' +

                                        '<!-- Textarea -->' +
                                        '<div class="form-group">' +
                                        '<label class="col-md-4 control-label" for="__txtDescription">Description</label>' +
                                        '<div class="col-md-4">                     ' +
                                        '<textarea class="form-control" id="__txtDescription" name="DESCRIPTION"></textarea>' +
                                        '</div>' +
                                        '</div>' +


                                        '<!-- Textarea -->' +
                                        '<div class="form-group" id="__progress" style="display:none;">' +
                                        '<div class="col-md-8">' +
                                        '<div class="progress">' +
                                        '<div id="__progressbar" class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">70%</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +

                                         '<!-- File Button -->' +
                                        '<div class="control-group">' +
                                        '<label class="control-label" for="__fileupload">Upload File</label>' +
                                        '<div class="controls">' +
                                        '<input id="__fileupload" name="SOURCE_FILE" class="input-file" type="file" multiple="false">' +
                                        '</div>' +
                                        '</div>' +

                                        '</fieldset>' +
                                        '</div>' +

                    '</div><div class="modal-footer"><input type="button" id="__btnSubmit" name="__btnSubmit" onclick="postData()" class="btn btn-success" value="Save" /><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

        if ($('#__dlg').length == 0) {
            $('body').append(customModal);
            //$(this).find($('h3')).clone().appendTo('.custom-modal .modal-header');
            //$(this).find('.device-product, .device-details').clone().appendTo('.custom-modal .modal-body');
            //$('.custom-modal .hide').show();
            $('#__dlg').modal();
        }
        else {
            $('#__dlg').modal();

            $('#__txtName').val('');
            $('#__txtSubject').val('');
            $('#__txtDescription').val('');
            $('#__progress').hide();
            $('#__progressbar').css({ 'width': '0%' });
            $('#__progressbar').text('0');
        }
    },


    artifactCreator: function (options) {
        var defaults = {
            url: '',
            callback: null
        }
        options = $.extend(defaults, options)
        __options = $.extend(defaults, options)
        return this.each(function () {
            var $this = $(this)

            // Stop default browser actions
            $this.bind('dragover', function (event) {
                this.className = 'hover';
                event.stopPropagation()
                event.preventDefault()
            })

            // Stop default browser actions
            $this.bind('dragleave', function (event) {
                this.className = '';
                event.stopPropagation()
                event.preventDefault()
            })

            // Catch drop event
            $this.bind('drop', function (event) {
                // Stop default browser actions
                event.stopPropagation()
                event.preventDefault()

                // Get all files that are dropped
                __files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files

                __curImg = this;

                /////////////////////////////////////////
                //debugger
                //$("#myModal").modal('show');
                var customModal = $('<div id="__dlg" class="modal fade in" role="dialog" aria-hidden="false" style="display: block; padding-left: 17px;"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><h4 class="modal-title">Detail</h4></div><div class="modal-body">'+
                                        '<div class="form-horizontal">'+
                                        '<fieldset>'+

                                        '<!-- Text input-->'+
                                        '<div class="form-group">'+
                                        '<label class="col-md-4 control-label" for="__txtName">Name</label>  '+
                                        '<div class="col-md-4">'+
                                        '<input id="__txtName" name="NAME" type="text" placeholder="Name" class="form-control input-md" required="">'+
    
                                        '</div>'+
                                        '</div>'+

                                        '<!-- Text input-->'+
                                        '<div class="form-group">'+
                                        '<label class="col-md-4 control-label" for="__txtSubject">Subject</label>  '+
                                        '<div class="col-md-4">'+
                                        '<input id="__txtSubject" name="SUBJECT" type="text" placeholder="Subject" class="form-control input-md" required="">'+
    
                                        '</div>'+
                                        '</div>'+

                                        '<!-- Textarea -->'+
                                        '<div class="form-group">'+
                                        '<label class="col-md-4 control-label" for="__txtDescription">Description</label>'+
                                        '<div class="col-md-4">                     '+
                                        '<textarea class="form-control" id="__txtDescription" name="DESCRIPTION"></textarea>'+
                                        '</div>'+
                                        '</div>' +


                                        '<!-- Textarea -->' +
                                        '<div class="form-group" id="__progress" style="display:none;">' +
                                        '<div class="col-md-8">' +
                                        '<div class="progress">' +
                                        '<div id="__progressbar" class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">70%</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +

                                        '</fieldset>'+
                                        '</div>' +

                    '</div><div class="modal-footer"><input type="button" id="__btnSubmit" name="__btnSubmit" onclick="postData()" class="btn btn-success" value="Save" /><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>');

                if ($('#__dlg').length == 0) {
                    $('body').append(customModal);
                    //$(this).find($('h3')).clone().appendTo('.custom-modal .modal-header');
                    //$(this).find('.device-product, .device-details').clone().appendTo('.custom-modal .modal-body');
                    //$('.custom-modal .hide').show();
                    $('#__dlg').modal();
                }
                else
                {
                    $('#__dlg').modal();

                    $('#__txtName').val('');
                    $('#__txtSubject').val('');
                    $('#__txtDescription').val('');
                    $('#__progress').hide();
                    $('#__progressbar').css({ 'width': '0%' });
                    $('#__progressbar').text('0');
                }
                

                ////Convert uploaded file to data URL and pass trought callback
                if (options.callback) {
                    var reader = new FileReader()
                    reader.onload = function (event) {
                        options.callback(event.target.result)
                    }
                    reader.readAsDataURL(__files[0])
                }
                return false
            })

        })
    }
})

function postData() {
    var curSpan = __curImg;

    $('#__progress').show();
    
    if (__files.length == 0)
    {
        debugger
        __files = $('#__fileupload')[0].files;
    }

    var formData = new FormData();
    for (var i = 0; i < __files.length; i++) {
        if (formData) formData.append('SOURCE_FILE', __files[i]);
    }

    var span = $(curSpan).parent();
    var data = $(span).data();
    var elementName = '';//"a__" + data.classid + "__" + data.eid + "__" + data.attributeid;

    var bsModal = $('#__dlg');
    // Fields needed to create a Core.Artifact record.
    var PREFIX = '_COL_';
    formData.append(PREFIX+'NAME', $('#__txtName').val());
    formData.append(PREFIX+'SUBJECT', $('#__txtSubject').val());
    formData.append(PREFIX+'DESCRIPTION', $('#__txtDescription').val());
    formData.append('CLASS.CLASS_ID', '23');
    formData.append('verb', 'Create');
   
    // now post a new XHR request
    if (formData) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', __options.url);
        xhr.onload = function () {
            //progress.value = progress.innerHTML = 100;
        };

        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                var complete = (event.loaded / event.total * 100 | 0);
                $('#__progressbar').css({'width': complete.toString() + '%'});
                $('#__progressbar').text(complete);
            }
        }

        xhr.send(formData);
        if (curSpan != undefined)
        {
            curSpan.className = '';
        }
        

        if (__options.oncomplete) {
            console.log('Upload Completed');
            __options.oncomplete();
        }
    }
}