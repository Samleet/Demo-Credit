/**
 * This file defines all generic event "status"
 *
 */
var status;
(function (status) {
    status["PENDING"] = "PENDING";
    status["COMPLETED"] = "COMPLETED";
    status["DENIED"] = "DENIED";
})(status || (status = {}));
export default status;
