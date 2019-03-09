








function chooseLevelScreen() {

    const ChooseLevelHTML = `
    <div id="titlemenu">
        <form class="pure-form pure-form-stacked" action="" onsubmit="return false">
            <select name="size" id="size" required onchange="myFunction()">
                <option disabled value="">Размер</option>
                <option selected value="2">&nbsp;2</option>
                <option value="3">&nbsp;3</option>
                <option value="4">&nbsp;4</option>
                <option value="5">&nbsp;5</option>
                <option value="6">&nbsp;6</option>
                <option value="7">&nbsp;7</option>
                <option value="8">&nbsp;8</option>
            </select>
            <select name="difficulty" id="difficulty" required onchange="myFunction()">
                <option disabled value="">Сложность</option>
                <option selected value="strait">Обычный</option>
                <option value="rotation">Поворот на 90</option>
                <option value="multicolour">Цветные</option>
            </select>
            <select name="cellsize" id="cellsize" required onchange="myFunction()">
                <option disabled value="">Размер клеток</option>
                <option value="0">Самый маленький</option>
                <option selected value="10">Маленький</option>
                <option value="20">Средний</option>
                <option value="30">Большой</option>
                <option value="40">Огромный</option>
            </select>
            <select name="border" id="border" required onchange="myFunction()">
                <option disabled value="">Границы</option>
                <option selected value="1">С границами</option>
                <option value="2">Без границ</option>
            </select>
           
            
            
        </form>
        <button class="button-secondary button-xlarge pure-button" onclick="fsm.startGame()">СТАРТ!</button>
    </div>
    `
const levelButton = `
<button class="button-secondary button-xlarge pure-button  pure-button-disabled" onclick=""> Простой 3х3 <br>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
</button>
`


const LevelMap = `
<div class="wrapper">
  <div class="box">1</div>
  <div class="box">${levelButton}</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
  <div class="box">6</div>
</div>

`




$( ".screen" ).html( ChooseLevelHTML );



}

function myFunction() {
    gameSettings.size = document.getElementById('size').options[size.selectedIndex].value;
    
    gameSettings.cellSize = document.getElementById('cellsize').options[cellsize.selectedIndex].value;
    gameSettings.border = document.getElementById('border').options[border.selectedIndex].value;
    gameSettings.difficulty = document.getElementById('difficulty').options[difficulty.selectedIndex].value

    console.log(gameSettings)
}