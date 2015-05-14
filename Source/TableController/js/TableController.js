(function ($) {

    var currCell = $('td').first();
    var editing = false;

    $.fn.TableController = function (options) {

        // settings
        var config = {
            'tableId': ''
        };

        if (options) { $.extend(config, options); }

        //Start***Validating Input parameters
        if (options.tableId == null || options.tableId == '') {
            console.error('error: tableId Parameter is empty.');
            return;
        }
        //////////////////////////////////////////////////////////////////////

        //***Adding tabIndex attribute to each cell
        $('td').each(function () {
            $(this).attr('tabindex', '0');
        });


        var currCell = $('td').first();
        var editing = false;

        // User clicks on a cell
        $('td').click(function () {
            currCell = $(this);
            $('#edit #text').select();
            currCell.focus();
            
            var c = currCell;

            //cellDeSelect event
            if (options.cellDeSelect !== undefined) {
                options.cellDeSelect(c.prev());
            }
            //cellSelect event
            if (options.cellSelect !== undefined) {
                options.cellSelect(c);
            }
            //rowSelect event
            if (options.rowSelect !== undefined) {
                options.rowSelect(c.closest('tr'));
            }
            //rowDeSelect event
            if (options.rowDeSelect !== undefined) {
                options.rowDeSelect(c.closest('tr').prev());
            }

        });
        
        //columnSelect event
        $('thead,tr,th').click(function () {
            if (options.columnSelect != undefined) {
                options.columnSelect();
            }
        });


        // User navigates table using keyboard
        $(options.tableId).keydown(function (e) {
            var c = "";
            if (e.which == 39) {
                // Right Arrow
                if (e.shiftKey)
                {
                    c.focus();
                }
                else
                    c = currCell.next();
            } else if (e.which == 37) {
                // Left Arrow
                c = currCell.prev();
            } else if (e.which == 38) {
                // Up Arrow
                c = currCell.closest('tr').prev().find('td:eq(' + (currCell.index() - 1) + ')');
            } else if (e.which == 40) {
                // Down Arrow
                if (e.shiftKey)
                {
                    c.focus();
                }
                else
                    c = currCell.closest('tr').next().find('td:eq(' + (currCell.index() - 1) + ')');
            } else if (!editing && (e.which == 13 || e.which == 32)) {
                // Enter or Spacebar - edit cell
                e.preventDefault();
                edit();
            } else if (!editing && (e.which == 9 && !e.shiftKey)) {
                // Tab
                e.preventDefault();
                c = currCell.next();
            } else if (!editing && (e.which == 9 && e.shiftKey)) {
                // Shift + Tab
                e.preventDefault();
                c = currCell.prev();
            }

            // If we didn't hit a boundary, update the current cell
            if (c.length > 0) {
                currCell = c;
                currCell.focus();
                //cellDeSelect event
                if (options.cellDeSelect !== undefined) {
                    options.cellDeSelect(c.prev());
                }
                //cellSelect event
                if (options.cellSelect !== undefined) {
                    options.cellSelect(c);
                }
                //rowSelect event
                if (options.rowSelect !== undefined) {
                    options.rowSelect(c.closest('tr'));
                }
                //rowDeSelect event
                if (options.rowDeSelect !== undefined) {
                    options.rowDeSelect(c.closest('tr').prev());
                }

            }
        });


        //////////////////////////////////////////////////////////////////////
    };


}(jQuery));



