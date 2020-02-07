$(function(){
	//Variáveis globais
	var casa_selecionada = null;
	var peca_selecionada = null;
	var pontos_pretas = 0;
	var pontos_brancas = 0;

	//Funções
	function montarTabuleiro(){
		var i;
		for (var i = 0; i < 8; i++) {
			$("#tabuleiro").append("<div id='linha_" + i.toString() + "' class='linha' >");

			for (var j = 0; j < 8; j++){
				var nome_casa = "casa_" + i.toString() + "_" + j.toString();
				var classe = (i%2==0? (j%2==0? "casa_branca":"casa_preta"):(j%2!=0? "casa_branca":"casa_preta"));
				$("#linha_"+i.toString()).append("<div id='"+nome_casa+"' class='casa "+classe+"' />");

				if(classe == "casa_preta"){
					if (i < 3) {
						$("#"+nome_casa).append("<img src='peca_preta.png' class='peca' id='"+nome_casa.replace("casa", "peca_preta")+"'/>");
					}
					else
					if (i > 4) {
						$("#"+nome_casa).append("<img src='peca_branca.png' class='peca' id='"+nome_casa.replace("casa", "peca_branca")+"'/>");
					}
				}
			}
		}
	}

	montarTabuleiro();

	$(".casa").click(function(){
		//Variáveis locais da casa selecionada anteriormente, casa selecionada atualmente, diferença entre as coordenadas.
		var csX, csY, casX, casY, dX, dY;
		var casa_anterior, peca_anterior;
		if(peca_selecionada != null){
			csX = parseInt(casa_selecionada.substr(5,1));
			csY = parseInt(casa_selecionada.substr(7,1));

			casX = parseInt($(this).attr("id").substr(5,1));
			casY = parseInt($(this).attr("id").substr(7,1));

			dX = parseInt(((csX - casX) < 0? (csX - casX)*(-1):(csX - casX)));
			dY = parseInt(((csY - casY) < 0? (csY - casY)*(-1):(csY - casY)));
		}

		$("#"+casa_selecionada).removeClass("casa_selecionada");
		casa_anterior = casa_selecionada;
		peca_anterior = peca_selecionada;
		casa_selecionada = $(this).attr("id");
		$("#"+casa_selecionada).addClass("casa_selecionada");

		peca_selecionada = $("#"+casa_selecionada).children("img").attr("id");

		if (peca_selecionada==null) {
			$("#info_peca_selecionada").text("NENHUMA PEÇA SELECIONADA!");
			if(peca_anterior != null){
				if(((peca_anterior.indexOf("preta") >= 0) && (casX > csX)) || ((peca_anterior.indexOf("branca") >=0) && (casX < csX))){
					var obj = $("#"+peca_anterior);

					if((dX == 1) && (dY == 1)){
						$("#"+casa_anterior).remove("#"+peca_anterior);
						$("#"+casa_selecionada).append(obj);
					}else
					if((dX == 2) && (dY == 2)){
						if((peca_anterior.indexOf("branca") >= 0)){
							var casa_meio = null, peca_meio = null;

							if(casY < csY){
								casa_meio = "#casa_"+(casX+1).toString()+"_"+(casY+1).toString();
							}else{
								casa_meio = "#casa_"+(casX+1).toString()+"_"+(casY-1).toString();
							}
							if($(casa_meio).children().size()>0)
								peca_meio = $(casa_meio).children("img");

							if((peca_meio != null) && (peca_meio.attr("id").indexOf("preta") > 0)){
								$("#compila").append(peca_meio);
								peca_meio.remove();
								pontos_brancas++;
								$("#info_pontos_brancas").text(pontos_brancas.toString());
								$("#"+casa_anterior).remove("#"+peca_anterior);
								$("#"+casa_selecionada).append(obj);
							}
						}else
						if((peca_anterior.indexOf("preta") >= 0)){
							var casa_meio = null, peca_meio = null;

							if(casY < csY){
								casa_meio = "#casa_"+(casX-1).toString()+"_"+(casY+1).toString();
							}else{
								casa_meio = "#casa_"+(casX-1).toString()+"_"+(casY-1).toString();
							}
							if($(casa_meio).children().size()>0){
								peca_meio = $(casa_meio).children("img");

								if((peca_meio != null) && (peca_meio.attr("id").indexOf("branca") > 0)){
									peca_meio.remove();
									pontos_pretas++;
									$("#info_pontos_pretas").text(pontos_pretas.toString());
									$("#"+casa_anterior).remove("#"+peca_anterior);
									$("#"+casa_selecionada).append(obj);
								}
							}
						}
					}
				}
			}
			else{
				$("#info_peca_selecionada").text(peca_selecionada.toString());
			}

			if(pontos_pretas == 12 || pontos_brancas == 12){
				$("#info").html("<h1>Fim de jogo!</h1>");
			}
		}
		
	});
});