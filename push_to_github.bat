@echo off
title Push vers GitHub - CV_0n_line_Pro
color 0b
echo ========================================================
echo   Envoi du projet vers GitHub : pieboji/CV_0n_line_Pro
echo ========================================================
echo.

set PATH=C:\Program Files\Git\cmd;C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"

echo [1/3] Verification de l'etat des fichiers...
git add .
git commit -m "feat: portfolio et CV en ligne haute-fidelite Pieboji Noubissie Wilfried (Aura Digitale)"

echo.
echo [2/3] Verification de la branche principale...
git branch -M main

echo.
echo [3/3] Envoi vers GitHub...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    color 0a
    echo ========================================================
    echo   SUCCES : Votre code est en ligne sur GitHub !
    echo   https://github.com/pieboji/CV_0n_line_Pro
    echo ========================================================
) else (
    color 0c
    echo ========================================================
    echo   Une erreur est survenue lors du push.
    echo ========================================================
)

echo.
pause
