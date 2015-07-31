var __imgPosturl;
var __imgPostOptions;

$.fn.extend({
    DragDrop: function (options) {
        var defaults = {
            url: '',
            callback: null
        }
        options = $.extend(defaults, options)

        __imgPosturl = options.url;
        __imgPostOptions = options;

        return this.each(function () {
            var files = []
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
                files = event.originalEvent.target.files || event.originalEvent.dataTransfer.files

                /////////////////////////////////////////


                var formData = new FormData();
                for (var i = 0; i < files.length; i++) {
                    if (formdata) formData.append('file', files[i]);
                }

                var span = $(this).parent();
                var data = $(span).data();
                var elementName = "a__" + data.classid + "__" + data.eid + "__" + data.attributeid;
                formData.append('name', elementName);

                // now post a new XHR request
                if (formdata) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', options.url);
                    xhr.onload = function () {
                        //progress.value = progress.innerHTML = 100;
                    };

                    xhr.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                            var complete = (event.loaded / event.total * 100 | 0);
                        }
                    }

                    xhr.send(formData);
                    this.className = '';
                }


                //////////////////////////////////////////

                // Convert uploaded file to data URL and pass trought callback
                if (options.callback) {
                    var reader = new FileReader()
                    reader.onload = function (event) {
                        options.callback(event.target.result)
                    }
                    reader.readAsDataURL(files[0])
                }
                return false
            })

            $('span img').mouseover(function () {
                var btnId = $($(this).parent()).attr('id') + '_btn';
                if ($(this).parent().find('input[name=file]').length == 0) {
                    var id = $($(this).parent()).attr('id') + '_file';
                    var htmlFormatFile = $('<input type="file" id="' + id + '" name="file" onchange="$().uploadFile(this);" style="display:none;" /><input type="button" value="Upload" id="' + btnId + '" class="btn btn-success btn-sm" style="position:absolute;margin-left:17px;margin-top: -65px;" onclick="$(\'#' + id + '\').click()" onmouseover="$().applycss(this);">');
                    $(this).parent().append(htmlFormatFile);
                    $('#' + id).css("display", "none");
                }
                else {
                    $('#' + btnId).css("display", "block");
                }
            });
            
            $('span img').mouseleave(function () {
                var btnId = $($(this).parent()).attr('id') + '_btn';
                if($('#' + btnId).length > 0)
                {
                    if (!$('#' + btnId).is(':hover'))
                    {
                        $('#' + btnId).css("display", "none");
                        $(this).removeClass('imagesize');
                    }
                }
                
            });
        })
    },
   
    uploadFile: function (obj) {
        if (obj.files && obj.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $(obj).parent().find('img').attr('src', e.target.result);
               
                $(obj).hide();
                var btnId = $($(obj).parent()).attr('id') + '_btn';
                $('#' + btnId).css("display", "none");


                // Get all files that are dropped
                files = obj.files[0];

                /////////////////////////////////////////


                var formData = new FormData();
                for (var i = 0; i < files.length; i++) {
                    if (formdata) formData.append('file', files[i]);
                }

                var span = $(obj).parent();
                var data = $(span).data();
                var elementName = "a__" + data.classid + "__" + data.eid + "__" + data.attributeid;
                formData.append('name', elementName);

                // now post a new XHR request
                if (formdata) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', __imgPosturl);

                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            if (__imgPostOptions.callback) {
                                __imgPostOptions.callback(formData)
                            }
                        }
                    };

                    xhr.onload = function () {
                        //progress.value = progress.innerHTML = 100;
                    };
                  
                    xhr.upload.onprogress = function (event) {
                        if (event.lengthComputable) {
                            var complete = (event.loaded / event.total * 100 | 0);
                        }
                    }
                    
                    xhr.send(formData);
                    this.className = '';

                }

                $(obj).parent().find('img').removeClass('imagesize');
                $('#' + btnId).mouseleave();
                $(obj).parent().find('img').mouseleave();
                
                //////////////////////////////////////////


            }
            reader.readAsDataURL(obj.files[0]);
        }
    },
    applycss: function (obj) {
        $(obj).parent().find('img').addClass('imagesize');
    }
})

