// Функция принимает тип данных и любое количество переменных, перечисленных через запятую
// возвращает только те значения, которые соответствуют заданному типу в виде массива
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
// Функция скрывает все блоки div с классом dialog__response-block
	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
// Функция принимает три параменра
// отображает блок соответствующий blockSelector
// если задан третий параметр, то помещает строку из второго параметра msgText в 
// блок соответствующий третьему параметру spanSelector
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
// отображает блок с классом dialog__response-block_error и помещает строку msgText в блок с Id error
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
// отображает блок с классом dialog__response-block_ok и помещает строку msgText в блок с Id ok
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
// отображает блок с классом dialog__response-block_no-results
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
// Функция фильтрует данные по типам с отлавливанием ошибок
	tryFilterByType = (type, values) => {
		try {
			// запуск функции filterByType и преобразует массив в строку со значениями, перечисленными через запятую
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			// присвоение переменной alertMsg значения в зависимости от того есть ли данные в valuesArray
			const alertMsg = (valuesArray.length) ?
				`Данные с типом ${type}: ${valuesArray}` :
				`Отсутствуют данные типа ${type}`;
			//  отображение результата если нет ошибок
			showResults(alertMsg);
		} catch (e) {
			//  отображение результата если есть ошибки
			showError(`Ошибка: ${e}`);
		}
	};
// присваивание кнопки с Id filter-btn в переменную filterButton
const filterButton = document.querySelector('#filter-btn');
// Назначение обработчикасобытия 'click' кнопке filterButton
filterButton.addEventListener('click', e => {
	// Получение инпутов
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');
// Проверка на пустое поле
	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		// Запрет дейстия по умолчанию
		e.preventDefault();
		// Запуск функции tryFilterByType со значениями инрутов
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

