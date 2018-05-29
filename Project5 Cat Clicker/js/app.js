//model
var catsModel = {
  cats:[
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
  ],
  adminStatus:false
}
//view
var navView = {
  init:function() {
    navView.render();
    $('li.catItem:first-child').addClass('active');
  },
  render:function() {
    var catsList = $('ul.catsList');
    catsModel.cats.forEach(function(cat,index) {
      catsList.append('<li class="catItem"'+' id='+index+'>'+cat.name+'</li>')
    });
    octopus.selectCat();
  }
}
var catView = {
  init:function() {
    $('div.catInfo').hide();
    octopus.updateCatView(0);
    catView.render();
  },
  render: function() {
    $('li.catItem').on('click',function(e) {
      var index = e.target.id;
      octopus.updateCatView(index)
    });
    octopus.handleClick();
    octopus.toggleEdit();
    octopus.saveEdit();
    octopus.cancelEdit();
  }
}
//octopus
var octopus = {
  selectCat:function() {
    //change active status
    $('li.catItem').on('click',function(e) {
      var activeCat= $('li.active').removeClass('active');
      $(e.target).addClass('active');
      //when select another cat, change admin status to default value;
      catsModel.adminStatus = false;
    })
  },
  updateCatView:function(catIndex){
    var cat = catsModel.cats[catIndex];
    var imageSrc = 'images/'+cat.name +'.jpg';
    $('img.catImage').attr('src',imageSrc);
    $('img.catImage').attr('id',catIndex);
    $('h1.catName').html(cat.name);
    $('span.clicks').html(cat.counter);
    $('div.catInfo').hide();
  },
  handleClick: function() {
    //increase the counter and update the view for counter
    $('img.catImage').on('click',function(e) {
      var index = e.target.id;
      catsModel.cats[index].counter++;
      $('span.clicks').html(catsModel.cats[index].counter);
    })
  },
  toggleEdit:function() {
    $('button.adminBtn').on('click',function() {
      catsModel.adminStatus =! catsModel.adminStatus;
      if(catsModel.adminStatus) {
        var index;
        $('div.catInfo').show();
        index = $('img.catImage').attr('id');
        $('input.nameInput').val(catsModel.cats[index].name);
        $('input.clicksInput').val(catsModel.cats[index].counter);
      }else{
        $('div.catInfo').hide();
      }
    })
  },
  saveEdit:function() {
    $('button.saveBtn').on('click',function() {
      var index = $('img.catImage').attr('id');
      catsModel.cats[index].name = $('input.nameInput').val();
      catsModel.cats[index].counter = $('input.clicksInput').val();
      catsModel.adminStatus = false;
      $('div.catInfo').hide();
      $('li#'+index).html(catsModel.cats[index].name);
      $('h1.catName').html(catsModel.cats[index].name);
      $('span.clicks').html(catsModel.cats[index].counter);
    })
  },
  cancelEdit:function(){
    $('button.cancelBtn').on('click',function() {
      catsModel.adminStatus = false;
      $('div.catInfo').hide();
    })
  },
  init:function() {
    navView.init();
    catView.init();
  }
}

octopus.init();
