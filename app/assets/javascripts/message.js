$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="message" data-id="${message.id}" >
      
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
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){//今いるページのリンクが/groups/グループID/messagesのパスとマッチすれば以下を実行。
      var last_message_id = $('.message:last').data("id"); //dataメソッドで.messageにある:last最後のカスタムデータ属性を取得しlast_message_idに代入。
      // var group_id = $(".group").data("group-id");
      $.ajax({ //ajax通信で以下のことを行う
        url: "api/messages", //サーバを指定。今回はapi/message_controllerに処理を飛ばす
        type: 'get', //メソッドを指定
        dataType: 'json', //データはjson形式
        data: {last_id: last_message_id} //飛ばすデータは先ほど取得したlast_message_id。またparamsとして渡すためlast_idとする。
      })
      .done(function (messages) { //通信成功したら、controllerから受け取ったデータ（messages)を引数にとって以下のことを行う
        console.log(messages)
        var insertHTML = '';//追加するHTMLの入れ物を作る
        messages.forEach(function (message) {//配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
          insertHTML = buildHTML(message); //メッセージが入ったHTMLを取得
          $('.messages').append(insertHTML);//メッセージを追加
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');//最新のメッセージが一番下に表示されようにスクロールする。
      })
      .fail(function () {
        alert('自動更新に失敗しました');//ダメだったらアラートを出す
      });
    }
  };
  setInterval(reloadMessages, 7000);//7000ミリ秒ごとにreloadMessagesという関数を実行し自動更新を行う。
});

  

