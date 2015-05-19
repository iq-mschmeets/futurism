(function ($) {

    var currCell = $('td').first();
    var editing = false;
    var selectedCells = [];
    selectedCells.push($('td').first());
    var __curRowIndex;

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
            //deselecting all cells
            $(this).closest('table').find('td').removeClass('selected');
            selectedCells = []; //cleared selected cells

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
                if (e.shiftKey) {
                    if (isTdExistsInArray(currCell, selectedCells) == false) {
                        selectedCells.push(currCell);
                        currCell.addClass('selected');
                    }
                }
                else {
                    $(currCell).closest('table').find('td').removeClass('selected');
                    selectedCells = []; //cleared selected cells
                }

                if (currCell.closest('tr').find('td').length == currCell.index())
                    c = currCell.closest('tr').find('td:first');
                else
                    c = currCell.next();

                if (e.shiftKey) {
                    //if (isTdExistsInArray(c, selectedCells) == false) {
                    //    selectedCells.push(c);
                    //    c.addClass('selected');
                    //}
                    selectedCells = $(currCell).closest('table').find('td[class=selected]');
                }
                else {
                    $(c).closest('table').find('td').removeClass('selected');
                    selectedCells = []; //cleared selected cells
                }

            } else if (e.which == 37) {
                // Left Arrow
                if (e.shiftKey) {
                    var lastColIndex = 0;
                    $(selectedCells).each(function () {
                        if ($(this).index() > lastColIndex)
                            lastColIndex = $(this).index();
                    });

                    $(selectedCells).each(function () {
                        if ($(this).index() == lastColIndex) {
                            $(this).removeClass('selected');
                        }
                    });

                    selectedCells = $(currCell).closest('table').find('td[class=selected]');

                    //selectedCells.push(currCell);
                    //currCell.addClass('selected');
                }
                else {
                    $(currCell).closest('table').find('td').removeClass('selected');
                    selectedCells = []; //cleared selected cells
                }

                if (1 == currCell.index())
                    c = currCell.closest('tr').find('td:last');
                else
                    c = currCell.prev();
            } else if (e.which == 38) {
                // Up Arrow
                if (e.shiftKey) {
                    $(selectedCells).each(function () {
                        var cellIndex = $(this).index();
                        if ($(this).closest('tr').prev().children().eq(cellIndex) != undefined) {
                            $(this).closest('tr').prev().children().eq(cellIndex).toggleClass('selected');
                        }
                    });

                    //if (isTdExistsInArray(currCell, selectedCells) == false) {
                    //    selectedCells.push(currCell);
                    //    currCell.addClass('selected');
                    //}

                    selectedCells = $(currCell).closest('table').find('td[class=selected]');
                }
                else {
                    $(currCell).closest('table').find('td').removeClass('selected');
                    selectedCells = []; //cleared selected cells
                }


                c = currCell.closest('tr').prev().find('td:eq(' + (currCell.index() - 1) + ')');
            } else if (e.which == 40) {
                // Down Arrow
                if (e.shiftKey) {
                    $(selectedCells).each(function () {
                        var cellIndex = $(this).index();
                        if ($(this).closest('tr').next().children().eq(cellIndex) != undefined) {
                            $(this).closest('tr').next().children().eq(cellIndex).addClass('selected');

                            //$($(this).closest('tr').next().children().eq(cellIndex)).each(function () {
                            //    if (isTdExistsInArray($(this), selectedCells) == false) {
                            //        selectedCells.push($(this));
                            //        $(this).addClass('selected');
                            //    }
                            //});

                            selectedCells = $(currCell).closest('table').find('td[class=selected]');
                        }
                    });

                    if (isTdExistsInArray(currCell, selectedCells) == false) {
                        selectedCells.push(currCell);
                        currCell.addClass('selected');
                    }
                }
                else {
                    $(currCell).closest('table').find('td').removeClass('selected');
                    selectedCells = []; //cleared selected cells
                }

                c = currCell.closest('tr').next().find('td:eq(' + (currCell.index() - 1) + ')');
            } else if (!editing && (e.which == 13 || e.which == 32)) {
                // Enter or Spacebar - edit cell
                e.preventDefault();
                edit();
            } else if (!editing && (e.which == 9 && !e.shiftKey)) {
                // Tab
                e.preventDefault();
                if (e.shiftKey) {

                }
                else {
                    if (currCell.closest('tr').find('td').length == currCell.index())
                        c = currCell.closest('tr').find('td:first');
                    else
                        c = currCell.next();

                }
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

        function isTdExistsInArray(td, arr) {
            var a = __isTdExistsInArray(td, arr);
            if (a == undefined || a == false)
                return false;
            else
                return true
        }

        function __isTdExistsInArray(td, arr) {
            var ret = false;

            if (td == undefined)
                return false;

            if (arr.length > 0) {
                $(arr).each(function () {
                    if ($(this).index() == $(td).index() && $(this).closest('tr').index() == $(td).closest('tr').index()) {
                        ret = true;
                        return true;
                    }
                });
            }

            return ret;
        }

    };


}(jQuery));



