$("#edit_start_time").timepicker();
$("#edit_end_time").timepicker();
$("#edit_date").datepicker();


//This is some widget data to start the process
var gridData = [ {html:'Beep', datarow:1, datacol:1, datasizex:1, datasizey:1},
    {html:'Boop', datarow:2, datacol:1, datasizex:1, datasizey:1},
    {html:'Herp', datarow:1, datacol:2, datasizex:1, datasizey:1},
    {html:'Derp', datarow:2, datacol:2, datasizex:1, datasizey:1},
    {html:'Knock Knock<br />Whos There?<br />THE DOOR!', datarow:1, datacol:3, datasizex:2, datasizey:2},
    {html:'<img src="http://www.hdwallpaperstop.com/wp-content/uploads/2013/11/Spongebob-Squarepants-Cartoon-Wallpaper.jpg" height="320" width="490"></img>', datarow:1, datacol:5, datasizex:3, datasizey:2}];

//Add a double click handler to the knockout binding handlers
ko.bindingHandlers.doubleClick = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var handler = valueAccessor(),
            delay = 200,
            clickTimeout = false;

        $(element).click(function () {
            if (clickTimeout !== false) {
                handler.call(viewModel);
                clickTimeout = false;
            } else {
                clickTimeout = setTimeout(function () {
                    clickTimeout = false;
                }, delay);
            }
        });
    }
};

// The viewmodel contains an observable array of widget data to be 
//    displayed on the gridster
var viewmodel = function () {

    var self = this;
    self.myData = ko.observableArray(gridData);
    //AddOne adds an element to the observable array (called at runtime from doubleClick events)
    self.AddOne = function () {
        
        
        //By doing this, I am adding a new li to the ul.
        //This is due to knockout.js (html reference below)
        //  <ul class="layouts_grid2" data-bind="foreach: myData">
        myViewModel.myData.push({
            html: 'Widget Added After!',
            datarow: 1,
            datacol: 1,
            datasizex: 1,
            datasizey: 1
        });
        
        //If I comment this out, the li is added (by knockout)
        // but gridster doesn't see that a new element was 
        // added to the ul.  So I manually call add_widget here.
        $.each($("#layout li"), function (index, obj) {
            if (!$(obj).hasClass('gs_w')) {
               g.add_widget(obj);
            }
        });
    };

};


var myViewModel = new viewmodel();
ko.applyBindings(myViewModel);

//g is used as a reference to the gridster object that is hooked up 
//  to the ul in the HTML.
var g = $("#layout").gridster({
    widget_margins: [10, 10],
    widget_base_dimensions: [150, 150]
}).data('gridster');