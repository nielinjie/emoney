

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


Emoney.preview = Ember.ArrayProxy.create({
	content : []
});