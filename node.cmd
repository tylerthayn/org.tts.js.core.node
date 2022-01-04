@ECHO OFF

SETLOCAL

SET "NODE_EXE=%~dp0\node.exe"

"%NODE_EXE%" -r @js/node.core %*
