window.$ = window.jQuery = require('jquery');
axios = require('axios');

const deleteCard = function() {
    $(this).parent().remove()
}

$(()=>{
    try {
        $('#linksText').val(JSON.parse($('#links').val()).map(link=>link.join('|')).join('\n'))
    } catch(e) {
        $('#linksText').val('');
    }
    $('#linksText').on('keyup', function() {
        // try {
            $('#links').val(JSON.stringify($(this).val().split('\n').filter(link=>/.+\|.+/g.test(link)).map(link=>link.split('|'))))
            console.log($('#links').val());
        // } catch(e) {}
    });

    if(sectionType=="text") {
        $('#contentEdition').html(`
        <textarea rows=4 id="content" class="form-control" name="content" required autocomplete="off">${sectionOldContent.decoded}</textarea>
        `)
        $("#submitForm").on('click', function() {
            $('#content').val($('#content').val().encoded)
            console.log($('#content').val().encoded);
            // return
            // $('#content').val($('#content').val().replace(/\n/g, '<br>'))
            $('#editForm').submit()
        })
    } 
    // else if (sectionType=="cards") {
    //     $('#contentEdition').html(`
    //         <input id="content" type="hidden" name="content">
    //         ${
    //             JSON.parse(sectionOldContent).map(card=>`
    //             <div class="cardEdition">
    //                 <svg class="cardDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //                 <input class="cardTitle form-control" type="text" placeholder="Titre de la carte" value="${card[0].replace(/<br>/g, '\n')}">
    //                 <textarea rows=4 class="cardContent form-control" placeholder="Contenu de la carte">${card[1].replace(/<br>/g, '\n')}</textarea>
    //             </div>
    //             `).join('')
    //         }
            
    //         <svg id="cardAdd" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //     `)
    //     $('.cardDelete').on('click', deleteCard);
    //     $('#cardAdd').on('click', function() {
    //         $(`
    //         <div class="cardEdition">
    //             <svg class="cardDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //             <input class="cardTitle form-control" type="text" placeholder="Titre de la carte">
    //             <textarea rows=4 class="cardContent form-control" placeholder="Contenu de la carte"></textarea>
    //         </div>
    //         `).insertBefore(this)

    //         $('.cardDelete').on('click', deleteCard);
    //     })
    //     $('#submitForm').off("click");
    //     $("#submitForm").on('click', function() {
    //         var content = [];
    //         $('#contentEdition .cardEdition').each(function() {
    //             content.push([
    //                 $(this).find('.cardTitle').val(),
    //                 $(this).find('.cardContent').val()
    //             ]);
    //         });
    //         $('#content').val(JSON.stringify(content).replace(/\\n/g, '<br>'));
    //         $('#editForm').submit()
    //     })
    // } else if (sectionType=="list") {
    //     $('#contentEdition').html(`
    //         <input id="content" type="hidden" name="content">
    //         ${
    //             JSON.parse(sectionOldContent).map(line=>`
    //             <div class="lineEdition">
    //                 <svg class="lineDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //                 <input class="lineTitle form-control" type="text" placeholder="Titre de la ligne" value="${line[0].replace(/<br>/g, '\n')}">
    //                 <input class="lineContent form-control" type="text" placeholder="Éléments, séparés par une virgule" value="${line[1].join(', ').replace(/<br>/g, '\n')}">
    //             </div>`).join('')
    //         }
    //         <svg id="lineAdd" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //     `)
    //     $('.lineDelete').on('click', deleteCard);
    //     $('#lineAdd').on('click', function() {
    //         $(`
    //         <div class="lineEdition">
    //             <svg class="lineDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //             <input class="lineTitle form-control" type="text" placeholder="Titre de la ligne">
    //             <input class="lineContent form-control" type="text" placeholder="Éléments, séparés par une virgule">
    //         </div>
    //         `).insertBefore(this)

    //         $('.lineDelete').on('click', deleteCard);
    //     })
    //     $('#submitForm').off("click");
    //     $("#submitForm").on('click', function() {
    //         var content = [];
    //         $('#contentEdition .lineEdition').each(function() {
    //             content.push([
    //                 $(this).find('.lineTitle').val(),
    //                 $(this).find('.lineContent').val().split(',').map(el=>{
    //                     if(el.charAt(0)==' ') {
    //                         return el.slice(1,el.length-1)
    //                     } else {
    //                         return el
    //                     }
    //                 })
    //             ]);
    //         });
    //         $('#content').val(JSON.stringify(content).replace(/\\n/g, '<br>'));
    //         $('#editForm').submit()
    //     })

    // }
     else if (sectionType=="items") {
        $('#contentEdition').html(`
            <textarea rows=4 class="cardContent form-control" id="content" name="content" required autocomplete="off">${sectionOldContent.decoded}</textarea>
        `)
        $('#itemsEdition').html(`
            <input id="items" type="hidden" name="items">
            ${
                JSON.parse(sectionOldItems).map((item, index)=>`
                <div class="itemEdition">
                    <svg class="itemDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    <img class="itemImage form-control" type="text" src="${item[0]}">
                    <input class="itemInputImage" data-index="${index}" type="file">
                    <input class="itemUrl form-control" type="text" placeholder="Url de l'item" value="${item[1]}">
                    <input class="itemTitle form-control" type="text" placeholder="Titre de l'item" value="${item[2]}">
                    <textarea rows=3 class="itemDesc form-control" type="text" placeholder="Description de l'item">${item[3].decoded}</textarea>
                </div>`).join('')
            }
            <svg id="itemAdd" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
        `)
        $('.itemDelete').on('click', deleteCard);
        $('.itemInputImage').on('change', sendItemImage);
        $('#itemAdd').on('click', function() {
            let newItems = JSON.parse(sectionOldItems);
            newItems.push(['','','','']);
            sectionOldItems = JSON.stringify(newItems);
            $(`
            <div class="itemEdition">
                <svg class="itemDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                <img class="itemImage form-control" type="text" src="" alt="Aucune image">
                <input class="itemInputImage" data-index="${JSON.parse(sectionOldItems).length-1}" type="file">
                <input class="itemUrl form-control" type="text" placeholder="Url de l'item" value="">
                <textarea rows=3 class="itemDesc form-control" type="text" placeholder="Description de l'item"></textarea>
            </div>
            `).insertBefore(this)
            $('.itemInputImage').on('change', sendItemImage);
            $('.itemDelete').on('click', deleteCard);
        })
        $('#submitForm').off("click");
        $("#submitForm").on('click', function() {
            var content = [];
            $('#itemsEdition .itemEdition').each(function() {
                content.push([
                    $(this).find('.itemImage').attr('src'),
                    $(this).find('.itemUrl').val(),
                    $(this).find('.itemTitle').val(),
                    // $(this).find('.itemDesc').val().replace(/\n/gm, '\\n'),
                    $(this).find('.itemDesc').val().encoded,
                ]);
            });
            $('#items').val(JSON.stringify(content));
            // console.log(content);
            $('#editForm').submit()
        })
    } 
    // else if (sectionType=="tarifs") {
    //     $('#contentEdition').html(`
    //         <input id="content" type="hidden" name="content">
    //         ${
    //             JSON.parse(sectionOldContent).map(tarif=>`
    //             <div class="tarifEdition">
    //                 <svg class="tarifDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //                 <textarea rows=2 class="tarifTitle form-control" type="text" placeholder="Consultation">${tarif[0].replace(/<br>/g, '\n')}</textarea>
    //                 <div class="input-group">
    //                     <input class="col-3 tarifPrice form-control" type="text" placeholder="Tarif, ex: 20" value="${tarif[1].replace('€','').replace(/<br>/g, '\n')}">
    //                     <div class="input-group-append">
    //                         <span class="input-group-text">€</span>
    //                     </div>
    //                 </div>
    //             </div>
    //             `).join('')
    //         }
            
    //         <svg id="tarifAdd" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //     `)
    //     $('.tarifDelete').on('click', deleteCard);
    //     $('#tarifAdd').on('click', function() {
    //         $(`
    //         <div class="tarifEdition">
    //             <svg class="tarifDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    //             <textarea rows=2 class="tarifTitle form-control" type="text" placeholder="Consultation"></textarea>
    //             <div class="input-group">
    //                 <input class="tarifPrice form-control" type="text" placeholder="Tarif, ex: 20">
    //                 <div class="input-group-append">
    //                     <span class="input-group-text">€</span>
    //                 </div>
    //             </div>
    //         </div>
    //         `).insertBefore(this)

    //         $('.tarifDelete').on('click', deleteCard);
    //     })
    //     $('#submitForm').off("click");
    //     $("#submitForm").on('click', function() {
    //         var content = [];
    //         $('#contentEdition .tarifEdition').each(function() {
    //             content.push([
    //                 $(this).find('.tarifTitle').val(),
    //                 $(this).find('.tarifPrice').val().replace('€','')+"€"
    //             ]);
    //         });
    //         $('#content').val(JSON.stringify(content).replace(/\\n/g, '<br>'));
    //         $('#editForm').submit()
    //     })
    // }



    $("#submitDeleteForm").on('click', function() {
        if(confirm(`Supprimer la section ${$('#title').val()}?`)) {
            $('#deleteForm').submit()
        }
    })
    
})


const sendItemImage = function(evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    if (!files || !files.length) {
        return;
    }
    let formData = new FormData();
    formData.append("image", files[0]);
    formData.append("item_index", parseInt(evt.target.dataset.index || -1));
    axios.post(`/edit-section/${sectionId}/item-image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(r=>{
        $(evt.target).prev(".itemImage ")[0].src = r.data.new_path;
    })
    .catch(e=>console.log(e));
}