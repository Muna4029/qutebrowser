/* eslint-disable strict */
/* (this file gets used as a snippet) */

/*
SPDX-FileCopyrightText: Florian Bruhin (The Compiler) <mail@qutebrowser.org>
SPDX-License-Identifier: GPL-3.0-or-later
*/

(function() {
    // Chromium 119 / QtWebEngine 6.8
    // https://caniuse.com/mdn-javascript_builtins_promise_withresolvers
    if (typeof Promise.withResolvers === "undefined") {
        Promise.withResolvers = function() {
            let resolve, reject
            const promise = new Promise((res, rej) => {
                resolve = res
                reject = rej
            })
            return { promise, resolve, reject }
        }
    }

    // Chromium 126 / QtWebEngine 6.9
    // https://caniuse.com/mdn-api_url_parse_static
    if (typeof URL.parse === "undefined") {
        URL.parse = function(url, base) {
            try { 
                return new URL(url, base);
            } catch (ex) {
                return null;
            }
        }
    }

    // Chromium 133 / QtWebEngine 6.10
    // https://caniuse.com/mdn-javascript_builtins_uint8array_tohex
    if (typeof Uint8Array.prototype.toHex === "undefined") {
        Uint8Array.prototype.toHex = function() {
            let result = "";
            for (let i = 0; i < this.length; i++) {
                result += this[i].toString(16).padStart(2, "0");
            }
            return result;
        };
    }

    // Chromium 133 / QtWebEngine 6.10
    // https://caniuse.com/mdn-javascript_builtins_map_getorinsert
    if (typeof Map.prototype.getOrInsert === "undefined") {
        Map.prototype.getOrInsert = function(key, defaultValue) {
            if (this.has(key)) {
                return this.get(key);
            }
            this.set(key, defaultValue);
            return defaultValue;
        };
    }

    // Chromium 133 / QtWebEngine 6.10
    // https://caniuse.com/mdn-javascript_builtins_map_getorinsertcomputed
    if (typeof Map.prototype.getOrInsertComputed === "undefined") {
        Map.prototype.getOrInsertComputed = function(key, callback) {
            if (this.has(key)) {
                return this.get(key);
            }
            const value = callback(key);
            this.set(key, value);
            return value;
        };
    }
})();
