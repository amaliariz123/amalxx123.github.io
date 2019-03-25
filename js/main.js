$(document).ready(function() {

    // // $.get(_url, function (data){
    //     function renderPage(data){
    //     $.each(data, function (key, items){
    //         _gend = items.gender;

    //         result += '<div>'+
    //         '<h3>'+items.name+'</h3>'+
    //         '<p>'+_gend+'</p>'+
    //         '</div>';

    //         if ($.inArray(_gend, gender) === -1){
    //             gender.push(_gend);
    //             gender_result += "<option value='"+_gend+"'>"+_gend+"</option>";
    //         }
    //     });

    //     $('#mhs-list').html(result);
    //     $('#mhs-select').html("<option value='semua'>Semua</option>"+gender_result);
    // //});

    // }


    var networkDataReceiver = false;

    /*
    * start balapan antara service dengan cache
    * fresh data from knline service
    */

    var networkUpdate = fetch(_url).then(function(response){
        return response.json();
    }).then(function(data){
        networkDataReceiver = true;
        renderPage(data);
    });

    // ambilkan data dalam local cache
    caches.match(_url).then(function(response){
        if(!response) throw Error("no data on cache")
        return response.json();
    }).then(function(data){
        if(!networkDataReceiver){
            renderPage(data);
            console.log("render from cache");
        }
    }).catch(function(){
        return networkUpdate;
    })

}); //tutup ready function