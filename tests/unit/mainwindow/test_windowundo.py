# SPDX-FileCopyrightText: Florian Bruhin (The Compiler) <mail@qutebrowser.org>
#
# SPDX-License-Identifier: GPL-3.0-or-later

"""Tests for restoring closed windows."""

import unittest.mock

from qutebrowser.mainwindow import windowundo


def test_undo_last_window_close_activates_window(mocker):
    geometry = unittest.mock.sentinel.geometry
    tab_stack = unittest.mock.sentinel.tab_stack
    manager = unittest.mock.Mock()
    manager._undos = [
        windowundo._WindowUndoEntry(geometry=geometry, tab_stack=tab_stack)
    ]

    window = mocker.patch.object(
        windowundo.mainwindow, 'MainWindow').return_value
    raise_window = mocker.patch.object(windowundo.mainwindow, 'raise_window')

    windowundo.WindowUndoManager.undo_last_window_close(manager)

    windowundo.mainwindow.MainWindow.assert_called_once_with(
        private=False, geometry=geometry)
    assert window.tabbed_browser.undo_stack is tab_stack
    window.tabbed_browser.undo.assert_called_once_with()
    window.show.assert_called_once_with()
    raise_window.assert_called_once_with(window, alert=False)
