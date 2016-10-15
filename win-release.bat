@echo off
@echo -- bundling --
call ionic build windows --release
IF %ERRORLEVEL% == 0 (
 start ark-assist.sln
)
