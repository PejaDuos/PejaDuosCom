const DownLoadButtS = document.querySelectorAll('a.downloadbutt');
DownLoadButtS.forEach(DownLoadButt => {
    const DownLoadButtAnimEl = DownLoadButt.querySelector('img');
    let isDownLoadButtAnimElEnd = true;
    DownLoadButtAnimEl.addEventListener('animationend', () => {
        isDownLoadButtAnimElEnd = true;
    });
    DownLoadButtAnimEl.addEventListener('animationstart', () => {
        isDownLoadButtAnimElEnd = false;
    });
    DownLoadButt.addEventListener('mouseenter', () => {
        if (isDownLoadButtAnimElEnd) {
            DownLoadButtAnimEl.style.animation = 'none';
            void DownLoadButtAnimEl.offsetWidth;
            DownLoadButtAnimEl.style.animation = 'DownloadButtonAnimation 1s';
        }
    });
});

const BananaButtS = document.querySelectorAll('a.bananabutt');
BananaButtS.forEach(BananaButt => {
    const BananaButtAnimEl = BananaButt.querySelector('img');
    let isBananaButtAnimElEnd = true;
    BananaButtAnimEl.addEventListener('animationend', () => {
        isBananaButtAnimElEnd = true;
    });
    BananaButtAnimEl.addEventListener('animationstart', () => {
        isBananaButtAnimElEnd = false;
    });
    BananaButt.addEventListener('mouseenter', () => {
        if (isBananaButtAnimElEnd) {
            BananaButtAnimEl.style.animation = 'none';
            void BananaButtAnimEl.offsetWidth;
            BananaButtAnimEl.style.animation = 'BananaButtonAnimation 2s';
        }
    });
});

const VideoButtS = document.querySelectorAll('a.videobutt');
VideoButtS.forEach(VideoButt => {
    const VideoButtAnimEl1 = VideoButt.querySelector('img:nth-child(2)');
    const VideoButtAnimEl2 = VideoButt.querySelector('img:nth-child(3)');
    let isVideoButtAnimElEnd = true;
    VideoButtAnimEl1.addEventListener('animationend', () => {
        isVideoButtAnimElEnd = true;
    });
    VideoButtAnimEl1.addEventListener('animationstart', () => {
        isVideoButtAnimElEnd = false;
    });
    VideoButt.addEventListener('mouseenter', () => {
        if (isVideoButtAnimElEnd) {
            VideoButtAnimEl1.style.animation = 'none';
            VideoButtAnimEl2.style.animation = 'none';
            void VideoButtAnimEl1.offsetWidth;
            void VideoButtAnimEl2.offsetWidth;
            VideoButtAnimEl1.style.animation = 'VideoButtonAnimationPart1 1s forwards';
            VideoButtAnimEl2.style.animation = 'VideoButtonAnimationPart2 1s forwards';
        }
    })
});

const PlayCelesteButt = document.querySelector('a.celesteplay');
const PlayCelesteButtAnimEl = PlayCelesteButt.querySelector('img');
let isPlayCelesteButtAnimElEnd = true;
PlayCelesteButtAnimEl.addEventListener('animationend', () => {
    isPlayCelesteButtAnimElEnd = true;
});
PlayCelesteButtAnimEl.addEventListener('animationstart', () => {
    isPlayCelesteButtAnimElEnd = false;
});
PlayCelesteButt.addEventListener('mouseenter', () => {
    if (isPlayCelesteButtAnimElEnd) {
        PlayCelesteButtAnimEl.style.animation = 'none';
        void PlayCelesteButtAnimEl.offsetWidth;
        PlayCelesteButtAnimEl.style.animation = 'PlayCelesteButton 2s';
    }
});



const BackgroundEl = document.querySelector('.MainBodyBG');
let BackgroundImageQueuePos = 0;
const BackgroundImageQueueLength = 5;



const PreloadImages = () => {
    for (let i = 0; i < BackgroundImageQueueLength; i++) {
        const img = new Image;
        img.scr = 'bgs/BG_' + i.toString() + '.jpg';
    }
}
PreloadImages();


function BackgroundSwitcher() {
    BackgroundImageQueuePos = (BackgroundImageQueuePos + 1) % BackgroundImageQueueLength;
    BackgroundEl.style.backgroundImage = 'url(bgs/BG_' + BackgroundImageQueuePos.toString() + '.jpg';
}

// BackgroundEl.addEventListener('click', () => {
//     BackgroundImageQueuePos = (BackgroundImageQueuePos + 1) % BackgroundImageQueueLength;
//     BackgroundEl.style.backgroundImage = 'url(bgs/BG_' + BackgroundImageQueuePos.toString() + '.jpg';
// });

setInterval(BackgroundSwitcher, 15000);


