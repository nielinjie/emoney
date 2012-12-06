Emoney.Recorder=DS.Model.extend({
	isSelected:false,
	memo: DS.attr('string'),
	subject: DS.attr('string'),
	amount: DS.attr('number'),
	date: DS.attr('date'),
	accountName:DS.attr('string'),
	category:DS.attr('string'),
	//owner:DS.belongsTo('Emoney.Share'),


	formatedDate: function(key,value){
		return defaultDateFormat(this.get('date'))
	}.property('date'),

	updateMe: function() {
    	if (this.get('isDirty'))
    		//console.log(this)
      		Emoney.store.commit();
  	}.observes('memo','category')
});



Emoney.repository=Ember.ArrayProxy.create({
	content:[],
	first:'firstname',
	createItem:function(items){
		items.forEach(function(item){
			var r=Emoney.Recorder.createRecord({
				memo:item.memo,
				subject:item.subject,
				amount:item.amount,
				date:item.date,
				category:'unknow:100%'
			});
			
		});
		Emoney.store.commit(); 
	},

	sumByDate:function(){
		var datas=[];

		var groupBySum=function(arr){
			var group={};
			for (var i = arr.length; --i >= 0;) {
    			value = defaultDateFormat(arr[i].get('date'));
    			group[value] = (group[value] || 0) + arr[i].get('amount');
			}
			return group;
		};

		$.each(groupBySum(Emoney.repository.get("content").toArray().sort(function(a,b){
			return a.get('date')-b.get('date');
		})),function(index,item){
			console.log(index)
			console.log(typeof(index))
			datas.push({'date':defaultDateFormat.parse(index),'amount':item});
		});
		return datas;
	}.property('content.@each')


	//sumByCategory
	//sumByOwner
})
