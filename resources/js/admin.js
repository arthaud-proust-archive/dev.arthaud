window.$ = window.jQuery = require('jquery');


var dragging = false;
var elDragging = null;


// Swap two nodes
const swap = function(nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;

    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);

    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
};

// Check if `nodeA` is above `nodeB`
const isAbove = function(nodeA, nodeB) {
    // Get the bounding rectangle of nodes
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();

    return (rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2);
};

const onDragStart = function(e) {
    e.preventDefault()
    dragging = true;
    elDragging = e.target;
    e.target.parentElement.classList.add('dragging');
}
const handleStart = function(e) {
    e.preventDefault()
    dragging = true;
    elDragging = e.target;
    e.target.parentElement.classList.add('dragging');
}

const onDragEnd = function() {
    dragging = false;
    if(elDragging)elDragging.parentElement.classList.remove('dragging');
}

const drag = function(event) {
    if(dragging) {
        if(event.type == "touchmove") {
            event.pageX = event.changedTouches[0].clientX;
            event.pageY = event.changedTouches[0].clientY;
        } else {
            var eventDoc, doc, body;

            event = event || window.event; // IE-ism
    
            // If pageX/Y aren't available and clientX/Y are,
            // calculate pageX/Y - logic taken from jQuery.
            // (This is to support old IE)
            if (event.pageX == null && event.clientX != null) {
                eventDoc = (event.target && event.target.ownerDocument) || document;
                doc = eventDoc.documentElement;
                body = eventDoc.body;
    
                event.pageX = event.clientX +
                (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY +
                (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                (doc && doc.clientTop  || body && body.clientTop  || 0 );
            }
        }

        var rect = elDragging.getBoundingClientRect();
        if(elDragging.parentNode.nextSibling && event.pageY>rect.top+elDragging.parentNode.offsetHeight) {
            swap(elDragging.parentNode, elDragging.parentNode.nextSibling)
        }
        if(elDragging.parentNode.previousSibling && event.pageY<rect.top-elDragging.parentNode.offsetHeight) {
            swap(elDragging.parentNode.previousSibling, elDragging.parentNode)
        }
    }
} 

$(()=>{
    $('#sections').html(short_sections.map(section => 
    `<section class="sectionCard" data-id="${section.id}" data-order="${section.order}">
    <svg class="sectionCard-move" width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    <span class="sectionCard-title">
    ${section.title} <code>${section.pages.split(',').filter(page=>page!=='').join(', ')}</code>
    ${section.anchor?`<svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`:''}
    ${section.image_url?`<svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`:''}
    </span>
    <a class="sectionCard-edit" href="/edit-section/${section.id}">
    <!--Modifier-->
    <svg width="25" height="25" viewBox="0 0 15 15" fill="none" color="#00D000" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </a>
    </section>`));

    $('#toggleChangeOrder').on('click', function() {
        console.log($(this).text());
        if($(this).text()=="Changer l'ordre des sections") {
            $('.sectionCard-move').fadeIn()
            $('#cancelChangeOrder').fadeIn()

            $(this).text("Enregistrer les changements");
        } else {
            $('.sectionCard-move').fadeOut()
            $(this).text("Changer l'ordre des sections");
            let orders = {};
            $('.sectionCard').each(function(index) {
                // short_sections.filter(section=>section.id==$(this).attr('data-id'))[0].order = index+1;
                orders[$(this).attr('data-id')] = index+1;
            })
            $("#orders").val(JSON.stringify(orders))
            $("#ordersForm").submit();
        }
    })

    $('.sectionCard-move').on('mousedown', onDragStart)
    $('.sectionCard-move').on('touchstart', onDragStart)

    $('#sections').on('mouseup', onDragEnd)
    $('#sections').on('touchend', onDragEnd)
    $('#sections').on('mousemove', drag)
    $('#sections').on('touchmove', drag)

    

})