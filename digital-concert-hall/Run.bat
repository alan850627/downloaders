@echo off

echo.
echo Digital Concert Hall Downloader
echo by Alan Chen

if [%1]==[] (echo. & set /p link=Full Link, including ".mp4". Do not include "https://": ) else (set link=%1)

if [%2]==[] (echo. & set /p d=Piece Name: ) else (set d=%2)

if [%3]==[] (set dest=%d%) else (set dest=\%~3)

wget -nv -q -P ".\downloads\%dest%" %link%.m3u8

if [%4]==[] (echo. & set /p fragments=Number of fragments: ) else (set fragments=%4)

start ff-prompt.bat

set /a n=1

echo.
echo Downloading! Please wait...

:loop

set /a n1=%n%-1

wget -nv -q -P ".\downloads\%dest%" %link%Frag%n%Num%n1%.ts

echo %link%Frag%n%Num%n1%.ts

set /a n=%n%+1

if %n% leq %fragments% goto loop

echo.
echo Done!

echo.
echo Press any key to exit...
pause >nul

exit