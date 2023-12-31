const btnRight = document.getElementById('right');
const btnLeft  = document.getElementById('left');
const exit     = document.querySelectorAll('.exit');
const btnHome  = document.querySelectorAll('.btn-home');
const homeSec  = document.querySelectorAll('.home-cont > div');
const titleSec = document.querySelectorAll('.home-cont .title-sec');
const imgSec   = document.querySelectorAll('.home-cont .img-sec');
const pageSec  = document.querySelectorAll('.page-cont > div');
const brand    = document.querySelector('.container .brand');
const loading  = document.getElementById('loading');
const dot      = document.getElementById('dot');

let classSec = ['hidden-bottom', 'spot-bottom', 'spot', 'spot-top', 'hidden-top'];
let rotNum   = 0;
let home     = true;
let idxPage;
let stillLoad = true;
let dotIdx = 0;
let clickTimes = new Date().getTime();

dotAnim();

window.onload = function(){
    loading.classList.add('hidden');
    stillLoad = false;
    setTimeout(() => {
        loading.style.display = 'none';
    }, 1500);
};

document.addEventListener('keyup', (e) => {
    if(home) {
        if(e.key === 'ArrowRight' || e.key === 'ArrowUp') {
            btnRight.click();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
            btnLeft.click();
        }
    }
});

const speedSpan = 100;
titleSec.forEach(title => {
    title.innerHTML = title.innerText
                .split('')
                .map((letter, num) => `<span style="transition-delay:${num * speedSpan}ms">${letter}</span>`)
                .join('');
});

btnRight.addEventListener('click', () => {
    if((new Date().getTime() - clickTimes) > 600) {
        clickTimes = new Date().getTime();
        skew('skew-right');

        rotNum += 190;
        rotateBrand();

        classSec.unshift(classSec.pop());
        removeClassAll();
        addClassAll();
    }  
});

btnLeft.addEventListener('click', () => {
    if((new Date().getTime() - clickTimes) > 600 ) {
        clickTimes = new Date().getTime();
        skew('skew-left');

        rotNum -= 190;
        rotateBrand();
    
        classSec.push(classSec.shift());
        removeClassAll();
        addClassAll();
    }
});

homeSec.forEach((page, idx) => {
    page.children[0].children[1].addEventListener('click', () => {
        home = false;
        idxPage = idx;
        clickPage(idxPage);
        pageSec[idxPage].classList.add('active');
    });
});

exit.forEach(btn => {
    btn.addEventListener('click', () => {
        home = true;
        pageSec[idxPage].classList.remove('active');
        clickPage(idxPage);
    });
});

function dotAnim() {
    const load = setInterval(() => {
        if(stillLoad) {
            if(dotIdx < 3) {
                dot.innerHTML += '.';
                dotIdx++;
            } else {
                dot.innerHTML = '';
                dotIdx = 0;
            }
        } else {
            clearInterval(load);
        }
    }, 400);
};

function clickPage(numIdx) {
    homeSec[numIdx].classList.toggle('hidden');
};

function addClassAll() {
    homeSec.forEach((menu, idx) => {
        menu.classList.add(classSec[idx]);
    });
};

function removeClassAll() {
    homeSec.forEach(menu => {
        menu.classList.remove('spot');
        menu.classList.remove('spot-top');
        menu.classList.remove('spot-bottom');
        menu.classList.remove('hidden-top');
        menu.classList.remove('hidden-bottom');
    })
};

function rotateBrand() {
    brand.style.transform = `rotateZ(${rotNum}deg)`;
};

function skew(el) {
    imgSec.forEach(img => {
        img.classList.add(`${el}`);
        setTimeout(() => {
            img.classList.remove(`${el}`)
        }, 500);
    });
}



