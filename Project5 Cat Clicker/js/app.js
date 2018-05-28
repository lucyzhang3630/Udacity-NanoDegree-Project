var counter = 0;
function handleClick() {
  var catImage = $('img.catImage');
  var clicks = $('span.clicks');
  counter++;
  clicks.html(counter);
};
function selectCat(e) {
  //change the active status
  var activeCat= $('li.active').removeClass('active');
  $(e.target).addClass('active');
  //update image and cat name
  var imageSrc = 'images/'+e.target.textContent +'.jpg';
  $('img.catImage').attr('src',imageSrc);
  $('h1.catName').html(e.target.textContent);
  counter = 0;
  $('span.clicks').html(counter);
}
