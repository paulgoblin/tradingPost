'use strict'

function init(){
  console.log('home js loaded');
  $('#addItem').click(addItem);

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

