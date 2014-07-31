scaleLength = 12
majorScale = [0,2,4,5,7,9,11]
minorScale = [0,2,3,5,7,8,10]
scaleNames = 
  [["B", "C", null], ["C", null, "D"], [null, "D", null], ["D", null, "E"], [null, "E", "F"]
  ,["E", "F", null], ["F", null, "G"], [null, "G", null], ["G", null, "A"], [null, "A", null]
  ,["A", null, "B"], [null, "B", "C"]].map(note)
chords = {
  "maj" : [0, 4, 7],
  "min" : [0, 3, 7],
  "dim" : [0, 3, 6],
  "maj7" : [0, 4, 7, 11],
  "min7" : [0, 3, 7, 10],
  "dom7" : [0, 4, 7, 10],
  "dim7" : [0, 3, 6, 10],
  "maj6" : [0, 4, 7, 9],
  "min6" : [0, 3, 7, 9]
  }

function note(list){
  return {sharp : list[0],
          pure : list[1],
          flat : list[2]}
}

Array.prototype.rotate = function(n){
    while (this.length && n < 0) n += this.length;
    this.push.apply(this, this.splice(0, n));
    return this;
}

Array.prototype.contains = function(obj){
  for (var i = 0; i < this.length; i++)
    if (this[i] === obj) return true;  
  return false;
}

function scale(){
  this.notes = new Array()
  return this
}

scale.prototype.fromScale = function(root, scale, mode){
	scale.rotate(mode)
  offset = root - scale[0]
  for(var i = 0; i < scale.length; i++){
    scale[i] = (scale[i] + offset)
    this.notes.push(scale[i])
  }
  this.normalize()
  return this
}
scale.prototype.normalize = function(){
  for(var i = 0; i < this.notes.length; i++){
    this.notes[i] = this.notes[i] % scaleLength
    while(this.notes[i] < 0) this.notes[i] += scaleLength
  }
  return this
}
scale.prototype.print = function(){
  var flatList = new Array(), sharpList = new Array()
  for(var i = 0; i < this.notes.length; i++){
    if(scaleNames[this.notes[i]].pure){
      flatList.push(scaleNames[this.notes[i]].pure)
      sharpList.push(scaleNames[this.notes[i]].pure)
    }
    else if(scaleNames[this.notes[i]].flat && scaleNames[this.notes[i]].sharp){
      flatList.push(scaleNames[this.notes[i]].flat)
      sharpList.push(scaleNames[this.notes[i]].sharp)
    }
    else{
      if(scaleNames[this.notes[i]].flat){
        flatList.push(scaleNames[this.notes[i]].flat)
        sharpList.push(null)
      }
      else{
        flatList.push(null)
        sharpList.push(scaleNames[this.notes[i]].sharp)
      }
    }    
  }
  var prettify = function(mode){
    var prettified = Array()
    if(mode === "flat"){
      for(var i = 0; i < this.notes.length; i++){
        if(scaleNames[this.notes[i]].pure)
          prettified.push(this.notes[i].pure)
        else
          prettified.push(this.notes[i].flat + "b")
      }
    }
    else if(mode === "sharp"){
      for(var i = 0; i < this.notes.length; i++){
        if(scaleNames[this.notes[i]].pure)
          prettified.push(this.notes[i].pure)
        else
          prettified.push(this.notes[i].sharp + "#")
      }
    }
    //console.log(prettified)
    return prettified
  }

  if(flatList.contains(null)) return prettify("sharp")
  else if(sharpList.contains(null)) return prettify("flat")
  var collisions = function(noteList){
    var checkList = new Array(), numCollisions = 0
    for(var i = 0; i < noteList.length; i++){
      if(checkList.contains(noteList[i]))
        numCollisions++
      else
        checkList.push(noteList[i])
    }
    return numCollisions
  }
  if(collisions(sharpList) <= collisions(flatList))
    return prettify("sharp")
  else
    return prettify("flat")
}

var Cmaj = new scale().fromScale(0, majorScale, 0)
var Dmaj = new scale().fromScale(2, majorScale, 0)
var Gmaj = new scale().fromScale(7, majorScale, 0)
var Cmin = new scale().fromScale(0, majorScale, 5)
Cmaj.print()
Dmaj.print()
Gmaj.print()
Cmin.print()
