/* Init Basic WebGame Storage Constants */
const SERVER = "DevCos";
const DEVELOPER = "Syusa";
const PROJECT_NAME = "ReactionTimeTest";
const SS_HEADER = SERVER + "-" + DEVELOPER + "-" + PROJECT_NAME + "-" + "Session" + "-"; // SessionStorage Header
const LS_HEADER = SERVER + "-" + DEVELOPER + "-" + PROJECT_NAME + "-" + "Local" + "-"; // LocalStorage Header

/* Storage Keys */
const LS_BEST_RECORD = LS_HEADER + "BestRecord";

/* Legacy Compatibility Code */
const PREV_PROJECT_NAME = "ReactingSpeedTest";
const PREV_LS_HEADER = SERVER + "-" + DEVELOPER + "-" + PREV_PROJECT_NAME + "-" + "Local" + "-";
const PREV_LS_BEST_RECORD = PREV_LS_HEADER + "bestRecord";

/* Check Storage Availability */
var isStorageAvailable;

if (typeof(Storage) === "undefined") {
    isStorageAvailable = false;
    alert("브라우저가 저장소 기능을 지원하지 않습니다. 점수가 저장되도록 하려면 다른 브라우저로 실행해주세요!");
}
else {
    isStorageAvailable = true;
    if (localStorage.getItem(LS_BEST_RECORD) === null) {
        if (localStorage.getItem(PREV_LS_BEST_RECORD) !== null) {
            localStorage.setItem(LS_BEST_RECORD, localStorage.getItem(PREV_LS_BEST_RECORD));
            localStorage.removeItem(PREV_LS_BEST_RECORD);
        }
        else {
            localStorage.setItem(LS_BEST_RECORD, 0.0);
        }
    }
}