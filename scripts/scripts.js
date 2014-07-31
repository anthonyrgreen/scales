var root = "/home/anthony/iexplainthejoke/scales/images/";

var chords = {
 	 "maj" : [0, 4, 7],
 	 "min" : [0, 3, 7],
 	 "dim" : [0, 3, 6],
 	 "maj7" : [0, 4, 7, 11],
 	 "min7" : [0, 3, 7, 10],
 	 "dom7" : [0, 4, 7, 10],
 	 "dim7" : [0, 3, 6, 10],
	 "maj6" : [0, 4, 7, 9],
	 "min6" : [0, 3, 7, 9]
};
var modes = [0, 1, 2, 3, 4, 5, 6];
var modes_names = ["Ionian", "Dorian", "Phrygian", 
								 "Lydian", "Mixolydian", "Aeolian", "Locrian"];
var notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var notes_names = ["C", "C#", "D", "D#", "E", "F", 
								 "F#", "G", "G#", "A", "A#", "B"];
var scales = [0, 2, 4, 5, 7, 9, 11];


function prelim(){
	current_scale = new Array();
	current_highlights = new Array();
	current_tonic = 0;
	
	get_notes(0, 0);
};

function get_notes(tonic, mode){
	tonic = parseInt(tonic);
	current_tonic = tonic;
  current_scale = [];
  for(var i = 0; i < 7; i++){
		var note_num = (tonic + scales[(i + mode) % 7] - scales[mode]) % 12;
		console.log(note_num+" = ("+tonic+" + "+scales[(i+mode)%7]+" - "+scales[mode]+") % 12");
		if(note_num >= 0)
    	current_scale[i] = note_num;
		else
			current_scale[i] = note_num + 12;
  }

  var list_items_html = '';
  for(var i = 0; i < 7; i++){
		var n = current_scale[i];
    list_items_html += '<li><img src="./images/' + n + '.png" class="' 
										 + n + '" onclick="highlight_note(' + n + ')" num="'
										 + n + '"></li>';
	}
  $("#scale_tonic").html(notes_names[current_tonic]);
	$("#scale_mode").html(modes_names[mode]);
  $("#notebar").html(list_items_html);
	$("#slider ul#notebar li img").dblclick(function(){	
		console.log("Calling get_notes with tonic=" + $(this).attr("num") + ", mode=0");
		get_notes($(this).attr("num"),0);
	});
	highlight_note(tonic);
};

function get_chords(){
	var chords_html = "";
	for(var chord_name in chords){
		if(chords.hasOwnProperty(chord_name)){
			var included = true;
			for(var x in chords[chord_name])
				if(current_scale.indexOf((current_tonic + chords[chord_name][x]) % 12) == -1)
					included = false;
			if(included)
				chords_html += '<li class="' + chord_name + '" checked="false">' + chord_name + '</li>';
		}
	}

	$("#chords_title").html("Chords on " + notes_names[current_tonic]);
	$("ul#chords_list").html(chords_html);
	$("ul#chords_list li").click(function(){
		highlight_chord($(this).attr("class"));		
	});
};

function highlight_note(note){
	// Remove extant highlighting
	$(".tonic, .following").removeClass("tonic following");
	
	// Rehighlight tonic
	$("." + note).addClass("tonic");
	current_tonic = note;
	
	// Now populate the list of chords
	get_chords();
};

function highlight_chord(chord_name){
	$(".following").removeClass("following");
	var this_chord = $("ul#chords_list li." + chord_name);
	if(this_chord.attr("checked") == "false"){
		$('ul#chords_list li[checked="true"]').attr("checked", "false");
		this_chord.attr("checked", "true");
		for(var x in chords[chord_name]){
			var n = (chords[chord_name][x] + current_tonic) % 12;
			$('.' + n).addClass("following");
		}
	}
	else{
		this_chord.attr("checked", "false");
	}
};
