



const titleScreenHTML = `
    <div id="titlemenu">
        <button class="button-secondary button-xlarge pure-button" onclick="fsm.playNewGame()"><i class="fas fa-play"></i> НАЧАТЬ</button>
        <br>
        <button class="button-secondary button-xlarge pure-button"><i class="fas fa-cog"></i> НАСТРОЙКИ</button>
        <br>
        <button class="button-secondary button-xlarge pure-button"><i class="fas fa-info-circle"></i> ОБ ИГРЕ</button>
    </div>
`;

$( ".screen" ).html( titleScreenHTML );





`
<script>
function startGame() {
  var menu = document.getElementById("titlemenu");
  var game = document.getElementById("game");

  if (menu.style.display === "none") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }

  
    game.style.display = "block";
  

}
</script>
`