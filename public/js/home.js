'use strict'

function init(){
  console.log('home js loaded');
  $('#addItem').click(addItem);
  $('.itemsTable').on('click','.del',confirmDelete);
  $('.itemsTable').on('click','.trade input', toggleTrade);
  $('.itemsTable').on('click','.showOffers',showOffers);
  $('.modal-body').on('click','.reject', rejectOffer)
  $('.modal-body').on('click','.accept', acceptOffer)
}

function acceptOffer (e){
  let offerId = $(e.target).closest('tr').data('id');
  let itemId = $(e.target).closest('.offerTable').data('id');

  $.ajax({
    url: '/items/accpetOffer/' + itemId + '/' + offerId,
    method: 'POST'
  })
  .done(function(data){
    console.log('retrieved data ', data);
    $(e.target).closest('tr').remove();
    let $tr = $("[data-id='" + itemId + "']");
    $tr.data('id',data._id);
    $tr.find('.imgUrl img').attr('src',data.imgUrl);
    $tr.find('.name').text(data.name);
    $tr.find('.description').text(data.description);
    $tr.find('.trade input').attr('checked',false);
    $tr.find('.offers').html('NEW')
  })
  .fail(function(error){
    console.error('error saving ', error);
  });

}

function rejectOffer (e){
  let offerId = $(e.target).closest('tr').data('id');
  let itemId = $(e.target).closest('.offerTable').data('id');

  $.ajax({
    url: '/items/rejectOffer/' + itemId + '/' + 'offerId',
    method: 'POST'
  })
  .done(function(data){
    console.log('retrieved data ', data);
    if (data === '1') {
      $(e.target).closest('tr').remove();
      $('tbody').find("[data-id='" + itemId + "']").last('td').empty();
    }
  })
  .fail(function(error){
    console.error('error saving ', error);
  });

}

function showOffers(e){
  console.log($(e.target))
  let id = $(e.target).closest('tr').data('id')
  console.log('id',id);
  $('.offerTable').hide();
  $('.modal-body').find("[data-id='" + id + "']").show();
}

function toggleTrade(e){
  var $tr = $(e.target).closest('tr');
  var itemId = $tr.data('id');
  console.log("item id:", itemId)

  $.ajax({
    url: '/items/toggle/' + itemId,
    method: 'put'
  })
  .done(function(data){
    console.log('retrieved data ', data);
  })
  .fail(function(error){
    console.error('error saving ', error);
  });

}

function confirmDelete(e){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this imaginary file!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    closeOnConfirm: false },
    function(isConfirm){  
      if (isConfirm){
        deleteItem(e)
      } else{
        swal("Cancelled", 'Item not deleted', "error")
      }
    });
}

function deleteItem(e){
  var $tr = $(e.target).closest('tr');
  var itemId = $tr.data('id');

  $.ajax({
    url: '/items/delete/' + itemId,
    method: 'DELETE'
  })
  .done(function(data){
    console.log('retrieved data ', data);
    $tr.remove();
    swal("Deleted!", "Your item has been deleted.", "success");
  })
  .fail(function(error){
    console.error('error saving ', error);
  });

}

function addItem(){
  let name = $('#name').val();
  let imgUrl = $('#url').val();
  let description = $('#description').val();

  $('#name').val('');
  $('#url').val('');
  $('#description').val('');

  let item = {
    name: name,
    imgUrl: imgUrl,
    description: description
  }

  $.ajax({
    url: '/items/create',
    method: 'POST',
    data: item
  })
  .done(function(data){
    console.log('retrieved data ', data);
    
    var $tr = $('#sample').clone().removeAttr('id');
    $tr.data('id',data._id);
    $tr.find('img').attr('src',data.imgUrl);
    $tr.find('.name').text(data.name);
    $tr.find('.description').text(data.description);
    $tr.find('.trade').prop('checked',data.forTrade);
    $('.itemsTable').append($tr)

    console.log('item id is: ',$tr.data('id'));


  })
  .fail(function(error){
    console.error('error saving ', error);
  });



}


$(document).ready(init)

