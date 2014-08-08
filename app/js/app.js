/** shorthand some functions we'll use a lot we're only worried about HTML5 - capable browsers */
var $ = document.querySelectorAll.bind(document),
    $1 = document.querySelector.bind(document),
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

    function domainFromString(url)
    {
        var u = url
            .toLowerCase().replace(/https?:\/\//, '');
        return u.substr(0, u.indexOf('/'));
    }


    /**
     * Constructor
     */
    var HART = function(){
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            this.init_file_drops();
            this.files = {};

            var ele = $1('.file-drop');

            for( var key in localStorage )
            {
                if(!ele.classList.contains('dropped')) { ele.classList.add('dropped');}
                this.render_file({ name: key}, ele);
            }

            this.auto_select_file();

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
        for( var tgt = evt.target; tgt && !tgt.classList.contains('file-drop'); tgt = tgt.parentElement){}

        doNothing(evt);
        tgt.classList.remove('drag-hover');
        tgt.classList.add('dropped');

        var files = evt.dataTransfer.files;

        for( var i =0, f; f = files[i]; i++)
        {
            this.render_file(f, tgt);
            this.parse_file(f, this.auto_select_file.bind(this));

        }
    };

    HART.prototype.get_template = function(name)
    {
         return $id(name).innerHTML.toString();
    }

    HART.prototype.render_file = function(file, ele)
    {
        var tpl = this.get_template('tpl_file');

        ele.innerHTML += Mustache.render(tpl, { "name": file.name });

    };

    HART.prototype.drag_enter = function(evt)
    {
        var tgt = event.target;

        if(tgt.classList.contains('file-drop')){
            tgt.classList.add('drag-hover');
        }
    };

    HART.prototype.drag_exit = function(evt)
    {
        var tgt = event.target;

        if(tgt.classList.contains('file-drop')){
            tgt.classList.remove('drag-hover');
        }
    };

    HART.prototype.parse_file = function(file)
    {
        var reader = new FileReader();

        reader.onload = this.file_opened.bind({ file: file, callback : this.auto_select_file.bind(this) });
        reader.readAsBinaryString(file);
    };

    HART.prototype.file_opened = function(event)
    {
        localStorage[this.name] = event.target.result;
        this.callback();
    };

    HART.prototype.auto_select_file = function()
    {
        this.select_file($1('.file:last-of-type').id);
    };

    HART.prototype.select_file = function(name){


        var sn = $('.selected')
        for( var i = sn.length; i--; )
        {
            sn[i].classList.remove('selected');
        }
        $id(name).classList.add('selected');

        var contents = JSON.parse(localStorage[name]);
        this.render(name, contents);
    };

    HART.prototype.render = function(name, object)
    {
        this.basic_stats(object);
        this.type_stats(object);
        this.domain_stats(object);
    }

    HART.prototype.basic_stats = function(object)
    {
        var div = document.createElement('div');
        div.innerHTML = Mustache.render(this.get_template('tpl_basic_stats'), object);
        document.body.appendChild(div);
    }

    HART.prototype.type_stats = function(object)
    {
        var types = this.entry_stats(object, function(results, entry)
        {
            var mime_type = this.mime_similies(entry.response.content.mimeType);


            if( results[mime_type] ) {
                results[mime_type] ++;
            }
            else
            {
                results[mime_type] = 1;
            }
        }.bind(this));

        console.debug(types);
    }

    HART.prototype.entry_stats = function(object, evalfunction)
    {
         var results = {};

        for( var req in object.log.entries )
        {
            evalfunction(results, object.log.entries[req]);
        }

        return results;
    }

    HART.prototype.mime_similies = function(type)
    {
        return {
            "text/javascript" : 'application/javascript',
            "application/x-javascript" : 'application/javascript',
        }[type] || type;
    }

    HART.prototype.domain_stats = function(object)
    {
        var domains = this.entry_stats(object, function(results, entry){
            var domain = domainFromString(entry.request.url);

            if(results[domain])
            {
                results[domain]++;
            }
            else
            {
                results[domain] = 1;
            }
        });

        console.debug(domains);
    }


    document.body.onload = function() { new HART(); }
})();
