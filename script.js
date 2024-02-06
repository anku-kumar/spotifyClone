console.log("some js code ongoing")


async function gettingSongs() {
    let songs = await fetch("http://127.0.0.1:5500/songs/");

    let response = await songs.text()

    // console.log(response)

    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    console.log(as);
    let songList = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {

            songList.push(element.href)
        }

    }

    return songList;



}

async function main() {
    let songsplaylist = await gettingSongs();

    console.log(songsplaylist)

    for (let i = 0; i < songsplaylist.length; i++) {
        const element = songsplaylist[i].split(`/songs/`)[1];
        let goodElement = element.replaceAll("%20", " ");
        let songName = goodElement.split('(PagalWorld)')[0];

        let Created_div = document.createElement("div")
        Created_div.classList.add("song") 
        Created_div.innerHTML =
            `<img src="song.svg" class="invert" alt="">
<div class="songdetails">
<div>${songName}</div>
<div>Song Artist</div>
</div>

<div class="playForSong">
 <span>Play Now</span>
 <img src="playwithcircle.svg" class="invert" alt="">
 </div>
`;




        let playList = document.querySelector(".playList")
        playList.append(Created_div)
    }



    let song1 = new Audio(songsplaylist[2])
    // song1.play()
}


main()