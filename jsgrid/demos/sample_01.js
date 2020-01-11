(function() {
    var CardViewField = function(config) {
        jsGrid.Field.call(this, config);
    };
    
    CardViewField.prototype = new jsGrid.Field({
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
     
    jsGrid.fields.cardViewField = CardViewField;
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