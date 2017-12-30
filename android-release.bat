@echo off
@echo -- bundling --
call ionic cordova build android --release
IF %ERRORLEVEL% == 0 (
    @echo -- signing --
    call "%JAVA_HOME%\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk alias_name
)
IF %ERRORLEVEL% == 0 (
    @echo -- zipalign --
    call del platforms\android\app\build\outputs\apk\release\app-release-signed.apk
    call "%ANDROID_HOME%\build-tools\27.0.1\zipalign.exe" -v 4 platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk platforms\android\app\build\outputs\apk\release\app-release-signed.apk
)
