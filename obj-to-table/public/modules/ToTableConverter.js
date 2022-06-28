

export class ToTableConverter {

static objectToTable (obj,element) {
		let thead = $('<tr></tr>')
		let tbody = $('<tr></tr>')
		Object.keys(obj).forEach(key => {
			if(key){
			  thead.append('<th>'+key+'</th>')
			}
			if (obj[key] instanceof Object) {
				let newElement = $('<table></table>')
				this.objectToTable(obj[key],newElement)
				tbody.append($('<td></td>').append(newElement)) 
			}
			else{
				tbody.append('<td>'+obj[key]+'</td>')
			}
		})
		element.append(thead)
		element.append(tbody)
		return element
	}

static transposeTable(){
	//TODO
}

}
