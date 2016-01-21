
var pno = [];
var p, pb, bass, doodle;
loadSounds([
    './assets/samples/pianosong/piano1.wav',
    './assets/samples/pianosong/pianobass.wav',
    './assets/samples/pianosong/pianodoodle.wav',
    './assets/samples/pianosong/bass.wav',
    './assets/samples/pianosong/synth.wav',
    './assets/samples/pianosong/perc.wav'
  ],
  function(list) {
    pno = list;
    p = new track().sample(pno[0]);
    pb = new track().sample(pno[1]);
    doodle = new track().sample(pno[2]);
    bass = new track().sample(pno[3]);

    // some beats
    p.beat(4).nl(4).clamp(1/16).loop(1).clshift(-1/16);
    pb.beat(4).nl(4).clamp(1/16).loop(1).clshift(-1/16);
    bass.beat(4).nl(4).clamp(1/16).clshift(-1/16);

    doodle.beat(4,2,2).clamp(1/32).clshift(-3/32);

    p.clamp(1/32); pb.clamp(1/32); bass.clamp(1/32);

});
