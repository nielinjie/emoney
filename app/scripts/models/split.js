Emoney.Share=DS.Model.extend({
	pieces:DS.hasMany('Emoney.Piece'),
	configString:DS.attr('string')
	// config:function(key,value){
 //    if (arguments.length === 1) {
 //    	//getter
 //    	return pieces.map(function(item){
 //    		return item.get('name')+':'+item.get('percentOrAmount')?item.get('percent')+'%':item.get('amount');
 //    	}).toArray().join(',')
 //    }else{
 //    	//setter
 //    	try{
	//     	var piecesStrings=value.split(',')
	//     	var pieces=[]
	//     	piecesStrings.forEach(function(pieceString){
	//     		var nameAndNumber=pieceString.split(':')
	//     		var name=nameAndNumber[0]
	//     		var number=nameAndNumber[1]
	//     		var percentOrAmount=false;
	//     		if(number.indexOf('%')!=-1){
	//     			percentOrAmount=true;
	//     			number=number.subString(0,nuber.length-1)
	//     		}
	//     		pieces.pushObject(Emoney.Piece.create({
	//     			name:name,
	//     			percentOrAmount:percentOrAmount,
	//     			amount:percentOrAmount?null:number,
	//     			percent:percentOrAmount?number:null
	//     		}))
	//     	})
	//     	this.set('pieces',pieces)
	//     }catch{

	//     }
 //    	return value
 //    }
	// }.property('configString')
})


Emoney.Piece=DS.Model.extend({
	name:DS.attr('string'),
	percent:DS.attr('number'),
	amount:DS.attr('number'),
	percentOrAmount:DS.attr('boolean')
})


