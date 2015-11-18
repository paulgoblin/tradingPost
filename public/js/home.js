'use strict'

function init(){
  console.log('home js loaded');
  $('#addItem').click(addItem);
  $('.itemsTable').on('click','.del',confirmDelete);
  $('.itemsTable').on('click','.trade input', toggleTrade);

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
    // $tr.remove();
    // swal("Deleted!", "Your item has been deleted.", "success");
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


// function saveAvatar(){
//   let avUrl = $('#imageUrl').val();
//   console.log('avUrl',avUrl)

//   if (!avUrl) {
//     $('#imageUrl').attr('placeholder','provide img url!')
//     return;
//   }
  // $.ajax({
  //   url: '/users/profPic',
  //   method: 'POST',
  //   data: {url: avUrl}
  // })
  // .done(function(data){
  //   console.log('retrieved data ', data);
  //   $('.avatar img').attr('src',avUrl)
  // })
  // .fail(function(error){
  //   console.error('error saving ', error);
  // });



// }

