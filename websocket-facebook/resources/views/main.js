(function ($) {
  let ws = start();

  const posts = ws.subscribe("posts")

  posts.on('new', post => {
    $(".posts").prepend(Template.post)
  })

  ajax('/posts', null, 'get').then(
    posts => {
      posts.map(post => {
        $(".posts").append(Template.post(post))
      })
    }).catch(e => console.log(e))

  $("#publish-post").on('click', async () => {
    const content = $("#post").val();]
    $("#post").val('');

    if (!content) {
      alert('Escreva alguma coisa para postar.')
      return;
    }

    const post = await ajax('/posts', {
      content
    })



  })
})(jQuery);