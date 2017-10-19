var home;
(function (home) {
    setInterval(function () {
        var now = new Date();
        var decimalNow = toDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
        var decimalString = decimalNow.toString();
        decimalString = decimalString.slice(0, 1) + ':' + decimalString.slice(2, 4) + ':' + decimalString.slice(4, 6) + '.' + decimalString.slice(7, decimalString.length);
        var el = document.getElementById("decimalNow");
        el.innerText = decimalString;
    }, 1000);
    function toDecimalTime(hours, minutes, seconds) {
        var dhours = hours * 5 / 12;
        var dminutes = minutes * 1000 / 144 / 1000;
        var dsecond = seconds * 1000 / 864 / 100000;
        return dhours + dminutes + dsecond;
    }
})(home || (home = {}));
