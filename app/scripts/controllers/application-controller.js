
var defaultDateFormat = d3.time.format("%Y-%m-%d");

Emoney.ApplicationController = Ember.ObjectController.extend({
  // Implement your controller here.
});


Emoney.categoryNames=["Cash","Criet"]

Emoney.Recorder=Ember.Object.extend({
	isSelected:false,
	memo: '',
	subject:'',
	amount: 0,
	date: new Date(),
	accountName:'',
	category:'',
	formatedDate: function(key,value){
		return defaultDateFormat(this.get('date'))
	}.property('date')
	});

Emoney.preview = Ember.ArrayProxy.create({
	content : []
});


// Emoney.parsResult=Ember.Object.extend({
// 	string:'Pase data to textArea above, and press "Parse and Preview".',
// 	level:'info'
// })


Emoney.repository=Ember.ArrayProxy.create({
	content:[]
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
			return Emoney.Recorder.create({
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



//Emoney.preview=Ember.ArrayControl