
Emoney.parser = {
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
}