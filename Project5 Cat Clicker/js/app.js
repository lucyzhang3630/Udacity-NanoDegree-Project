var counter = 0;
function handleClick() {
  var catImage = $('image.catImage');
  var clicks = $('span.clicks');
  counter++;
  clicks.html(counter);
};
