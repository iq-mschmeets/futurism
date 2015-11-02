﻿<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Image Display</title>
    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/heroic-features.css" rel="stylesheet">

    

</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Start Bootstrap</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="index.html">Simple JS</a>
                    </li>
                    <li>
                        <a href="Backbone.html">Backbone Implementation</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>
    <!-- Page Content -->
    <div class="container">

       

        <hr>
        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Your Website 2014</p>
                </div>
            </div>
        </footer>
    </div>
    <!-- /.container -->
    <!-- jQuery -->
    <script src="js/jquery.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>


    <script>

        $('span img').DragDrop({
            url: 'http://localhost:63650/Default.aspx/cssSaveFile',
            callback: function (fileEncryptedData) {
                alert('file uploaded212.');
            }
        })
        //$(document).ready(function () {
        //    $('span img').mouseover(function () {
        //        if ($(this).parent().find('input[name=file]').length == 0) {
        //            var htmlFormatFile = $("<input type='file' id='file1' name='file' style='top: 200px;position: absolute;' onchange='uploadFile(this);' onmouseover='applycss(this);' />");
        //            $(this).parent().append(htmlFormatFile);
        //            if ($(this).parent()[0].id > 1) {
        //                var width = (80 * $(this).parent()[0].id) - 80;
        //                $("#file1").css("margin-left", width + 'px');
        //            }
        //        }
        //    });
        //    $('span img').mouseleave(function () {
        //        if ($(this).parent().find("input").length > 0) {
        //            if (!$(this).parent().find("input").is(':hover'))
        //            { $(this).parent().find("input").remove(); }
        //        }
        //        $(this).removeProp("-webkit-transform");
        //        $(this).removeProp("-moz-transform");
        //        $(this).removeProp("opacity");
        //        $(this).removeProp("-webkit-opacity");
        //        $(this).removeProp("-moz-opacity");
        //    });
        //});
        //function uploadFile(obj) {
        //    if (obj.files && obj.files[0]) {
        //        var reader = new FileReader();

        //        reader.onload = function (e) {
        //            $(obj).parent().find('img').attr('src', e.target.result);
        //        }

        //        reader.readAsDataURL(obj.files[0]);
        //    }
        //}
        //function applycss(obj) {
        //    $(obj).parent().find('img').css("-webkit-transform", 'scale(3,3)');
        //    $(obj).parent().find('img').css("-moz-transform", 'scale(3,3)');
        //    $(obj).parent().find('img').css("opacity", 1);
        //    $(obj).parent().find('img').css("-webkit-opacity", 1);
        //    $(obj).parent().find('img').css("-moz-opacity", 1);
        //}
    </script>


</body>
</html>
