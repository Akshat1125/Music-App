console.log("javascript");
let songIndex=0;
let audioElement = new Audio("06. Aaoge Jab Tum.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('Songitem'));
let Timer=document.querySelector('#timer');
console.log(audioElement.duration)

// Timer.innerText=`${audioElement.duration}/${progress}`;
Timer.innerText=`0:00/5:09`;

let songs=[
    {songName: "aaoge jab tum", filePath:"06. Aaoge Jab Tum.mp3",coverPath:'logo.jpg'},
    {songName: "06. Aaoge Jab Tum", filePath:"06. Aaoge Jab Tum.mp3",coverPath:'logo.jpg'},
    {songName: "yaad teri aayegi", filePath:'06. Aaoge Jab Tum.mp3',coverPath:'logo.jpg'},
    {songName: "chahu ya na mai", filePath:'06. Aaoge Jab Tum.mp3',coverPath:'logo.jpg'},
    {songName: "whistle baja", filePath:'06. Aaoge Jab Tum.mp3',coverPath:'logo.jpg'},
    {songName: "helllo brother", filePath:'06. Aaoge Jab Tum.mp3',coverPath:'logo.jpg'},
    {songName: "hagi maru", filePath:'06. Aaoge Jab Tum.mp3',coverPath:'logo.jpg'},
    {songName: "yuvraj", filePath:'06. Aaoge Jab Tum.mp3',coverPath:'logo.jpg'},
        ]
// for(i=0;i<songs.length;i++){
// console.log(songs[i].filePath);
// }
songItems.forEach((element, i) => {
         element.getElementsByTagName('img')[0].src = songs[i].coverPath;
         element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
     })
//audioElement.play();
//handle play/pause click
masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            makeAllPlays();
            console.log(songIndex)
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                if(element.id==songIndex) {
                   element.classList.remove('fa-play');
                   element.classList.add('fa-pause');
                }
             });
            masterPlay.classList.remove('fa-play');
            masterPlay.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
         else{
            audioElement.pause();
            Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
                if(element.id==songIndex) {
                   element.classList.remove('fa-pause');
                   element.classList.add('fa-play');
                }
             });
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            gif.style.opacity = 0;
         }
    })
//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    Timer.innerText=`${parseInt(audioElement.currentTime/60)}:${parseInt(audioElement.currentTime%60)}/${parseInt(audioElement.duration/60)}:${parseInt(audioElement.duration%60)}`;
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if (audioElement.paused || audioElement.currentTime <= 0) {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // console.log(e.target.id);
          e.target.classList.remove('fa-play');
          e.target.classList.add('fa-pause');
          masterSongName.innerText = songs[songIndex].songName;
          audioElement.src = `${songs[songIndex].filePath}`
          audioElement.currentTime = 0;
          audioElement.play();
          gif.style.opacity = 1;
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');}
          else{
            makeAllPlays();
           e.target.classList.remove('fa-pause');
          e.target.classList.add('fa-play');
          audioElement.pause();
          gif.style.opacity = 0;
          masterPlay.classList.remove('fa-pause');
          masterPlay.classList.add('fa-play');
          }
        })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7)
    songIndex=0;
    else
    songIndex += 1;
    audioElement.src = `${songs[songIndex].filePath}`;
    masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          makeAllPlays();
          Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
             if(element.id==songIndex) {
                element.classList.remove('fa-play');
                element.classList.add('fa-pause');
             }
          });
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
          gif.style.opacity = 1;


})
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0)
    songIndex=songs.length-1;
    else
    songIndex -=1;
    audioElement.src = `${songs[songIndex].filePath}`
    masterSongName.innerText = songs[songIndex].songName;
          audioElement.currentTime = 0;
          audioElement.play();
          makeAllPlays();
          Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            if(element.id==songIndex) {
               element.classList.remove('fa-play');
               element.classList.add('fa-pause');
            }
         });
          masterPlay.classList.remove('fa-play');
          masterPlay.classList.add('fa-pause');
          gif.style.opacity = 1;
})