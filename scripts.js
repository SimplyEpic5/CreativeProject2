document.getElementById("songSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const song = document.getElementById("songInput").value.trim();
  const artist = document.getElementById("artistInput").value.trim();
  if (song === "") return;
  console.log(song + " by " + artist);

  // Lyrics
  const url = "https://api.lyrics.ovh/v1/" + artist + "/" + song;
  fetch(url).then(function r(response) {
    return response.json();
  }).then(function(json) {
    let results = "";
    results += '<div class="sectionHeader">';
    results += '<h2>' + song.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') + "</h2>";
    results += '<h3>by ' + artist.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') + "</h3>";
    results += "</div>";
    if ('lyrics' in json){
      if (json.lyrics.split(" ")[0] == "Paroles") {
        let blocks = json.lyrics.split("\n\n\n\n\n");
        for (let i = 0; i < blocks.length; i++) {
          results += "<div class=\"lyricBlock\">"
          let lyrics = blocks[i].split("\n");
          for (let i = 1; i < lyrics.length; i++) {
            if (lyrics[i] != "") {
              results += '<div class=\"lyrics\"><p>' + lyrics[i] + '<p></div>'
            }
          }
          results += "</div>"
        }
      } else {
        let blocks = json.lyrics.split("\n\n");
        for (let i = 0; i < blocks.length; i++) {
          results += "<div class=\"lyricBlock\">"
          let lyrics = blocks[i].split("\n");
          for (let i = 0; i < lyrics.length; i++) {
            if (lyrics[i] != "") {
              results += '<div class=\"lyrics\"><p>' + lyrics[i] + '<p></div>'
            }
          }
          results += "</div>"
        }
      }
    } else {
      results += "<div class=\"lyricBlock\">"
      results += '<div class=\"lyrics\"><p>' + "No Lyrics Found" + '<p></div>'
      results += "</div>"
    }

    document.getElementById("lyricResults").innerHTML = results
  });

  // Similar Artists
  let url2 = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + artist + "&api_key=ec7c03c8b588cf45f9fe6ff4ef68550e&format=json"
  fetch(url2).then(function r(response) {
    return response.json();
  }).then(function(json) {
    let results = "";

    if ('artist' in json && json.artist.similar.artist.length > 0) {
      results += '<div class="sectionHeader">';
      results += '<h2>More like ' + '<a href=\"' + json.artist.url + '\">' + json.artist.name + '</a>' + ":</h2>";
      results += '</div>';
      results += '<div class="scrollview">';

      for (let i = 0; i < json.artist.similar.artist.length; i++) {
        results += '<div class="block">';
        results += '<a href=\"' + json.artist.similar.artist[i].url + '\">';
        results += "<img src=\"" + json.artist.similar.artist[i].image[3]['#text'] + "\" alt=\"" + json.artist.similar.artist[i].name + "\"></img>"
        results += '<p>' + json.artist.similar.artist[i].name + '<p>'
        results += '</a>';
        results += '</div>';
      }

      results += '</div>';
    } else {
      results += '<div class="sectionHeader">';
      results += '<h2>No Similar Artists Could Be Found</h2>';
      results += '</div>';
    }
    document.getElementById("similarResults").innerHTML = results
  });
});


//"http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" + + "&api_key=ec7c03c8b588cf45f9fe6ff4ef68550e&format=json"
//330520-Creative-YGELK0OT

//lfm key ec7c03c8b588cf45f9fe6ff4ef68550e
//4170f07a5738c05ec570bed329423b08
