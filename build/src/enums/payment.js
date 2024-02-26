/**
 * This file defines all allowed "payments" types
 *
 */
var payment;
(function (payment) {
    payment["DEBIT"] = "DEBIT";
    payment["CREDIT"] = "CREDIT";
})(payment || (payment = {}));
export default payment;
