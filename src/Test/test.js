/*eslint no-unused-vars: "off"*/


var internalDNDType = 'text/x-example'; // set this to something specific to your site

function dragStartHandler(event) {
    if (event.target instanceof HTMLLIElement) {
        // use the element's data-value="" attribute as the value to be moving:
        event.dataTransfer.setData(internalDNDType, event.target.dataset.value);
        event.dataTransfer.effectAllowed = 'all'; // only allow moves
    } else {
        event.preventDefault(); // don't allow selection to be dragged
    }
}

function dragEnterHandler(event) {
    console.log(event.target.innerText);
    //event.preventDefault();
}

function dragOverHandler(event) {
    // console.log(event);
    event.preventDefault();
}

function dropHandler(event) {
    var li = document.createElement('li');
    var data = event.dataTransfer.getData(internalDNDType);
    console.log('dropped: ' + data);

    if (data == 'fruit-apple') {
        li.textContent = 'Apples';
    }
    else if (data == 'fruit-orange') {
        li.textContent = 'Oranges';
    }
    else if (data == 'fruit-pear') {
        li.textContent = 'Pears';
    }
    else {
        li.textContent = 'Unknown Fruit';
    }
    event.target.appendChild(li);
}
