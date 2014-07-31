notes = range(25)
notes_names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
modes = range(7)
modes_names = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"]
scales = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16, 17, 19, 21, 23, 24]

chords = {
	"maj" : [0, 4, 7],
	"min" : [0, 3, 7],
	"dim" : [0, 3, 6],
	"maj7" : [0, 4, 7, 11],
	"min7" : [0, 3, 7, 10],
	"dom7" : [0, 4, 7, 10],
	"dim7" : [0, 3, 6, 10]
}

current_scale = [] 

def give_scale(tonic, mode):	
	del current_scale[0:len(current_scale)]
	for x in range(8):
		current_scale.append(tonic + scales[x + mode] - scales[mode])
	return

def find_chords(note):
	print("Chords for " + notes_names[note % 12] + ":")
	for chord_name in chords:
		included = True
		for x in chords[chord_name]:
			if (note + x) not in current_scale and (note + x) % 12 not in current_scale:
				included = False
		if included:
			print chord_name

def main():
	give_scale(0, 0)
	return

main()	
