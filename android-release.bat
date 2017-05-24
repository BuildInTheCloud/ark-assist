@echo off
@echo -- bundling --
call ionic cordova build android --release
IF %ERRORLEVEL% == 0 (
    @echo -- signing --
    call "%JAVA_HOME%\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms\android\build\outputs\apk\android-armv7-release-unsigned.apk alias_name
    call "%JAVA_HOME%\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms\android\build\outputs\apk\android-x86-release-unsigned.apk alias_name
)
IF %ERRORLEVEL% == 0 (
    @echo -- zipalign --
    call del platforms\android\build\outputs\apk\android-armv7-release-signed.apk
    call del platforms\android\build\outputs\apk\android-x86-release-signed.apk
    call "%ANDROID_HOME%\build-tools\26.0.0-preview\zipalign.exe" -v 4 platforms\android\build\outputs\apk\android-armv7-release-unsigned.apk platforms\android\build\outputs\apk\android-armv7-release-signed.apk
    call "%ANDROID_HOME%\build-tools\26.0.0-preview\zipalign.exe" -v 4 platforms\android\build\outputs\apk\android-x86-release-unsigned.apk platforms\android\build\outputs\apk\android-x86-release-signed.apk
)
