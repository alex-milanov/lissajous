
var samples = [];
var pad, instr, drumkit;
loadSounds([
    './assets/samples/metpiece/burning-pad.mp3',
    './assets/samples/metpiece/somna/snare2.wav',
    './assets/samples/metpiece/somna/snare4.wav'
  ],
  function(list) {
    samples = list;
    pad = new track().sample(samples[0]);
    drumkit = new track().sample(samples);

    pad.beat(64).nl(64).clamp(0.2,1).loop(1).notes(64).vol(0);

    instr.beat(4).nl(2).vol(0);

    drumkit.beat(4,2,2,4,4).nl(2,1,1,2,2).sseq(1,2,2,1,2).vol(0);

});


function _start(){
  pad.vol(0.2)
}

function _beat(){
  drumkit.vol(0.2)
}

function _part2(){
  pad.notes(73)
}
