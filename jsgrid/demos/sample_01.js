(function() {
    /***************************************************************************************************
     *   Polyfill
     *
     ***************************************************************************************************/
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength,padString) {
            targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
            padString = String((typeof padString !== 'undefined' ? padString : ' '));
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength-this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
                }
                return padString.slice(0,targetLength) + String(this);
            }
        };
    }
    
    Date.prototype.simpleDateTime = function() {
        var dateArr = []
        var timeArr = []
        dateArr.push(this.getFullYear())
        dateArr.push((this.getMonth() + 1).toString().padStart(2, '0'))
        dateArr.push(this.getDate())
        timeArr.push(this.getHours())
        timeArr.push(this.getMinutes())
        timeArr.push(this.getSeconds())
        
        return dateArr.join('-') + ' ' + timeArr.join(':')
    }
    
    
    /***************************************************************************************************
     *   CardViewField
     *
     ***************************************************************************************************/
    var CardView = function(config) { jsGrid.Field.call(this, config) };
    CardView.prototype = new jsGrid.Field({
        css: "date-field",            // redefine general property 'css'
        align: "center",              // redefine general property 'align'
        myCustomProperty: "foo",      // custom property
     
        sorter: function(date1, date2) {
            return new Date(date1) - new Date(date2);
        },
     
        itemTemplate: function(value) {
            var $element = $("<div class='alert alert-primary aaf-cardcell' role='alert'></div>")
            $element.html(value)
            $element.on('click', function() {
                window.columnIndex = this.columnIndex
            }.bind(this))
            return $element;
        },
        
        insertTemplate: function(value) {
            return $("<input>");
        },
     
        filterTemplate: function() {
            return $("<input>");
        },
        
        editTemplate: function(value) {
            $element = $("<input>").val(value);
            $element.on("keydown", function(e) {
                if(e.which === 13) {
                    $("#jsGrid").jsGrid("updateItem");
                    return false;
                }
            });
            return this._editTemplate = $element;
        },
     
        /*insertValue: function() {
            return this._insertPicker.datepicker("getDate").toISOString();
        },*/
     
        editValue: function() {
            return this._editTemplate.val();
        }
    });
    jsGrid.fields.cardView = CardView;
    
    
    /***************************************************************************************************
     *   RowManager Field
     *
     ***************************************************************************************************/
    var RowManager = function(config) { jsGrid.Field.call(this, config) };
    RowManager.prototype = new jsGrid.Field({
        sorter: function(date1, date2) {
            return new Date(date1) - new Date(date2);
        },
     
        itemTemplate: function(object) {
            var $element = $("<div><div class='row'><div class='col'><span name='tv1' class='badge badge-pill badge-primary'></span></div></div><div class='row'><div name='tv2' class='col text-right'></div></div></div>")
            $element.find('[name=tv1]').html(object.value)
            $element.find('[name=tv2]').html(object.dateTime)
            $element.on('click', function() {
                window.columnIndex = this.columnIndex
            }.bind(this))
            return $element;
        },
        
        insertTemplate: function() {
            var object = { value: 0, dateTime: new Date().simpleDateTime() } 
            $element = $("<div class='text-right'><textarea></textarea><span name='tv1' class='aaf-pointer badge badge-pill badge-primary'>SAVE</span></div>")
            $element.find('textarea').val(JSON.stringify(object, null, 2))
            $element.find('span').on('click', function() {
                $("#jsGrid").jsGrid("insertItem");
            })
            return this._insertTemplate = $element;
        },
     
        filterTemplate: function() {
            return $("<input>");
        },
        
        editTemplate: function(object) {
            $element = $("<div class='text-right'><textarea></textarea><span name='tv1' class='aaf-pointer badge badge-pill badge-primary'>SAVE</span></div>")
            $element.find('textarea').val(JSON.stringify(object, null, 2))
            $element.find('span').on('click', function() {
                $("#jsGrid").jsGrid("updateItem");
            })
            return this._editTemplate = $element;
        },
     
        insertValue: function() {
            return JSON.parse(this._insertTemplate.find('textarea').val());
        },
        
        editValue: function() {
            return JSON.parse(this._editTemplate.find('textarea').val());
        }
    });
    jsGrid.fields.rowManager = RowManager;

    
    /***************************************************************************************************
     *   Customize sample data 
     *
     ***************************************************************************************************/
    $.each(db.clients, function(idx, item) {
        item.RowManager = { value: idx, dateTime: new Date().simpleDateTime() }
    });
}());

$(function() {
    var pageSizeOption = [];
    for (var i = 1; i < 11; i++) {
        var num = i * 50;
        var option = { value: num, text: num }
        pageSizeOption.push(option)
    }
    $selectPageSize = $('#selectPageSize select')
    $.each(pageSizeOption, function(idx, item) {
        $selectPageSize.append($('<option>', item));
    })
    $selectPageSize.val(50)
    $selectPageSize.on('change', function() {
        var pageSize = $(this).val()
        if (pageSize) {
            $("#jsGrid").jsGrid("option", 'pageSize', pageSize);
            $("#jsGrid").jsGrid("option", 'paging', true);
        } else {
            $("#jsGrid").jsGrid("option", 'paging', false);
        }
    });
});