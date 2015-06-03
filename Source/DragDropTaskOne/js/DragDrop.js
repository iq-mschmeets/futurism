$.fn.extend({
    DragDrop: function (options) {
        var defaults = {
            url: '',
            callback: null
        }
        options = $.extend(defaults, options)
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
        })
    }
})

