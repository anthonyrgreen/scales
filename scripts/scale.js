var root = "/home/anthony/iexplainthejoke/scales/images/";

scale = function(tonic, mode){
	self.initialize(tonic, mode);
};

scale.prototype.initialize = function(tonic, mode){
	this.chords = {
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
	this.modes = [0, 1, 2, 3, 4, 5, 6];
	this.modes_names = ["Ionian", "Dorian", "Phrygian", 
								 "Lydian", "Mixolydian", "Aeolian", "Locrian"];
	this.notes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	this.notes_names = ["C", "C#", "D", "D#", "E", "F", 
								 "F#", "G", "G#", "A", "A#", "B"];
	this.scales = [0, 2, 4, 5, 7, 9, 11];
	this.scale = new Array(); // Holds the notes of the scale, sequentially
	this.scale_names = new Array(); // Same but with alphabetic notes
	this.highlights = new Array(); // Which notes are highlighted in the scale
	this.tonic = tonic;
	this.mode = mode;
};

scale.prototype.get_notes = function(tonic, mode){
// Populates the "scale" and "scale_names" arrays with the correct tonic & mode
// Clears the "highlights" array
	this.clear_highlights(); //NOT YET IMPLEMENTED
	this.tonic = tonic;
	this.mode = mode;
	for(var i = 0; i < 7; i++){
		var offset = this.scales[mode % 7];
		var next_interval = this.scales[(mode + i) % 7];
		this.scale[i] = (next_interval - offset + tonic) % 12;
		if(this.scale[i] < 0)
			this.scale[i] += 12;
		this.scale_names[i] = this.notes_names[this.scale[i]];
	}
	this.display_scale();
};

scale.prototype.display_scale = function(){
// inject the new scale into the html
	var scale_html = '';
	for(var i = 0; i < 7; i++){
		var n = scale[i];
		scale_html += '<li><img src="./images/' + n + '.png" class="note"'
									+ 'data-note_num="'+ n + ' data-highlighted=false data-"></li>';
	}
	$('#notebar').html(scale_html);
	$('#scale_tonic').html(notes_names[this.tonic]);
	$('#scale_mode').html(modes_names[this.mode]);
	$('#notebar li img').dblclick(function(){
		this.get_notes($(this).data("note_num"), 0);
	}
	$('#notebar li img').click(function(){
		this.highlight_note($(this).data("note_num"); // WE NEED TO ATTACH THE DATA TO EACH NOTE
	});
	highlight_tonic(this.tonic); // NOT YET IMPLEMENTED - need argument?
};

scale.prototype.highlight_note = function(note){
	// First change the highlights array and accompanying HTML
	var index = $.inArray(note, this.highlights);
	if(index == -1)
		this.highlights.push(note);
	else
		this.highlights.splice(index, 1);
	// Now populate the list of chords
	this.get_chords();
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
