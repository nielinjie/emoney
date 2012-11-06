Emoney.ApplicationView = Ember.View.extend({
	templateName:'application',
	didInsertElement: function(){
		//$("#filter-btn").popover({trigger:'click',target:'#filters-div',title:'Selector'}); 
		$("#wizard").bwizard({nextBtnText:'Parse and Preview'});
	}
});
Emoney.PreviewView = Ember.View.extend({
	templateName: 'preview',
	add: function(e){
		Emoney.repository.pushObjects(Emoney.preview.content.filter(function(item){
			return item.get('isSelected');
		}))
	},
	selectAll: function(e){
		Emoney.preview.forEach(function(item){
			item.set('isSelected',true);
		});
	}
});

// Emoney.ParseResultView=Ember.View.extend({
// 	templateName:'parseResult'
// })

Emoney.RepositoryView = Ember.View.extend({
	templateName: 'repository',
});


Emoney.InputView= Ember.View.extend({
	templateName :'input',
	typing:'init',
	parse : function(){
		Emoney.preview.pushObjects(Emoney.parser.parse(this.typing));
		this.set('typing','')
	}
});

Emoney.PreviewItemView=Ember.View.extend({
	
});


Emoney.initialize();

