function generateLine() {

    const gg = `
<div class="fon">

</div>
<div class="timerbox">0:09</div>




<div class="square" id="grid">


</div>

<!-- Modal -->
<div class="modal fade" id="modalEndGame" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalEndGameTitle">Игра закончена</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!--            <div class="modal-body">-->
            <!--            </div>-->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" onclick="newGame()">Начать сначала</button>
            </div>
        </div>
    </div>
</div>

<section class="game_container">
    <div class="progress_line">
    </div>

</section>


</div>
`;

    const progr_line = `
        <div class="container_progress_line">
            <div class="container">
                <div class="row">
                    <div class="col row">
                        <div class="back_arrow">
                            <div class="back_arrow_icon"></div>
                        </div>
                    </div>
<!--                    <div class="col-7 col-lg-4 col-md-6 col-sm-8 text-center">-->
                    <div class="col-7 text-center align-items-center">
                        <div class="row align-items-center cont_wrong_correct_answer">
                            <div class="col">
                                <div class="row wrong_answers">
                                    <div class="wrong_answer"></div>
                                    <div class="wrong_answer"></div>
                                    <div class="wrong_answer"></div>
                                </div>
                            </div>
                            <div class="col text-center level_cont">
                                <span class="level "></span>
                            </div>
                            <div class="col">
                                <div class="row correct_answers justify-content-end">
                                    <div class="correct_answer"></div>
                                    <div class="correct_answer"></div>
                                    <div class="correct_answer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col row justify-content-end">
                        <span class="points"></span> 
                    </div>
                </div>
                <div class="row row_2">
                    <div class="col align-items-center row dd">
                        <span class="time_icon"></span>
                        <span class="time"></span>
                    </div>
<!--                    <div class="col-7 col-lg-4 col-md-6 col-sm-8 align-items-center text-center">-->
                    <div class="col-7 align-items-center text-center">
                        <div class="row text-center min_max_points_line">
                            <div class="col row align-items-center">
                                <span class="min_points_icon"></span>
                                <span class="min_points"></span>
                            </div>
                            <div class="col row justify-content-center align-items-center col_level_text">
                                <span class="level_text">Уровень </span>
                            </div>
                            <div class="col row justify-content-end align-items-center">
                                <span class="max_points"></span>
                                <span class="max_points_icon"></span>
                            </div>
                        </div>
                    </div>
                    <div class="col align-items-center row justify-content-end">
                        <span class="record"></span> 
                        <span class="record_icon"></span> 
                    </div>            
                </div>
            </div>
        </div>
        <div class="progressBar">
			<div></div>
		</div>           

`;
    //  document.querySelector(".progress_line").innerHTML = progr_line;
    $(".box").html(gg);
    $(".box").append(progr_line);
    setSquare();
    $('.box').css("background-image", "url(img/game.svg)");
    $('.box').css("background-position", "bottom");

    $('.box1').css("background-image", "url(img/game2.svg)");
    $('.box1').css("background-position", "top");
    

    startGameF();
}





// <div class="row">
//     <div class="field_levels col-7 col-sm-8 row align-items-center">
//     <div class="col">
//     <div class="row justify-content-end">
//
//     <span> &nbsp; &lt; </span>
// </div>
// </div>
// <div class="col-3 col-md-2 levels text-center ">
//     <div class="w-100 level_br"></div>
//
//     </div>
//     <div class="col">
//     <div class="row">
//     <span> &gt; &nbsp; </span>
//
// </div>
// </div>
// </div>



