var itemFirst = null;
var itemSecond = null;
var isFirst = true;

var linkList = [];

function establishConnections(){
	if(!itemFirst || !itemSecond)
		return;
	console.log('establishConnections()');
	linkList.push(Array(itemFirst, itemSecond));
}

document.addEventListener('click', e => {
	var currentItem = e.target;
	if(currentItem.tagName.toLowerCase() != 'td')
		return;
	console.log('addEventListener()');

	if(isFirst){
		if(itemFirst != null)
			itemFirst.classList.remove('itemFirst');
		itemFirst = currentItem;
		currentItem.classList.toggle('itemFirst');
	} else {
		if(itemSecond != null)
			itemSecond.classList.remove('itemSecond');
		currentItem.classList.toggle('itemSecond');
		itemSecond = currentItem;
	}

	isFirst = !isFirst;
});


//fucking crutch!
setInterval(() => {
	let arrows = document.querySelectorAll('.leader-line');
	arrows.forEach(e => e.remove());

	linkList.forEach(element => {
		new LeaderLine(
			element[0],
			element[1]
		);
	});
}, 1000);