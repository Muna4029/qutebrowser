/* eslint-disable strict, no-extend-native */
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
            try{
                return new URL(url, base);
            } catch (ex) {
                return null;
            }
        }
    }

    // PDF.js polyfill: Uint8Array.prototype.toHex
    if (typeof Uint8Array.prototype.toHex === "undefined") {
        Uint8Array.prototype.toHex = function() {
            return Array.from(this).map(b => b.toString(16).padStart(2, '0')).join('');
        }
    }

    // PDF.js polyfill: Map.prototype.getOrInsert
    if (typeof Map.prototype.getOrInsert === "undefined") {
        Map.prototype.getOrInsert = function(key, value) {
            if (this.has(key)) {
                return this.get(key);
            }
            this.set(key, value);
            return value;
        }
    }

    // PDF.js polyfill: Map.prototype.getOrInsertComputed
    if (typeof Map.prototype.getOrInsertComputed === "undefined") {
        Map.prototype.getOrInsertComputed = function(key, computeFn) {
            if (this.has(key)) {
                return this.get(key);
            }
            const value = computeFn();
            this.set(key, value);
            return value;
        }
    }
})();
