'use strict'

function init(){
  $('.table').on('click','.itemSelect', makeOffer)
}

function makeOffer(e){
  let myItem = $(e.target).data('id');
  let tradeItem = $(e.target).closest('.item').data('id');
  console.log('making post')

  $.ajax({
    url: '/items/addOffer/' + myItem + '/' + tradeItem,
    method: 'POST'
  })
  .done(function(data){
    console.log('retrieved data ', data);
    // $tr.remove();
    // swal("Deleted!", "Your item has been deleted.", "success");
  })
  .fail(function(error){
    console.error('error saving ', error);
  });

}



$(document).ready(init);