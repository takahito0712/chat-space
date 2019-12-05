$(function(){
  function  addUser(user) {
    
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
  ;
  $("#user-search-result").append(html);
  } 

  function addNoUser() {
    let html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>`
    
              $("#user-search-result") .append(html) ;     
         }
 function addCreateUser(name, id) {
   let html = 
          `<div class="chat-group-user clearfix" id="${id}">
                <p class="chat-group-user__name">${name}</p>
                <input value="${id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${id}" />
                   <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
          </div>`;
          $(".js-add-user").append(html);
 }

    
  $("#user-search-field").on("keyup", function(){
    let input =  $("#user-search-field").val();//フォームの値を取得して変数に代入する
    $.ajax({
      type: 'GET',    //HTTPメソッド
      url: '/users',       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: { keyword: input },   //テキストフィールドに入力された文字を設定する
    })
     .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
     })
     .fail(function() {
       alert("ユーザー検索に失敗しました");
     });
  });
  $(document).on("click", ".chat-group-user__btn--add", function() {
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addCreateUser(userName, userId);

  });
 $(document).on("click", ".chat-group-user__btn--remove", function(){
   $(this)
      .parent()
      .remove();
 });
});