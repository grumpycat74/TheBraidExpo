// TEMPORARY diagnostic for the input-freeze bug. Remove when fixed.
// Wraps input-event listeners so the last listener entered before a hang
// is preserved in localStorage["tbe-dbg"].
(function () {
  var seq = [];
  var moveInfo = "";
  var moveCount = 0;
  function flush() {
    try { localStorage.setItem("tbe-dbg", seq.join("\n")); } catch (e) {}
  }
  function ap(s) {
    seq.push((Date.now() % 1000000) + " " + s);
    if (seq.length > 60) seq.shift();
    flush();
  }
  var HOT = { pointermove: 1, mousemove: 1, pointerover: 1, mouseover: 1, pointerout: 1, mouseout: 1, pointerenter: 1, mouseenter: 1, scroll: 1 };
  var WRAP = {
    pointerdown: 1, mousedown: 1, pointerup: 1, mouseup: 1, click: 1, dblclick: 1,
    keydown: 1, keypress: 1, keyup: 1, input: 1, beforeinput: 1,
    focusin: 1, focusout: 1, focus: 1, blur: 1, change: 1,
    pointermove: 1, mousemove: 1, pointerover: 1, mouseover: 1, pointerout: 1, mouseout: 1,
    pointerenter: 1, mouseenter: 1, scroll: 1, wheel: 1, touchstart: 1, touchend: 1,
    selectionchange: 1, visibilitychange: 1
  };
  var map = new WeakMap();
  var add0 = EventTarget.prototype.addEventListener;
  var rem0 = EventTarget.prototype.removeEventListener;
  EventTarget.prototype.addEventListener = function (type, fn, opts) {
    if (typeof fn === "function" && WRAP[type]) {
      var src = String(fn).replace(/\s+/g, " ").slice(0, 140);
      var tgt = this === window ? "window" : this === document ? "document" : (this.tagName || "obj");
      var wrapped = function () {
        if (HOT[type]) {
          moveCount++;
          moveInfo = (Date.now() % 1000000) + " IN-HOT " + type + " @" + tgt + " :: " + src;
          if (moveCount % 20 === 0) { seq.push(moveInfo + " (n" + moveCount + ")"); if (seq.length > 60) seq.shift(); flush(); }
        } else {
          if (moveInfo) { seq.push("lastHot: " + moveInfo); moveInfo = ""; if (seq.length > 60) seq.shift(); }
          ap("IN " + type + " @" + tgt + " :: " + src);
        }
        var r = fn.apply(this, arguments);
        if (!HOT[type]) ap("OUT " + type);
        return r;
      };
      var byType = map.get(fn) || {};
      byType[type] = wrapped;
      map.set(fn, byType);
      return add0.call(this, type, wrapped, opts);
    }
    return add0.call(this, type, fn, opts);
  };
  EventTarget.prototype.removeEventListener = function (type, fn, opts) {
    var byType = typeof fn === "function" ? map.get(fn) : null;
    if (byType && byType[type]) return rem0.call(this, type, byType[type], opts);
    return rem0.call(this, type, fn, opts);
  };
  window.addEventListener("error", function (e) {
    ap("PAGE-ERR " + String(e.message || "").slice(0, 150));
  }, true);
  var hb = 0;
  setInterval(function () {
    hb++;
    try { localStorage.setItem("tbe-hb", (Date.now() % 1000000) + " beat " + hb + (moveInfo ? " | " + moveInfo : "")); } catch (e) {}
  }, 250);
  try { localStorage.setItem("tbe-dbg", "debug script loaded"); } catch (e) {}
})();
