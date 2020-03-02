const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const photo = document.querySelector('.takePhotoBtn');

async function getVideo() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        video.srcObject = stream;
        video.play();
    }
    catch (error) {
        console.log(error);
    }
}

function paintToCanvas() {
    const { videoWidth: width, videoHeight: height } = video;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels.data = redEffect(pixels.data);
        ctx.putImageData(pixels, 0, 0)
    }, 16)

}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');

    const link = document.createElement('a')
    link.href = data;
    link.setAttribute('download', 'name');
    link.textContent = 'Download';
    link.innerHTML = `<img src="${data}"/>`
    strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i + 0] = pixels[i + 0] + 100; //red
        pixels[i + 1] = pixels[i + 1] + - 50//green
        pixels[i + 2] = pixels[i + 2] - 100 //blue
    }

    return pixels;
}

getVideo();


video.addEventListener('canplay', paintToCanvas);

video.addEventListener('click', takePhoto)