@echo off
REM Script de vérification des dépendances LaTeX pour Windows
REM Utilisation: check-latex.bat

echo ================================
echo Verification des dependances LaTeX
echo ================================
echo.

REM Variables de suivi
set MISSING_PDFLATEX=0
set MISSING_XELATEX=0

REM Verification de pdflatex
where pdflatex >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] pdflatex trouve
    pdflatex --version | find /V "MiKTeX" | find /V "TeX Live" > nul
    if %ERRORLEVEL% EQU 0 (
        pdflatex --version | for /f "tokens=1-3" %%A in ('findstr /R "."') do echo %%A %%B %%C
    ) else (
        pdflatex --version | findstr "MiKTeX TeX Live" | for /f "tokens=*" %%A in ('more') do echo %%A
    )
) else (
    echo [ERREUR] pdflatex NOT FOUND
    set MISSING_PDFLATEX=1
)

echo.

REM Verification de xelatex
where xelatex >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo [OK] xelatex trouve
    xelatex --version | for /f "tokens=1-3" %%A in ('findstr /R "."') do echo %%A %%B %%C
) else (
    echo [AVERTISSEMENT] xelatex NOT FOUND (optionnel)
    set MISSING_XELATEX=1
)

echo.
echo ================================

if %MISSING_PDFLATEX% EQU 0 (
    echo [SUCCESS] Toutes les dependances LaTeX requises sont installees!
    echo Vous pouvez maintenant utiliser la generation de rapports PDF.
    exit /b 0
) else (
    echo [ERREUR] Dependances manquantes detectees!
    echo.
    echo Pour installer les dependances LaTeX:
    echo.
    echo Telechargez et installez:
    echo   1. MiKTeX: https://miktex.org/download
    echo   2. OU TeX Live: https://www.tug.org/texlive/
    echo.
    echo Apres installation, assurez-vous que pdflatex est dans le PATH:
    echo   Redemarrez votre terminal ou ajoutez le chemin a PATH manuellement
    echo.
    exit /b 1
)
