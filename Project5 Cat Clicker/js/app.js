//model
var catsModel = [
  {
    name:"Amy",
    counter:0
  },
  {
    name:"Betty",
    counter:0
  },
  {
    name:"Cathy",
    counter:0
  },
  {
    name:"Doris",
    counter:0
  },
  {
    name:"Emily",
    counter:0
  }
];
//view
var navView = {
  init:function() {
    navView.render();
    $('li.catItem:first-child').addClass('active');
  },
  render:function() {
    var catsList = $('ul.catsList');
    catsModel.forEach(function(cat,index) {
      catsList.append('<li class="catItem"'+' id='+index+'>'+cat.name+'</li>')
    });
    octopus.selectCat();
  }
}
var catView = {
  init:function() {
    octopus.updateCatView(0);
    catView.render();
  },
  render: function() {
    $('li.catItem').on('click',function(e) {
      var index = e.target.id;
      octopus.updateCatView(index)
    });
    octopus.handleClick()
  }
}
//octopus
var octopus = {
  selectCat:function() {
    //change active status
    $('li.catItem').on('click',function(e) {
      var activeCat= $('li.active').removeClass('active');
      $(e.target).addClass('active');
    })
  },
  updateCatView:function(catIndex){
    var cat = catsModel[catIndex];
    var imageSrc = 'images/'+cat.name +'.jpg';
    $('img.catImage').attr('src',imageSrc);
    $('img.catImage').attr('id',catIndex);
    $('h1.catName').html(cat.name);
    $('span.clicks').html(cat.counter);
  },
  handleClick: function() {
    //increase the counter and update the view for counter
    $('img.catImage').on('click',function(e) {
      var index = e.target.id;
      catsModel[index].counter++;
      $('span.clicks').html(catsModel[index].counter);
    })
  },
  init:function() {
    navView.init();
    catView.init();
  }
}

octopus.init();
