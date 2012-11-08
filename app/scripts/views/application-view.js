Emoney.ApplicationView = Ember.View.extend({
	templateName:'application',
	didInsertElement: function(){

		$('#myModal').modal({
        backdrop: true,
        keyboard: true
    }).css({
       'width': function () { 
           return ($(document).width() * .9) + 'px';  
       },
       'margin-left': function () { 
           return -($(this).width() / 2); 
       }
});
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
	parse : function(){
		Emoney.preview.pushObjects(Emoney.parser.parse(this.typing));
		this.set('typing','')
		$("#wizard").bwizard("next");
	},

	add: function(e){
		Emoney.repository.pushObjects(Emoney.preview.content.filter(function(item){
			return item.get('isSelected');
		}))
	},
	selectAll: function(e){
		Emoney.preview.forEach(function(item){
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

	didInsertElement: function(){
		//$("#filter-btn").popover({trigger:'click',target:'#filters-div',title:'Selector'}); 
		$("#wizard").bwizard({nextBtnText:'',backBtnText:'Input'});
	}
});

Emoney.PreviewItemView=Ember.View.extend({
	
});


Emoney.initialize();

