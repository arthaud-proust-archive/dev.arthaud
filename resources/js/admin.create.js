window.$ = window.jQuery = require('jquery');
axios = require('axios');


const deleteCard = function() {
    $(this).parent().remove()
}
var itemsCount = 0;


$(()=>{
    try {
        $('#linksText').val(JSON.parse($('#links').val()).map(link=>link.join('|')).join('\n'))
    } catch(e) {
        $('#linksText').val('');
    }
    $('#linksText').on('keyup', function() {
        try {
            $('#links').val(JSON.stringify($(this).val().split('\n').filter(link=>/.+\|.+\.\w+/g.test(link)).map(link=>link.split('|'))))
        } catch(e) {}
    });

    $("#submitForm").on('click', function() {
        // $('#content').val($('#content').val().replace(/\n/g, '<br>'))
        $('#content').val($('#content').val().encoded)
        $('#createForm').submit()
    })
    $('#type').on('change', function() {
        if($('#type option:selected').val()=="text") {
            $('#contentEdition').html(`
            <textarea rows=4 id="content" class="form-control" name="content" required autocomplete="off"></textarea>
            <label class="mt-3" for="image_url">Ajouter une image (optionnel)</label>
            <input type="file" class="form-control-file @error('image_url') is-invalid @enderror" name="image_url" id="image_url" accept=".jpeg,.png,.jpg,.gif,.svg,.webp">
            `)
            $('#submitForm').off("click");
            $("#submitForm").on('click', function() {
                // $('#content').val($('#content').val().replace(/\n/g, '<br>'))
                $('#content').val($('#content').val().encoded)
                $('#createForm').submit()
            })
        }else if ($('#type option:selected').val()=="items") {
            $('#contentEdition').html(`
                <textarea rows=4 class="cardContent form-control" id="content" name="content" required autocomplete="off"></textarea>
            `)

            $('#contentEdition').parent('.form-group').after(`
            <div class="col-11 form-group row">
                <label>Items de la section</label>

                <div class="col-12 p-0" id="itemsEdition">
                </div>
            </div>
            `)

            $('#itemsEdition').html(`
                <input id="items" type="hidden" name="items">
                <div class="itemEdition">
                    <svg class="itemDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    <img class="itemImage form-control" type="text" src="">
                    <input class="itemInputImage" data-index="0" type="file">
                    <input class="itemUrl form-control" type="text" placeholder="Url de l'item" value="">
                    <input class="itemTitle form-control" type="text" placeholder="Titre de l'item" value="">
                    <textarea rows=3 class="itemDesc form-control" type="text" placeholder="Description de l'item"></textarea>
                </div>
                <svg id="itemAdd" width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
            `)
            $('.itemDelete').on('click', deleteCard);
            $('.itemInputImage').on('change', addItemImage);
            $('#itemAdd').on('click', function() {
                $(`
                <div class="itemEdition">
                    <svg class="itemDelete" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    <img class="itemImage form-control" type="text" src="" alt="Aucune image">
                    <input class="itemInputImage" data-index="${++itemsCount}" type="file">
                    <input class="itemUrl form-control" type="text" placeholder="Url de l'item" value="">
                    <input class="itemTitle form-control" type="text" placeholder="Titre de l'item" value="">
                    <textarea rows=3 class="itemDesc form-control" type="text" placeholder="Description de l'item"></textarea>
                </div>
                `).insertBefore(this)
                $('.itemInputImage').on('change', addItemImage);
                $('.itemDelete').on('click', deleteCard);
            })
            $('#submitForm').off("click");
            $("#submitForm").on('click', function(e) {
                e.preventDefault()
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
                // $('#createForm').submit()
                axios.post($("#createForm").attr('action')+'?'+$('#createForm').serialize())
                .then(r=>{
                    sendItemsImages(r.data.section_id);
                })
                .catch(e=>console.log(e));
            })
        }
    })


    
})


var itemsImages = {};

const addItemImage = function(evt) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    if (!files || !files.length) {
        return;
    }
    let itemIndex = parseInt(evt.target.dataset.index || -1);

    itemsImages[itemIndex] = new FormData();
    itemsImages[itemIndex].append("image", files[0]);
    itemsImages[itemIndex].append("item_index", itemIndex);
}
const sendItemsImages = function(sectionId) {

    Object.values(itemsImages).forEach(itemData=>{
        axios.post(`/edit-section/${sectionId}/item-image`, itemData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(r=>{
            location.replace('/admin')
        })
        .catch(e=>console.log(e));
    })
}