/** shorthand some functions we'll use a lot we're only worried about HTML5 - capable browsers */
var $ = document.querySelectorAll,
    $id = document.getElementById,
    $tag = document.getElementsByTagName;

function(){
    /**
     * Constructor
     */
    var HART = function(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            this.init_file_drops();
        } else {
          alert('The File APIs are not fully supported in this browser.');
        }
    }


    /**
     * set up all file drops
     */
    HART.prototype.init_file_drops = function()
    {
        var fd = $('.file-drop');

        fd.forEach(this.init_file_drop_element.bind(this));
    };

    /**
     * set up an individual file drop
     */
    HART.prototype.init_file_drop_element = function(ele, idx, arr)
    {
        ele.addEventListener('dragOver', this.drag_over.bind(this));
        ele.addEventListener('drop', this.drop_handler.bind(this));
    };

    /**
     *
     */
    HART.prototype.drag_over = function(evt)
    {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    };

    new HART();
}();
