/* eslint-disable strict */
/* (this file gets used as a snippet) */

/*
SPDX-FileCopyrightText: Florian Bruhin (The Compiler) <mail@qutebrowser.org>
SPDX-License-Identifier: GPL-3.0-or-later
*/

(function() {
    "use strict";

    let openingGuard = false;

    async function openPdf() {
        if (openingGuard) {
            return;
        }
        openingGuard = true;

        if (window.PDFViewerApplication && window.PDFViewerApplication.open) {
            await doOpen();
        }
    }

    async function doOpen() {
        const app = window.PDFViewerApplication;
        if (!app || !app.open) {
            return;
        }

        // Get the filename from the script tag's src attribute
        let filename = "";
        const scripts = document.getElementsByTagName("script");
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute("src");
            if (src && src.indexOf("qute://pdfjs/qute.js") !== -1) {
                const url = new URL(src);
                filename = url.searchParams.get("filename");
                break;
            }
        }

        if (!filename) {
            return;
        }

        const fileUrl = "qute://pdfjs/file?filename=" + encodeURIComponent(filename);
        try {
            await app.open({
                url: fileUrl,
                originalUrl: fileUrl
            });
        } catch (e) {
            console.error("qutebrowser: Failed to open PDF:", e);
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", openPdf);
    } else {
        openPdf();
    }

    document.addEventListener("webviewerloaded", function() {
        if (!openingGuard) {
            openPdf();
        }
    });
})();
