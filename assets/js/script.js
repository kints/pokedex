const traerSelectPokemones = () => {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("https://pokeapi.co/api/v2/pokemon/?limit=151", requestOptions)
    .then((response) => response.text())
    .then(
      (result) => {
        const pokeJson = JSON.parse(result);
        const elementoPokemon = pokeJson.results.reduce(
          (pokemon, value) => {
            return pokemon + `<option value="${value.name}">${titleCase(value.name)}</option>`;
          }, ""
        )
        document.getElementById("listaPokemones").innerHTML = elementoPokemon;
      }
    ).catch((error) => console.log(error));
}
const traerPokemon = () => {
  pokemonName = document.getElementById("listaPokemones").value;
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName, requestOptions)
    .then((response) => response.json())
    .then((pokeJson) => {
      const pokeName = pokeJson.name;
      document.getElementById("pokeNameId").innerText = pokeName;
      document.getElementById("pokeFotoId").src = pokeJson.sprites.front_default;
      document.getElementById("pokeFotoId").alt = pokeName;
      document.getElementById("pokeSonido").src = pokeJson.cries.legacy;
      const pokeHabilidades = pokeJson.stats.reduce((estadisticas, value) => {
        return estadisticas + `<li class="pokemon-stat">
                <span class="stat-name"><b>${value.stat.name}: </b></span>
                <span>${value.base_stat}</span>
              </li>`;
      }, "");

      document.getElementById("pokeStatsId").innerHTML = pokeHabilidades;
    }
    ).catch((error) => console.log(error));
}
function titleCase(str) {
  return str.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}
function toggleAudio() {
  audio = document.querySelector('audio');
  if (audio.paused) {
    audio.play();
    playerButton.innerHTML = pauseIcon;
  } else {
    audio.pause();
    playerButton.innerHTML = playIcon;
  }
}