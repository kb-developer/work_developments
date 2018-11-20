/*
Reference: http://jsfiddle.net/BB3JK/47/
*/
var customSelect = '';
$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function(){
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

//Reference:
//https://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
;(function($) {

    // Browser supports HTML5 multiple file?
    var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
        isIE = /msie/i.test( navigator.userAgent );

    $.fn.customFile = function() {

        return this.each(function() {

            var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
                $wrap = $('<div class="file-upload-wrapper">'),
                $input = $('<input type="text" class="file-upload-input" />'),
                // Button that will be used in non-IE browsers
                $button = $('<button type="button" class="file-upload-button">Select a File</button>'),
                // Hack for IE
                $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Select a File</label>');

            // Hide by shifting to the left so we
            // can still trigger events
            $file.css({
                position: 'absolute',
                left: '-9999px'
            });

            $wrap.insertAfter( $file )
                .append( $file, $input, ( isIE ? $label : $button ) );

            // Prevent focus
            $file.attr('tabIndex', -1);
            $button.attr('tabIndex', -1);

            $button.click(function () {
                $file.focus().click(); // Open dialog
            });

            $file.change(function() {

                var files = [], fileArr, filename;

                // If multiple is supported then extract
                // all filenames from the file array
                if ( multipleSupport ) {
                    fileArr = $file[0].files;
                    for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                        files.push( fileArr[i].name );
                    }
                    filename = files.join(', ');

                    // If not supported then just take the value
                    // and remove the path to just show the filename
                } else {
                    filename = $file.val().split('\\').pop();
                }

                $input.val( filename ) // Set the value
                    .attr('title', filename) // Show filename in title tootlip
                    .focus(); // Regain focus

            });

            $input.on({
                blur: function() { $file.trigger('blur'); },
                keydown: function( e ) {
                    if ( e.which === 13 ) { // Enter
                        if ( !isIE ) { $file.trigger('click'); }
                    } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
                        // On some browsers the value is read-only
                        // with this trick we remove the old input and add
                        // a clean clone with all the original events attached
                        $file.replaceWith( $file = $file.clone( true ) );
                        $file.trigger('change');
                        $input.val('');
                    } else if ( e.which === 9 ){ // TAB
                        return;
                    } else { // All other keys
                        return false;
                    }
                }
            });

        });

    };

    // Old browser fallback
    if ( !multipleSupport ) {
        $( document ).on('change', 'input.customfile', function() {

            var $this = $(this),
                // Create a unique ID so we
                // can attach the label to the input
                uniqId = 'customfile_'+ (new Date()).getTime(),
                $wrap = $this.parent(),

                // Filter empty input
                $inputs = $wrap.siblings().find('.file-upload-input')
                    .filter(function(){ return !this.value }),

                $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

            // 1ms timeout so it runs after all other events
            // that modify the value have triggered
            setTimeout(function() {
                // Add a new input
                if ( $this.val() ) {
                    // Check for empty fields to prevent
                    // creating new inputs when changing files
                    if ( !$inputs.length ) {
                        $wrap.after( $file );
                        $file.customFile();
                    }
                    // Remove and reorganize inputs
                } else {
                    $inputs.parent().remove();
                    // Move the input so it's always last on the list
                    $wrap.appendTo( $wrap.parent() );
                    $wrap.find('input').focus();
                }
            }, 1);

        });
    }

}(jQuery));

$('input[type=file]').customFile();

// Multiline Text Overflow

/*
CSS Style for selector
.text-of-multiLine--js {
    height: 3.6em; // quantity of lines
}

* */

function ellipsisTextBox(className) {
	var el = document.querySelectorAll(className);

	for(i=0; el.length>i; ++i){
		var wordArray = el[i].innerHTML.split(' ');
		while(el[i].scrollHeight > el[i].offsetHeight) {
			wordArray.pop();
			el[i].innerHTML = wordArray.join(' ') + '...';
		}
	}

}

document.addEventListener('DOMContentLoaded', function(){ // Аналог $(document).ready(function(){
														  // Если должен быть найден один элемент
	if((e = document.querySelector("#form_error_message_frontend + div > div:last-child label")) !== null)
		e.classList.add('last'); // Аналог выборки и присвоения класса
	// Если элементов будет много
	Array.prototype.forEach.call(document.querySelectorAll("#form_error_message_frontend + div > div:last-child label"), function(e){
		e.classList.add('last');
	});
});

function enterNumbersOnly(evt) {
	evt = (evt) ? evt : window.event;
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode > 31 && (charCode < 48 || charCode > 57)) {
		return false;
	}
	return true;
}

// Add class by click on a radio button
var sendingTypes = document.getElementById('buyFromStandForm').querySelectorAll('.sending__radio input[type="radio"]'),
	sendingBlocks = document.querySelectorAll('.target-border');
sendingTypes.forEach(function (item, i, arr) {
	item.addEventListener('click', function () {
		let self = this;
		if (!self.closest('.target-border').classList.contains('active')) {
			for (var i = 0; i < sendingBlocks.length; i++){
				sendingBlocks[i].classList.remove('active');
			};
			self.closest('.target-border').classList.add('active');
		}
	});
});

// Objectify form		
  function toJSONString(form) {
            var obj = {};
            var elements = form.querySelectorAll("input");
            for (var i = 0; i < elements.length; ++i) {
                var element = elements[i];
                var name = element.name;
                var value = element.value;
                //debugger;

                if (name.indexOf("[]") !== -1) {
                    name = name.split("[]")[0];
                    if (obj[name]) {
                        obj[name].push(value);
                        continue;
                    }
                    obj[name] = [];
                    obj[name].push(value);
                    continue;
                }


                if (name) {
                    obj[ name ] = value;
                }
            }

            return obj;
        }
