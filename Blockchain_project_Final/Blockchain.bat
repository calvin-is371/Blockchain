@ECHO OFF

SET BROWSER=chrome.exe
SET WAIT_TIME=2
START %BROWSER% -new-tab "https://composer-playground.mybluemix.net/login"
@ping 127.0.0.1 -n %WAIT_TIME% -w 1000 > nul
START %BROWSER% -new-tab "http://IS371-hyperledger-2.cs.calvin.edu:8080/login"
START %BROWSER% -new-tab "https://github.com/calvin-is371/Blockchain"
pause