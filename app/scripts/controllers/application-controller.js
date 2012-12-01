
var defaultDateFormat = d3.time.format("%Y-%m-%d");

Emoney.ApplicationController = Ember.ObjectController.extend({
});

Emoney.categoryNames=["food","cloth"]

Emoney.PreviewRecorder=Ember.Object.extend({
isSelected:false,
	memo: '',
	subject: '',
	amount: 0,
	date: new Date(),
	accountName:'',
	category:'',

	formatedDate: function(key,value){
		return defaultDateFormat(this.get('date'))
	}.property('date'),

});

Emoney.Recorder=DS.Model.extend({
	isSelected:false,
	memo: DS.attr('string'),
	subject: DS.attr('string'),
	amount: DS.attr('number'),
	date: DS.attr('date'),
	accountName:DS.attr('string'),
	category:DS.attr('string'),

	formatedDate: function(key,value){
		return defaultDateFormat(this.get('date'))
	}.property('date'),

	updateMe: function() {
    	if (this.get('isDirty'))
      		Emoney.store.commit();
  	}.observes('memo','category')
});

Emoney.preview = Ember.ArrayProxy.create({
	content : []
});

Emoney.repository=Ember.ArrayProxy.create({
	content:[],
	first:'firstname',
	createItem:function(items){
		items.forEach(function(item){
			Emoney.Recorder.createRecord({
				memo:item.memo,
				subject:item.subject,
				amount:item.amount,
				date:item.date
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

Emoney.parser = Ember.Controller.create({
	parse: function(string){
		_that=this
		var lines=_that.lines(string);
		var res=lines.map(function(line){
			var parts=_that.parts(line)
			//console.log(parts)
			var subjectString=parts[2].trim();
			var amountString=parts[5].trim();
			var dateString=parts[0].trim();
			var accountString = parts[4].trim();
			return Emoney.PreviewRecorder.create({
				subject:subjectString,
				amount:+amountString,
				date:defaultDateFormat.parse(dateString),
				accountName: accountString
			})
		})
		return res;
	},
	lines: function(string){
		return string.split('\n').filter(function(s){return s.trim().length!=0})
	},
	parts: function(line){
		return line.split('\t')
	}
});

