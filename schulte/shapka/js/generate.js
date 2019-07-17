function generateLine() {
    const progr_line = `
        <div class="container_progress_line">
            <div class="container">
                <div class="row">
                    <div class="col row">
                        <div class="back_arrow">
                            <div class="back_arrow_icon"></div>
                        </div>
                    </div>
                    <div class="col-7 col-lg-4 col-md-6 col-sm-8 text-center">
                        <div class="row align-items-center">
                            <div class="col">
                                <div class="row wrong_answers ">
                                    <div class="wrong_answer"></div>
                                    <div class="wrong_answer"></div>
                                    <div class="wrong_answer"></div>
                                </div>
                            </div>
                            <div class="col text-center">
                                <span class="level "></span>
                            </div>
                            <div class="col">
                                <div class="row correct_answers">
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
                    <div class="col align-items-center row">
                        <span class="time_icon"></span>
                        <span class="time"></span>
                    </div>
                    <div class="col-7 col-lg-4 col-md-6 col-sm-8 align-items-center text-center">
                        <div class="row text-center min_max_points_line">
                            <div class="col row justify-content-center align-items-center">
                                <span class="min_points_icon"></span>
                                <span class="min_points"></span>
                            </div>
                            <div class="col col_level_text">
                                <span class="level_text">Уровень </span>
                            </div>
                            <div class="col row justify-content-center align-items-center">
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
    document.querySelector(".progress_line").innerHTML = progr_line;

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