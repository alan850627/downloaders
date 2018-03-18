@echo off

echo.
echo Henle Preview Downloader v1.0
echo by Alan

if [%1]==[] (echo. & set /p id=Henle Document ID: ) else (set id=%1)

if [%2]==[] (echo. & set /p partn=Part Number, enter 0 for main: ) else (set partn=%2)

if [%3]==[] (echo. & set /p pages=Max Pages: ) else (set pages=%3)

if [%4]==[] (set dest=\%id%) else (set dest=\%~4)

set /a page=1

echo.
echo Downloading! Please wait...

:loopout

if %partn% equ 0 goto main

wget -nv -q -P ".\downloads%dest%" http://www.henleusa.com/pageflip/%id%/%id%_%partn%.%page%.swf
echo %page%

goto next 

:main

wget -nv -q -P ".\downloads%dest%" http://www.henleusa.com/pageflip/%id%/%id%.%page%.swf
echo %page%

:next

set /a page=%page%+1

if %page% leq %pages% goto loopout

echo.
echo Done!

echo.
echo Press any key to exit...
pause >nul

exit