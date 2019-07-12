/* In-Game Global Constants */
const MAX_SECONDS = 10;
const BEGIN_DELAY_IN_SEC = 0.5;
const END_DELAY_IN_SEC = 0.5;
const ANSWER_POPUP_DURATION_IN_SEC = 1.5;
const CARD_COUNT = 9;
const REPEAT_COUNT = 5;

/* In-Game Global Elements */
var $backBtn, $infoBtn, $tryCountDiv, $bestScoreDiv, $appTitleDiv, $dummyInput; // Header Area
var $creatorDiv, $commentDiv, $startBtn, $answerPopupDiv, $card; // Content Area

/* In-Game Global Variables */
var currentTry;
var resultSum, resultAverage;
var bestRecord = 0;
var timers = [];
var records = [];
var isPlayingGame = false;

$(document).ready(function() {
    // Init Elements
    $backBtn = $("button#back");
    $infoBtn = $("button#info");
    $tryCountDiv = $("div#tryCount");
    $bestScoreDiv = $("div#bestScore");
    $appTitleDiv = $("div#appTitle");
    $dummyInput = $("input#dummy");
    $creatorDiv = $("div#creator");
    $commentDiv = $("div#comment");
    $startBtn = $("button#start");
    $answerPopupDiv = $("div#answerPopup");
    $card = $("div#card");

    // Init Timers
    for (var i = 0; i < 4; i++) timers[i] = null;
    for (var i = 0; i < 5; i++) records[i] = null;
    
    // Get Storage Record
    if (isStorageAvailable) bestRecord = localStorage.getItem(LS_BEST_RECORD);
    
    // Focus on Input (for opening mobile soft-keyboard)
    $dummyInput.on("click", function(e) {
        $(this).focus();
    });

    // Description Popup
    $infoBtn.on("click", function() {
        var alertStr1 = "[등급 구분표]\n";
        alertStr1 += "300ms 미만 : Master\n";
        alertStr1 += "300ms 이상 350ms 미만 : " + getResultGrade(300) + "\n";
        alertStr1 += "350ms 이상 400ms 미만 : " + getResultGrade(350) + "\n";
        alertStr1 += "400ms 이상 450ms 미만 : " + getResultGrade(400) + "\n";
        alertStr1 += "450ms 이상 500ms 미만 : " + getResultGrade(450) + "\n";
        alertStr1 += "500ms 이상 550ms 미만 : " + getResultGrade(500) + "\n";
        alertStr1 += "550ms 이상 600ms 미만 : " + getResultGrade(550) + "\n";

        var alertStr2 = "600ms 이상 650ms 미만 : " + getResultGrade(600) + "\n";
        alertStr2 += "650ms 이상 700ms 미만 : " + getResultGrade(650) + "\n";
        alertStr2 += "700ms 이상 750ms 미만 : " + getResultGrade(700) + "\n";
        alertStr2 += "750ms 이상 800ms 미만 : " + getResultGrade(750) + "\n";
        alertStr2 += "800ms 이상 850ms 미만 : " + getResultGrade(800) + "\n";
        alertStr2 += "850ms 이상 900ms 미만 : " + getResultGrade(850) + "\n";
        alertStr2 += "900ms 이상 950ms 미만 : " + getResultGrade(900) + "\n";
        alertStr2 += "950ms 이상 1000ms 미만 : " + getResultGrade(950) + "\n";

        var alertStr3 = "1000ms 이상 1050ms 미만 : " + getResultGrade(1000) + "\n";
        alertStr3 += "1050ms 이상 1100ms 미만 : " + getResultGrade(1050) + "\n";
        alertStr3 += "1100ms 이상 1150ms 미만 : " + getResultGrade(1100) + "\n";
        alertStr3 += "1150ms 이상 1200ms 미만 : " + getResultGrade(1150) + "\n";
        alertStr3 += "1200ms 이상 : " + getResultGrade(1200) + "\n";

        alert(alertStr1);
        alert(alertStr2);
        alert(alertStr3);
    });

    // Return to Title Screen
    $backBtn.on("click", function() {
        exitGame();
    })

    // Start Game!
    $startBtn.on("click", function() {
        $dummyInput.trigger("click");
        $infoBtn.addClass("gone");
        $appTitleDiv.addClass("hidden");
        $creatorDiv.addClass("hidden");
        $commentDiv.addClass("hidden");
        $startBtn.addClass("gone");
        $bestScoreDiv.text("신기록 : 평균 " + bestRecord + "ms");
        currentTry = 1;
        resultSum = 0;
        resultAverage = 0.0;
        isPlayingGame = true;
        startGame();
    });
});

