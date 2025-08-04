@echo off
:: AutoSortMedia.bat — Sorts photos and videos

set "srcFolder=%~1"
if "%srcFolder%"=="" (
    echo Drag a folder onto this file to sort media inside it.
    pause
    exit /b
)

set "videosFolder=%srcFolder%\VideosToCompress"
set "photosFolder=%srcFolder%\PhotosToCompress"

mkdir "%videosFolder%" >nul 2>&1
mkdir "%photosFolder%" >nul 2>&1

echo Sorting files in: %srcFolder%
echo.

:: Supported extensions
setlocal EnableDelayedExpansion
for %%F in ("%srcFolder%\*") do (
    set "ext=%%~xF"
    set "ext=!ext:~1!"
    set "ext=!ext:.=!"
    set "ext=!ext:~0,4!"

    if /I "!ext!"=="mp4"  move "%%F" "%videosFolder%" >nul
    if /I "!ext!"=="mov"  move "%%F" "%videosFolder%" >nul
    if /I "!ext!"=="avi"  move "%%F" "%videosFolder%" >nul
    if /I "!ext!"=="mkv"  move "%%F" "%videosFolder%" >nul

    if /I "!ext!"=="jpg"  move "%%F" "%photosFolder%" >nul
    if /I "!ext!"=="jpeg" move "%%F" "%photosFolder%" >nul
    if /I "!ext!"=="png"  move "%%F" "%photosFolder%" >nul
    if /I "!ext!"=="webp" move "%%F" "%photosFolder%" >nul
)

echo ✅ Sorting complete!
pause
