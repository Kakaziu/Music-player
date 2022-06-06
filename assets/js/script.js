const audio = document.querySelector('.audio')
const reproBtn = document.querySelector('.btn-repro')
const divMusic = document.querySelectorAll('.content')
const musicMenu = document.querySelector('#musics')
const prox = document.querySelector('.prox')
const back = document.querySelector('.back')
const com = document.querySelector('.com')
const fin = document.querySelector('.fin')
const barra = document.querySelector('progress')
const increaseBtn = document.querySelector('#increase')
const decreaseBtn = document.querySelector('#decrease')
let interval;
let interval2;
let index_song = 0
console.log(index_song)

audio.volume = 0.5

const set = document.querySelector('.set')
const imgSet = set.querySelector('img')

function repro(){
    dinamicTime()
    audio.play()
    reproBtn.src = './assets/img/pause.png'
    reproBtn.setAttribute('onclick', 'pause()')
}

function dinamicMenuOn(){
    imgSet.src = './assets/img/130906.png'
    musicMenu.classList.remove('musics-display-off')
    set.setAttribute('onclick', 'dinamicMenuOff()')
}

function dinamicMenuOff(){
    imgSet.src = './assets/img/1633716.png'
    musicMenu.classList.add('musics-display-off')
    set.setAttribute('onclick', 'dinamicMenuOn()')
}

function pause(){
    audio.pause()
    clearInterval(interval)
    clearInterval(interval2)
    reproBtn.src = './assets/img/repro.png'
    reproBtn.setAttribute('onclick', 'repro()')
}

function increaseVol(){
    audio.volume += 0.1
}

function decreaseVol(){
    audio.volume -= 0.1
}

function getEls(div){
    return {
        src_img: div.getAttribute('src_img'),
        src_aud: div.getAttribute('src_aud'),
        nome: div.getAttribute('nome'),
        autor: div.getAttribute('autor'),
        time: div.getAttribute('time'),
        id: div.getAttribute('id')
    }
}

for(let i = 0; i < divMusic.length; i++){


    divMusic[i].addEventListener('click', (e) =>{
        reproBtn.src = './assets/img/repro.png'
        reproBtn.setAttribute('onclick', 'repro()')

        renderMusic(i)
        
    })
}

function renderMusic(num){
    reproBtn.src = './assets/img/repro.png'
    reproBtn.setAttribute('onclick', 'repro()')
    clearInterval(interval2)
    barra.style.width = '0px'

    const img = document.querySelector('.img-prin')
    const title = document.querySelector('.title-prin')
    const autor = document.querySelector('.autor-prin')


    
    const elsMusic = getEls(divMusic[num])

    img.src = elsMusic.src_img
    title.innerHTML = elsMusic.nome
    autor.innerHTML = elsMusic.autor
    audio.src = elsMusic.src_aud 
    setInterval(function(){
        com.innerHTML = segs_min(Math.floor(audio.currentTime))
    }, 1000)
    fin.innerHTML = segs_min(Number(elsMusic.time))
    index_song = Number(elsMusic.id)
}

function segs_min(s){
    const min = Math.floor(s/ 60)
    let seg = s % 60

    if(seg < 10){
        seg = '0' + seg
    }

    return min + ':' + seg
}

function dinamicTime(){
    setInterval(function(){
        com.innerHTML = segs_min(Math.floor(audio.currentTime))
    }, 1000)
}

function formatarTempo(num){
    return num < 10 ? `0${num}` : num
}

prox.addEventListener('click', () =>{
    if(index_song >= divMusic.length - 1){
        index_song = 0
        renderMusic(index_song)
        return
    }
    index_song++

   renderMusic(index_song)
})

back.addEventListener('click', () =>{
    if(index_song < 1){
        index_song = divMusic.length
    }

    index_song--
    console.log(index_song
        )

    renderMusic(index_song)
})

audio.addEventListener('timeupdate', () =>{
    barra.style.width = Math.floor((audio.currentTime / audio.duration) * 100) + '%'
})