function startGame() {
    $tryCountDiv.text("시도 : " + currentTry + "/" + REPEAT_COUNT);

    timers[0] = setTimeout(function() {
        var time = Math.floor((Math.random() * MAX_SECONDS) * 1000);
        var record, date1, date2;
        var inputVal;
        $card.removeClass("gone");

        timers[1] = setTimeout(function() {
            var number = Math.floor(Math.random() * CARD_COUNT) + 1;
            var numberChar = number + "";
            if (numberChar == 1) numberChar = "A";

            $card.addClass("heart" + numberChar);
            $card.removeClass("backside");
            $dummyInput.val("");
            date1 = new Date();

            $dummyInput.on("keyup", function(e) {
                date2 = new Date();
                inputVal = $dummyInput.val();
                $dummyInput.val("");
                $dummyInput.off("keyup");

                if (parseInt(inputVal) === number) {
                    record = date2.getTime() - date1.getTime();
                    records[currentTry - 1] = record;
                    resultSum += record;
                    $answerPopupDiv.html("정답!<br>(" + record + "ms)");
                    $answerPopupDiv.removeClass("hidden");

                    timers[2] = setTimeout(function() {
                        $answerPopupDiv.addClass("hidden");
                        $answerPopupDiv.html("");
                        $card.addClass("backside");
                        $card.removeClass("heart" + numberChar);

                        if (currentTry++ < REPEAT_COUNT) startGame();
                        else {
                            resultAverage = Math.floor((resultSum / REPEAT_COUNT) * 100) / 100;
                            if (bestRecord == 0 || resultAverage < bestRecord) {
                                bestRecord = resultAverage;
                                if (isStorageAvailable) localStorage.setItem(LS_BEST_RECORD, bestRecord);
                                alert("최고 기록 경신!");
                            }
                            var grade = getResultGrade(resultAverage);

                            var alertStr = "[최종 결과]\n";
                            alertStr += "시도 : " + REPEAT_COUNT + "회, 합계 : " + resultSum + "ms, 평균 : " + resultAverage + "ms";
                            alertStr += "\n";
                            for (var i = 0; i < records.length; i++) alertStr += (i+1) + "차 : " + records[i] + "ms\n";
                            alertStr += "\n";
                            alertStr += "등급 : " + grade;
                            
                            alert(alertStr);

                            $card.addClass("gone");
                            $dummyInput.addClass("gone");
                            $dummyInput.removeClass("gone");

                            timers[3] = setTimeout(function() { exitGame(); }, END_DELAY_IN_SEC * 1000);
                        }
                    }, ANSWER_POPUP_DURATION_IN_SEC * 1000);
                }
                else {
                    alert("틀렸습니다! 다시 시도해주세요 T.T (숫자 : " + number + ", 입력 값 : " + inputVal + ")");
                    exitGame();
                    return;
                }
            });
        }, time);
    }, BEGIN_DELAY_IN_SEC * 1000);
}

function getResultGrade(resultAverage) {
    return resultAverage < 300 ? "Master" :
           resultAverage < 350 ? "SSS" :
           resultAverage < 400 ? "SS" :
           resultAverage < 450 ? "S" :
           resultAverage < 500 ? "A+" :
           resultAverage < 550 ? "A" :
           resultAverage < 600 ? "A-" :
           resultAverage < 650 ? "B+" :
           resultAverage < 700 ? "B" :
           resultAverage < 750 ? "B-" :
           resultAverage < 800 ? "C+" :
           resultAverage < 850 ? "C" :
           resultAverage < 900 ? "C-" :
           resultAverage < 950 ? "D+" :
           resultAverage < 1000 ? "D" :
           resultAverage < 1050 ? "D-" :
           resultAverage < 1100 ? "E+" :
           resultAverage < 1150 ? "E" :
           resultAverage < 1200 ? "E-" : "F";
}

function exitGame() {
    // Init Timers
    for (var i = 0; i < timers.length; i++) {
        if (timers[i] !== null) {
            clearTimeout(timers[i]);
            timers[i] = null;
        }
    }
    
    // Init Records
    for (var i = 0; i < records.length; i++) records[i] = null;

    // Init Card
    $card.removeClass("gone");
    $card.addClass("gone");
    $card.removeClass("backside");
    $card.addClass("backside");
    $card.removeClass("heartA");
    for (var i = 2; i <= 9; i++) $card.removeClass("heart" + i);
    
    // Init Elements
    $infoBtn.removeClass("gone");
    $tryCountDiv.text("");
    $bestScoreDiv.text("");
    $appTitleDiv.removeClass("hidden");
    $creatorDiv.removeClass("hidden");
    $commentDiv.removeClass("hidden");
    $startBtn.removeClass("gone");
    $answerPopupDiv.removeClass("hidden");
    $answerPopupDiv.addClass("hidden");
    $answerPopupDiv.html("");

    // Init Events
    $dummyInput.off("keyup");

    // Init Variables
    isPlayingGame = false;
}