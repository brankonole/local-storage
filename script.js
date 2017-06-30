(function(){
	var items = JSON.parse(localStorage.getItem('items')) || [];
	
	if (items.length) {
		showList(items);
	}

	$('.js-form').on('submit', function (e) {
		e.preventDefault();
		
		var inputVal = $('.js-add-item-input').val();

		if (inputVal === '') {
			return;
		}

		items.push({
			text: inputVal,
			done: false
		});

		appendToList(items);
		saveToStorage(items);
		$(this)[0].reset();
	});


	$(document).on('change', '.js-checkbox', function () {
		var $this = $(this),
		    index = $this.closest('.js-item').data('index');

		if ($this.is(':checked')) {
			items[index].done = true;
		} else {
			items[index].done = false;
		}

		saveToStorage(items);
	});

	$(document).on('click', '.js-remove-btn', function (){
		var $this = $(this),
			ordinalNumber = $this.closest('.js-item').data('index');
		
		$this.closest('.js-item').remove();
		
		items[ordinalNumber] = null;

		saveToStorage(items);
		console.log(items);
	});

	function saveToStorage (list) {
		localStorage.setItem('items', JSON.stringify(list));
	}

	function appendToList (list) {
		var index = list.length - 1;
		var listItem = '<li class="js-item" data-index=' + index + '><input type="checkbox" class="js-checkbox" id="item' + index + '" /><label for="item' + index + '"><span class="unchecked">⬜️</span><span class="checked">🌮</span>	<span class="item-content">' + list[list.length - 1].text + '</span></label><span class="remove-btn js-remove-btn">X</span></li>';
		$('.js-items').append(listItem);
	}

	function showList (list) {
		var listItems = list.map(function(el, i) {
			if (el === null) {
				return '';
			}

			var checked = el.done ? 'checked' : '';
			return '<li class="js-item" data-index='+ i +' ><input type="checkbox" class="js-checkbox" id="item' + i + '" ' + checked + ' /><label for="item' + i + '"><span class="unchecked">⬜️</span><span class="checked">🌮</span>	<span class="item-content">' + el.text + '</span></label><span class="remove-btn js-remove-btn">X</span></li>';
		}).join('');

		$('.js-items').html(listItems);
	}
}());