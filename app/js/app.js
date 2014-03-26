/** shorthand some functions we'll use a lot we're only worried about HTML5 - capable browsers */
var $ = document.querySelectorAll.bind(document),
    $id = document.getElementById.bind(document),
    $tag = document.getElementsByTagName.bind(document);

(function(){
    // Make sure the console doesn't break on IE
    var log, debug=true;
    if(console && console.debug && debug)
    {
        log = console.debug.bind(console);
    }
    else
    {
        log = function(msg) {};
    }

    function doNothing(evt)
    {
        evt.stopPropagation();
        evt.preventDefault();
    }

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
        //Supposed to stop the browser opening the file if you miss the drop zone... doesn't work!
        document.body.addEventListener('drop', doNothing);

        var fd = $('.file-drop');

        for( var i = fd.length; i--;)
        {
            this.init_file_drop_element(fd[i]);
        }
    };

    /**
     * set up an individual file drop
     */
    HART.prototype.init_file_drop_element = function(ele, idx, arr)
    {
        ele.addEventListener('dragover', this.drag_over.bind(this));
        ele.addEventListener('dragleave', this.drag_exit);
        ele.addEventListener('dragenter', this.drag_enter);
        ele.addEventListener('drop', this.drop_handler.bind(this));
    };

    /**
     * correcty handle dragging of files
     */
    HART.prototype.drag_over = function(evt)
    {
        doNothing(evt);
        evt.dataTransfer.dropEffect = 'copy';
    };

    HART.prototype.drop_handler = function(evt)
    {
        doNothing(evt);
        evt.target.classList.remove('drag-hover');
        evt.target.classList.add('dropped');

        var reader = new FileReader(),
            files = evt.dataTransfer.files;

        for( var i =0, f; f = files[i]; i++)
        {

        }
    };

    HART.prototype.drag_enter = function(evt)
    {
        evt.target.classList.add('drag-hover');
    }

    HART.prototype.drag_exit = function(evt)
    {
        evt.target.classList.remove('drag-hover');
    }

    new HART();
})();
