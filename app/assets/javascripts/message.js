$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="message">
      
      <div class="upper-message">
        <div class="upper-message__user-name">${message.user_name}
           </div>
        <div class="upper-message__date">${message.date}
      </div>
</div>
      <div class="lower-message">
         <p class="lower-message__content">${message.content}
         </p>
         <img class="lower-message__image"src="${message.image}"alt="${message.image}">
      </div>
</div>`
      return html;
//メッセージに画像が含まれる場合のHTMLを作る
    } else {
      var html = `<div class="message">
      
                        <div class="upper-message">
                          <div class="upper-message__user-name">${message.user_name}
                             </div>
                          <div class="upper-message__date">${message.date}
                        </div>
                  </div>
                        <div class="lower-message">
                           <p class="lower-message__content">${message.content}
                           </p>
                        </div>
                 </div>`//メッセージに画像が含まれない場合のHTMLを作る
    }
      return html
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(location).attr('pathname');
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight});
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    });
  })
});
