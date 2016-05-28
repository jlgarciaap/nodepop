"use strict";

/**
 *
 * @package     useragent-lite
 * @version     0.0.2
 * @copyright   Copyright (c) 2014 - All rights reserved.
 * @license     MIT License
 * @author      Mark Florence <mflo999@gmail.com>
 * @link        http://mflo.info
 *
 */

// browser patterns

var browsers = [
  { name: "Chrome", flags: ["isChrome"], regex: /(?:Chrome|CriOS)\/([0-9]+)\./i },
  { name: "Firefox", flags: ["isFirefox"], regex: /Firefox\/([0-9]+)\./i },
  { name: "IE", flags: ["isIE"], regex: /(?:MSIE|Trident.*rv)[: ]([0-9]+)\./i },
  { name: "Opera", flags: ["isOpera"], regex: /Opera\/.*Version\/([0-9]+)/i },
  { name: "Safari", flags: ["isSafari"], regex: /AppleWebKit\/.*Version\/([0-9]+)/i },
  // must be last, of course!
  { name: "Unknown", flags: ["isUnknown"], regex: null }
];

// device patterns

var devices = [
  // look at these first as these appear to be exceptios to the generic Android
  // tests below -- these devices are tablets, but the DO put Mobile in the ua string
  // generic Android tests, straight from Google
  { name: "Android", flags:["isPhone"], platform: "Phone", regex: / Android .*? (Chrome|Version)\/[.0-9]* Mobile/i },
  { name: "Android", flags:["isTablet"], platform: "Tablet", regex: / Android .*? (Chrome|Version)\/[.0-9]* (?!Mobile)/i },
  { name: "Android", flags:["isTablet"], platform: "Tablet", regex: / Android .*? /i },
  { name: "Firefox OS", flags:["isPhone"], platform: "Phone", regex: /Mozilla.*?Mobile.*?Gecko.*?Firefox/i },
  { name: "iPad", flags:["isTablet"], platform: "Tablet", regex: /iPad/i },
  { name: "iPhone", flags:["isPhone"], platform: "Phone", regex: /iPhone|iPod/i },
  // more detailed devices from Chrome's emulator
  { name: "BlackBerry Phone", flags:["isPhone"], platform: "Phone", regex: /BlackBerry|BB10/i },
  { name: "BlackBerry Playbook", flags:["isTablet"], platform: "Tablet", regex: /Playbook/i },
  { name: "Motorola Droid", flags:["isPhone"], platform: "Phone", regex: /(Droid|SHOLS_U2|XT[0-9]{4})/i },
  { name: "HTC", flags:["isPhone"], platform: "Phone", regex: /HTC One|HTC Sensation|Sprint APA9292KT/i },
  { name: "Kindle", flags:["isTablet"], platform: "Tablet", regex: /Silk|Kindle/i },
  { name: "LG", flags:["isPhone"], platform: "Phone", regex: /LG-M|LG-E|LG-P/i },
  { name: "Nexus Phone", flags:["isPhone"], platform: "Phone", regex: /Nexus 4|Nexus 5|Nexus S/i },
  { name: "Nexus Tablet", flags:["isTablet"], platform: "Tablet", regex: /Nexus 7|Nexus 10/i },
  { name: "Nokia", flags:["isPhone"], platform: "Phone", regex: /Nokia|Windows Phone/i },
  { name: "Samsung Phone", flags:["isPhone"], platform: "Phone", regex: /SM-N900|GT-I|GT-N|SAMSUNG-SGH|SAMSUNG SCH/i },
  { name: "Sony", flags:["isPhone"], platform: "Phone", regex: /LT28|SonyEricsson|Sony/i },
  // must be last, of course!
  { name: "PC", flags:["isDesktop"], platform: "Desktop", regex: null }
];

// private methods

function matchBrowser(ua, s) {
  browsers.some(function(browser) {
    var result = null;
    if (!browser.regex || (result = browser.regex.exec(s))) {
      ua.browser = browser.name;
      browser.flags.forEach(function(flag) {
        ua[flag] = true;
      });
      ua.version = (result && (result.length > 0))? Number(result[1]) : 0;
      // HACK!! for IE being stupid
      if ((s.indexOf("Trident/4") !== -1) && (ua.version < 8))
        ua.version = 8;
      if ((s.indexOf("Trident/5") !== -1) && (ua.version < 9))
        ua.version = 9;
      if ((s.indexOf("Trident/6") !== -1) && (ua.version < 10))
        ua.version = 10;
      if ((s.indexOf("Trident/7") !== -1) && (ua.version < 11))
        ua.version = 11;
      return true;
    }
  });
}

function matchDevice(ua, s) {
  devices.some(function(device) {
    if (!device.regex || device.regex.test(s)) {
      ua.device = device.name;
      device.flags.forEach(function(flag) {
        ua[flag] = true;
      });
      ua.platform = device.platform;
      return true;
    }
  });

}

// the one-and-only public function

module.exports = function(s) {
  // the canonical parsed user-agent
  var ua = {
    browser: "IE",
    device: "PC",
    isChrome: false,
    isDesktop: false,
    isFirefox: false,
    isIE: false,
    isOpera: false,
    isPhone: false,
    isSafari: false,
    isTablet: false,
    isUnknown: false,
    platform: "Desktop",
    version: 0
  };
  // extract browser+version+device
  matchBrowser(ua, s);
  matchDevice(ua, s);
  // we're done!
  return ua;
};
