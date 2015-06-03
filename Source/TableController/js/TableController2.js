var TableController = Backbone.View.extend({
    events: {
        'click': 'click',
        'keydown': 'keyAction',
        'cellSelect': 'cellSelect',
        'cellDeSelect': 'cellDeSelect',
        'rowSelect': 'rowSelect',
        'rowDeSelect': 'rowDeSelect',
        'columnSelect': 'columnSelect'
    },

    initialize: function () {
        this.render();
        $('td').each(function () {
            $(this).attr('tabindex', '0');
        });

        this.currCell = $('td').first();
        this.c = "";

        this.editing = false;
        this.selectedCells = [];
        this.selectedCells.push($('td').first());
        this.__curRowIndex;
        this.prevCell = $('td').first();
        this.triggerEvent = true;
    },

    cellClicked: function (e) {
        console.log(e.target);
    },

    cellSelect: function (e, obj) {
        console.log(obj);
    },

    cellDeSelect: function (e, obj) {
        console.log(obj);
    },

    rowSelect: function (e, obj) {
        console.log(obj);
    },

    rowDeSelect: function (e, obj) {
        console.log(obj);
    },

    columnSelect: function (e, obj) {
        console.log(obj);
    },

    startTriggeringEvents: function () {
        this.triggerEvent = true;
    },

    stopTriggeringEvents: function(){
        this.triggerEvent = false;
    },

    moveToNextCell: function () {
        $(this.currCell).closest('table').find('td').removeClass('selected');
        this.selectedCells = []; //cleared selected cells

        if ($(this.currCell.closest('tr')).find('td').length == $(this.currCell).index())
            this.c = $(this.currCell.closest('tr')).find('td:first');
        else
            this.c = $(this.currCell).next();

        $(this.c).closest('table').find('td').removeClass('selected');
        this.selectedCells = []; //cleared selected cells

        this.selectedCells = $(this.currCell).closest('table').find('td[class=selected]');
    },

    moveToPreviousCell: function () {
        $(this.currCell).closest('table').find('td').removeClass('selected');
        this.selectedCells = []; //cleared selected cells

        if (1 == $(this.currCell).index())
            this.c = $(this.currCell).closest('tr').find('td:last');
        else
            this.c = $(this.currCell).prev();
    },

    moveToNextRow: function () {
        $(this.currCell).closest('table').find('td').removeClass('selected');
        this.selectedCells = []; //cleared selected cells

        this.c = $(this.currCell).closest('tr').next().find('td:eq(' + ($(this.currCell).index() - 1) + ')');
    },

    moveToPreviousRow: function () {
        $(this.currCell).closest('table').find('td').removeClass('selected');
        this.selectedCells = []; //cleared selected cells

        this.c = $(this.currCell).closest('tr').prev().find('td:eq(' + ($(this.currCell).index() - 1) + ')');
    },

    click: function (e) {
        if ($(e.target).is("td")) {
            this.currCell = e.target;

            $(this.currCell).closest('table').find('td').removeClass('selected');
            this.selectedCells = []; //cleared selected cells

            //this.currCell = $(this);
            //$('#edit #text').select();
            $(this.currCell).focus();

            this.c = this.currCell;

            //cellSelect Event
            var data = $(this.c).data();
            var eventObject = {
                "eventObject": [
                    { "el": this.c, "cellIndex": $(this.c).index(), "rowEl": $(this.c).closest('tr'), "data": data }
                ]
            };

            if (this.triggerEvent)
                $(this.currCell).trigger('cellSelect', eventObject);

        }
        else if ($(e.target).is("th")) {
            //Events
            //columnSelect
            var data = $(e.target).data();
            var eventObject = {
                "eventObject": [
                    { "el": $(this.currCell).closest('tr'), "cellIndex": $(this.currCell).index(), "rowEl": $(this.currCell).closest('tr'), "data": data }
                ]
            };

            if (this.triggerEvent)
                $(this.currCell).trigger('columnSelect', eventObject);
        }
    },

    keyAction: function (e) {
        if (e.which == 39) {
            // Right Arrow
            if (e.shiftKey) {
                if (this.isTdExistsInArray(this.currCell, this.selectedCells) == false) {
                    this.selectedCells.push(this.currCell);
                    $(this.currCell).addClass('selected');
                }
            }
            else {
                $(this.currCell).closest('table').find('td').removeClass('selected');
                this.selectedCells = []; //cleared selected cells
            }

            if ($(this.currCell.closest('tr')).find('td').length == $(this.currCell).index())
                this.c = $(this.currCell.closest('tr')).find('td:first');
            else
                this.c = $(this.currCell).next();

            if (e.shiftKey) {
                if (this.isTdExistsInArray(this.c, this.selectedCells) == false) {
                    this.selectedCells.push(this.c);
                    $(this.c).addClass('selected');
                }
            }
            else {
                $(this.c).closest('table').find('td').removeClass('selected');
                this.selectedCells = []; //cleared selected cells
            }

            this.selectedCells = $(this.currCell).closest('table').find('td[class=selected]');


        } else if (e.which == 37) {
            // Left Arrow
            if (e.shiftKey) {
                var lastColIndex = 0;
                $(this.selectedCells).each(function () {
                    if ($(this).index() > lastColIndex)
                        lastColIndex = $(this).index();
                });

                $(this.selectedCells).each(function () {
                    if ($(this).index() == lastColIndex) {
                        $(this).removeClass('selected');
                    }
                });

                this.selectedCells = $(this.currCell).closest('table').find('td[class=selected]');

                //selectedCells.push(currCell);
                //currCell.addClass('selected');
            }
            else {
                $(this.currCell).closest('table').find('td').removeClass('selected');
                this.selectedCells = []; //cleared selected cells
            }

            if (1 == $(this.currCell).index())
                this.c = $(this.currCell).closest('tr').find('td:last');
            else
                this.c = $(this.currCell).prev();
        } else if (e.which == 38) {
            // Up Arrow
            if (e.shiftKey) {
                $(this.selectedCells).each(function () {
                    var cellIndex = $(this).index();
                    if ($(this).closest('tr').prev().children().eq(cellIndex) != undefined) {
                        $(this).closest('tr').prev().children().eq(cellIndex).addClass('selected');
                    }
                });

                if (this.isTdExistsInArray(this.currCell, this.selectedCells) == false) {
                    //selectedCells.push(currCell);
                    //currCell.addClass('selected');
                }

                this.selectedCells = $(this.currCell).closest('table').find('td[class=selected]');
            }
            else {
                $(this.currCell).closest('table').find('td').removeClass('selected');
                this.selectedCells = []; //cleared selected cells
            }

            this.c = $(this.currCell).closest('tr').prev().find('td:eq(' + ($(this.currCell).index() - 1) + ')');



        } else if (e.which == 40) {
            // Down Arrow
            if (e.shiftKey) {
                $(this.selectedCells).each(function () {
                    var cellIndex = $(this).index();
                    if ($(this).closest('tr').next().children().eq(cellIndex) != undefined) {
                        $(this).closest('tr').next().children().eq(cellIndex).addClass('selected');
                    }
                });

                if (this.isTdExistsInArray(this.currCell, this.selectedCells) == false) {
                    //selectedCells.push(currCell);
                    $(this.currCell).addClass('selected');
                }

                this.selectedCells = $(this.currCell).closest('table').find('td[class=selected]');
            }
            else {
                $(this.currCell).closest('table').find('td').removeClass('selected');
                this.selectedCells = []; //cleared selected cells
            }

            this.c = $(this.currCell).closest('tr').next().find('td:eq(' + ($(this.currCell).index() - 1) + ')');


        } else if (!this.editing && (e.which == 13 || e.which == 32)) {
            // Enter or Spacebar - edit cell

        } else if (!this.editing && (e.which == 9 && !e.shiftKey)) {
            // Tab
            e.preventDefault();
            if (e.shiftKey) {

            }
            else {
                if ($(this.currCell).closest('tr').find('td').length == $(this.currCell).index())
                    this.c = $(this.currCell).closest('tr').find('td:first');
                else
                    this.c = $(this.currCell).next();

            }

        } else if (!this.editing && (e.which == 9 && e.shiftKey)) {
            // Shift + Tab
            e.preventDefault();
            this.c = $(this.currCell).prev();
        }


        // If we didn't hit a boundary, update the current cell
        if (this.c.length > 0) {
            this.currCell = this.c;
            this.currCell.focus();

            //Events
            //cellSelect
            var data = $(this.currCell).data();
            var eventObject = {
                "eventObject": [
                    { "el": this.currCell, "cellIndex": $(this.currCell).index(), "rowEl": $(this.currCell).closest('tr'), "data": data }
                ]
            };

            if (this.triggerEvent)
                $(this.currCell).trigger('cellSelect', eventObject);

            //rowSelect
            var data = $(this.currCell).data();
            var eventObject = {
                "eventObject": [
                    { "el": $(this.currCell).closest('tr'), "cellIndex": $(this.currCell).index(), "rowEl": $(this.currCell).closest('tr'), "data": data }
                ]
            };

            if (this.triggerEvent)
                $(this.currCell).trigger('rowSelect', eventObject);


            //cellDeSelect
            data = $(this.prevCell).data();
            eventObject = {
                "eventObject": [
                    { "el": this.prevCell, "cellIndex": $(this.prevCell).index(), "rowEl": $(this.prevCell).closest('tr'), "data": data }
                ]
            };

            if (this.triggerEvent)
                $(this.prevCell).trigger('cellDeSelect', eventObject);

            //rowDeSelect
            data = $(this.prevCell).data();
            eventObject = {
                "eventObject": [
                    { "el": $(this.prevCell).closest('tr'), "cellIndex": $(this.prevCell).index(), "rowEl": $(this.prevCell).closest('tr'), "data": data }
                ]
            };

            if (this.triggerEvent)
                $(this.prevCell).trigger('rowDeSelect', eventObject);

            this.prevCell = this.currCell;
        }

    },

    isTdExistsInArray: function (td, arr) {
        var a = this.__isTdExistsInArray(td, arr);
        if (a == undefined || a == false)
            return false;
        else
            return true
    },

    __isTdExistsInArray: function (td, arr) {
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
    },


    // $el - it's a cached jQuery object (el), in which you can use jQuery functions
    //       to push content. Like the Hello World in this case.
    render: function () {
        //this.$el.html("Hello World");
    }
});

