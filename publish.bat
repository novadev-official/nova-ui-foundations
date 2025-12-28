@echo off
echo Starting deployment to Surge.sh...
echo.
echo If this is your first time, you will be asked to create an account (enter email and password).
echo.
call npx surge ./
pause
