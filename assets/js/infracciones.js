function infracciones(){
	for(inf in inf1){
		$('#menu').append(
			'<li><a><i class="icon-minus icon-white"></i>Violación del artículo ' + inf1[inf].articulo + '</a></li>'
		);
	}
}
