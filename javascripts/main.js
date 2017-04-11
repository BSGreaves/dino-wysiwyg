var dinoArray = [];

$.ajax("./db/dinosaurs.json")
    .done(function(data) {
        dinoArray = data.dinosaurs;
        printToDom(dinoArray);
    })
    .fail(function(error) {
        console.log("Json Error", error);
    });

function printToDom(array) {
	var ops = "";
	ops += `<row class="row">`
	for (let i = 0; i < array.length; i++) {
		if (i % 3 === 0 && i !== 0) {
			ops += `</row><row class="row">`
		}
		ops += `<div class="card col-md-4 col-sm-4">`;
		ops += `<header><h1>${array[i].type}</h1></header>`;
		ops += `<section><img class="img-thumbnail" src="${array[i].img}">`;
		ops += `<p class="bio">${array[i].bio}</p>`;
		ops += `<footer>${array[i].info}</footer>`;
		ops += `</section>`;
		ops += `</div>`;
	}
	ops += `</row>`;
	console.log(ops);
	$("#output").html(ops);
};

$("#output").on("click", ".card", function(e){
	$(".card").removeClass("dottedBorder");
	$(this).addClass("dottedBorder");
	$("#textbox").val("").focus();
});

$("#textbox").keyup(mirrorText);

function mirrorText(e){
	var selectedCard = $(".dottedBorder");
	var bioTyped = $("#textbox").val();
	var bio = $(".dottedBorder").find("p.bio");
	bio.html(bioTyped);

	if (e.which === 13) {
		$("#textbox").val("");
	}
}