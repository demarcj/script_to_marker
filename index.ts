import "./library/object";
import "./library/string";
import "./library/array";
import "./library/json";
import * as lib from "./library/library";

type script_data = Record<number, {time: string, text: string}>;

var text_layer_express = `
  m = thisComp.marker;

  if (m.numKeys == 0) {
    "";
  } else {
    k = m.nearestKey(time);
    if (k.time > time && k.index > 1) k = m.key(k.index - 1);

    start = k.time;
    end = k.time + k.duration;

    (time >= start && time < end) ? k.comment : "";
  }
`

var get_script = (): script_data | undefined => {
  try {
    var file = File.openDialog("Select a text file", "*.txt");
  
    if (file === null) {
      return;
    }
  
    file.open("r");
    var content = file.read();
    file.close();
  
    var content_list = content.split(`\n`).filter(txt => txt?.length && txt.length > 0);
    var content_map: script_data = {};
    var num = ``;
    var time_stamp = ``;
    content_list.forEach((item, i) => {
      var index = (i + 1) % 3;
      if((index % 3) === 0){
        content_map[parseInt(num)] = {
          time: time_stamp,
          text: item
        };
        return;
      }
      if((index % 2) === 0){
        time_stamp = item;
        return;
      }
      num = item;
    });
    return content_map;
  } catch(e) {
    alert(`Couldn't retreive the file.`);
  }
}

var timestampToSeconds = (stamp: string): number => {
  var normalized = stamp.replace(",", ".");
  var parts = normalized.split(":");
  if(parts.length !== 3){
    return 0;
  }

  var hours = parseInt(parts[0], 10) || 0;
  var mins  = parseInt(parts[1], 10) || 0;
  var secsAndMs = parts[2].split(".");
  var secs = parseInt(secsAndMs[0], 10) || 0;
  var ms   = parseInt(secsAndMs[1], 10) || 0;

  return hours * 3600 + mins * 60 + secs + ms / 1000;
};

var create_comment = (content: script_data): boolean => {
  try{
    var content_list = Object.values(content);
    content_list.forEach((item, i) => {
      var duration = item.time.split(` --> `);
      var start_dur = timestampToSeconds(duration[0]);
      var end_dur = timestampToSeconds(duration[1]);
      var marker = new MarkerValue(item.text);
      marker.duration = end_dur - start_dur;
      marker.cuePointName = `script_to_marker`;
      lib.active_comp()?.markerProperty.setValueAtTime(start_dur, marker);
    });
    return true;
  } catch(e) {
    return false;
  }
};

var create_text_layer = () => {
  try{
    var textLayer = lib.active_comp()!.layers.addText(``);
    textLayer.name = `Script`;
    
    var textSource = lib.active_comp()!.layer(1).property(`Source Text`);
    var textVal = textSource.value;
    textVal.justification = ParagraphJustification.CENTER_JUSTIFY;
    
    var textDoc = textLayer.property("ADBE Text Properties").property("ADBE Text Document");
    textDoc.expression = text_layer_express;
    textSource.setValue(textVal);
  } catch(e) {
    alert(`Something wrong happened when trying to create text layers`);
  }
};

var clear_script = () => {
  try {
    var comp = lib.active_comp();
    if(!comp){
      return false;
    } 

    var markers = comp?.markerProperty;
    var index = 1;
    Array(markers.numKeys).fill(undefined).forEach((marker, i) => {
      var cue = markers.keyValue(index)?.cuePointName;
      if(cue && cue === `script_to_marker`){
        markers.removeKey(index);
        return;
      }
      index += 1;
    });
  } catch(e) {
    alert(`Something wrong happened when trying to delete the markers`)
  }
};

var handle_clear_script = () => {
  app.beginUndoGroup(`Delete All Comments`);
  try {
    if (lib.check_error([lib.has_active_comp])) {
      return;
    }
    clear_script();
  } catch(e) {
    lib.error_message(`Delete All Comments`);
  } finally {
    app.endUndoGroup();
  }
};

var script_to_marker = () => {
  app.beginUndoGroup(`Script to Marker`);
  try {
    if(lib.check_error([lib.has_active_comp])){
      return;
    }
  
    var content = get_script();
    if(!content){
      return;
    }
    
    if(!create_comment(content)){
      return;
    }
    
    create_text_layer();
  } catch(e) {
    lib.error_message(`Script to Marker`);
  } finally {
    app.endUndoGroup();
  }
};