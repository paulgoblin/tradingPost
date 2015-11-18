'use strict'

function init(){
  $('.bio').dblclick(editBio);
  $('.bio').dblclick(saveBio);
  // $(window).unload(saveBio);
  $('#addProfPic').click(saveAvatar);
}

function saveAvatar(){
  let avUrl = $('#imageUrl').val();
  console.log('avUrl',avUrl)

  if (!avUrl) {
    $('#imageUrl').attr('placeholder','provide img url!')
    return;
  }
  $.ajax({
    url: '/users/profPic',
    method: 'POST',
    data: {url: avUrl}
  })
  .done(function(data){
    console.log('retrieved data ', data);
    $('.avatar img').attr('src',avUrl)
  })
  .fail(function(error){
    console.error('error saving ', error);
  });



}

function editBio(e){
  let isEditable= $('.bio').is('.editable');
  $('.bio').prop('contenteditable',!isEditable).toggleClass('editable');
}

function saveBio(){
  let bio = $('.bio p').text();
  console.log('bio')
  $.ajax({
    // async: false,
    url: '/users/bio',
    method: 'POST',
    data: {bio: bio}
  })
  .done(function(data){
    console.log('retrieved data ', data);
  })
  .fail(function(error){
    console.error('error saving ', error);
  });

};


$(document).ready(init)