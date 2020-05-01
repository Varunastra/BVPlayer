/////////////// ANALYSER FFTSIZE ////////////////////////
// analyser.fftSize = 32;
// analyser.fftSize = 64;
// analyser.fftSize = 128;
// analyser.fftSize = 256;
// analyser.fftSize = 512;
// analyser.fftSize = 1024;
// analyser.fftSize = 2048;
// analyser.fftSize = 4096;
// analyser.fftSize = 8192;
const FFTSize = 16384;
let analyser, dataArr, bufferLength, context;
// analyser.fftSize = 32768;

export function getAudioBuffer(audio) {
    if (!dataArr) {
        context = new AudioContext();
        let src = context.createMediaElementSource(audio);
        analyser = context.createAnalyser();
        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = FFTSize;

        bufferLength = analyser.frequencyBinCount;
        dataArr = new Uint8Array(bufferLength);
    }
    else {
        analyser.getByteFrequencyData(dataArr);
    }
    return dataArr;
}

export function getBufferLength() {
    return bufferLength;
}

export function getContext() {
    if (context.state === "suspended") {
        context.resume();
    }
    return context;
}