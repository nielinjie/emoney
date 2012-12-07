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
		


    
		Emoney.repository.addObserver("sumByDate",function(){
			console.log('sumByDate changed')
			draw(Emoney.repository.get('sumByDate'));
		});
		Emoney.repository.set('content',Emoney.store.findAll(Emoney.Recorder))

	}
});

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
		$("#wizard").bwizard({nextBtnText:'',backBtnText:'Input'});
	}
});




Emoney.EditView= Ember.View.extend({
	tagName:'div',
	classNames:['edit'],
	didInsertElement: function(){
		var outter=this
		$(this.get('element')).editable({
			send:false,
			type:this.get('type'),
			value:this.get('value'),
			url:function(newValue){
				outter.set('value',newValue.value)
			},
			params:{view:this}
		});
	},
})




Emoney.PreviewItemView=Ember.View.extend({});

Emoney.initialize();

