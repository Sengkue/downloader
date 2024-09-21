@echo off
:start
set CURRENT_TIME=%DATE% %TIME%
git add .
git commit -m "commit %CURRENT_TIME%"
git push
timeout /t 5
goto start