Emoney.ApplicationView = Ember.View.extend({
	templateName:'application',
	didInsertElement: function(){

		$('#myModal').css({
	       'width': function () { 
	           return ($(document).width() * .9) + 'px';  
	       },
	       'margin-left': function () { 
	           return -($(this).width() / 2); 
	       },
	       'height': function () { 
	           return ($(document).height() * .9) + 'px';  
	       },
	       'margin-top': function () { 
	           return -($(this).height() / 2); 
	       }
		});


		//draw();
		//register draw;

		
		Emoney.repository.addObserver("what",function(){
			console.log('what changed')
			//draw(Emoney.repository.get('groupBySum'));
		});

		Emoney.repository.addObserver("cl",function(){
			console.log('cl changed')
			//draw(Emoney.repository.get('groupBySum'));
		});
		Emoney.repository.addObserver("sumByDate",function(){
			console.log('sumByDate changed')
			draw(Emoney.repository.get('sumByDate'));
		});
    	//Emoney.repository.set('content', Emoney.store.findAll(Emoney.Recorder));
    	Emoney.repository.set('first', 'what is first');
    	Emoney.repository.set('content',Emoney.store.findAll(Emoney.Recorder))

	}
});

// Emoney.ParseResultView=Ember.View.extend({
// 	templateName:'parseResult'
// })

Emoney.RepositoryView = Ember.View.extend({
	templateName: 'repository',
});


Emoney.PreviewView= Ember.View.extend({
	templateName :'preview',
	typing:'init',
	filterNames:['All','None','No Memo'],
	filters:{
		'All':function(item){return true},
		'None':function(item){return false},
		'No Memo':function(item){
			return item.memo =='';
		},
	},
	parse : function(){
		Emoney.preview.pushObjects(Emoney.parser.parse(this.typing));
		this.set('typing','')
		$("#wizard").bwizard("next");
	},

	add: function(e){
		// Emoney.repository.pushObjects(Emoney.preview.content.filter(function(item){
		// 	return item.get('isSelected');
		// }));
		
		var selected=Emoney.preview.content.filter(function(item){
			return item.get('isSelected');
		});
		Emoney.repository.createItem(selected);


		Emoney.preview.removeObjects(selected);
		
	},
	selectByFilter: function(e){
		var f=this.filters[e.context];
		Emoney.preview.forEach(function(item){
			item.set('isSelected',false);
		})
		Emoney.preview.filter(f).forEach(function(item){
			item.set('isSelected',true);
		});
	},

	selectedMemo:function(key,value){
		if(arguments.length === 1){
			return '';
		}else{
			Emoney.preview.filter(function(item){
				return item.isSelected;
			}).forEach(function(item){
				item.set('memo',value);
			});
		}
	}.property('selectedMemo'),


	selectedCategory:function(key,value){
		if(arguments.length===1){
			return null;
		}else {
			if(value != null){
				Emoney.preview.filter(function(item){
					return item.isSelected;
				}).forEach(function(item){
					item.set('category',value);
				});
			}
		}
	}.property('selectedCategory'),


	didInsertElement: function(){
		//$("#filter-btn").popover({trigger:'click',target:'#filters-div',title:'Selector'}); 
		$("#wizard").bwizard({nextBtnText:'',backBtnText:'Input'});
	}
});



Emoney.EditField = Ember.View.extend({
  tagName: 'span',
  templateName: 'edit-field',
  isEditing:false,

  doubleClick: function() {
    this.set('isEditing', true);
    return false;
  },


  focusOut: function() {
    this.set('isEditing', false);
  },

  keyUp: function(evt) {
    if (evt.keyCode === 13) {
      this.set('isEditing', false);
    }
  }
});
Emoney.TextField = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().focus();
  }
});

Ember.Handlebars.registerHelper('editable', function(path, options) {
  options.hash.valueBinding = path;
  return Ember.Handlebars.helpers.view.call(this, Emoney.EditField, options);
});






Emoney.PreviewItemView=Ember.View.extend({});

Emoney.initialize();

