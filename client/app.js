//have to define these outside of document ready f(x)n due to scoping issues
let deleteChirp;
let postChirp;
let editChirp;

$(document).ready(function () {

    $('#firstsection').append
        (`<div class="input-group mb-3" style='padding-left:25%; padding-right:25%'>
            <input type="text" id="namesubmit" class="form-control" placeholder="Name" aria-label="Chirp input" aria-describedby="basic-addon2">
            <input type="text" id="chirpsubmit" class="form-control" placeholder="What's on your mind?" aria-label="Chirp input" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button id="submit" class="btn btn-outline-secondary" onclick={postChirp()} type="button">Chirp</button>
            </div>
        </div>`)

    let getChirps = () => {
        $.ajax({
            method: 'GET',
            url: "http://localhost:3000/api/chirps",
            dataType: 'json',
            success: function (result) {
                console.log(result)

                $.each(result, (key, value) => {
                    //    console.log(value.message)
                    if (key !== 'nextid') {
                        $('#secondsection').append
                            (`<div id=${key} class='card' style='padding-left:10px; margin:5px 25% 5px'>
                            </div>`)
                        $(`#${key}`).append
                            (`<div class='row' style='margin-bottom: 0px;'>
                                <div class='col' >
                                    <p id=${key}name style='margin-top: 10px'>${value.name}</p>
                                    <h1 id=${key}msg style='font-size:20px;'>${value.message}</h1>
                                </div>  
                                <div class='col'>
                                    <button id='delete' style='margin:3px; float: right;' onclick={deleteChirp(${key})} type="button" class="btn btn-primary btn-sm">Delete</button>
                                    <button id='edit' style='margin:3px; float: right;' onclick={editChirp(${key})} type="button" class="btn btn-primary btn-sm">Edit</button>
                                </div>
                            </div>
                            `)
                    }
                })
            }
        })
    }

    getChirps();


    postChirp = () => {
        let x =
            {name: $('#namesubmit').val(),
            message: $('#chirpsubmit').val()}

        $.ajax({
            method: "POST",
            url: `http://localhost:3000/api/chirps/`,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(x),
        })
        location.reload();
    }

    editChirp = (key) => {
        let thing = $(`#${key}msg`).html()
      
        $(`#${key}msg`).replaceWith(
            `<input type="text" id="editchirp" style="margin-bottom: 5px;" class="form-control" placeholder=${thing} aria-label="Chirp input" aria-describedby="basic-addon2">
            <button id='edit' style='margin:3px; float: right;' onclick={postEdited(${key})} type="button" class="btn btn-primary btn-sm">Save</button>`
        )


    }

    postEdited = (key) => {
        let x =
        {name: $(`#${key}name`).html(),
        message: $('#editchirp').val()}

        $.ajax({
            method: "PUT",
            url: `http://localhost:3000/api/chirps/${key}`,
            dataType: 'json',
            contentType: 'application/json',
            data:JSON.stringify(x)
        })

        console.log('#editchirp')
        location.reload()

    }

    deleteChirp = (key) => {
        $.ajax({
            method: 'DELETE',
            url: `http://localhost:3000/api/chirps/${key}`
        })
        console.log('deleted')
        location.reload();
    }
});