@echo off
@echo -- bundling --
call ionic cordova build android --release
IF %ERRORLEVEL% == 0 (
	@echo -- signing --
	rem -- cordova-android 7.0.0 +
	rem call "%JAVA_HOME%\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk alias_name
	rem -- cordova-android 6.4.0
	call "%JAVA_HOME%\bin\jarsigner.exe" -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms\android\build\outputs\apk\release\android-release-unsigned.apk alias_name
)
IF %ERRORLEVEL% == 0 (
	@echo -- zipalign --
	rem -- cordova-android 7.0.0 +
	rem call del platforms\android\app\build\outputs\apk\release\app-release-signed.apk
	rem call "%ANDROID_HOME%\build-tools\27.0.1\zipalign.exe" -v 4 platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk platforms\android\app\build\outputs\apk\release\app-release-signed.apk
	rem -- cordova-android 6.4.0
	call del platforms\android\build\outputs\apk\release\android-release-signed.apk
	call "%ANDROID_HOME%\build-tools\27.0.1\zipalign.exe" -v 4 platforms\android\build\outputs\apk\release\android-release-unsigned.apk platforms\android\build\outputs\apk\release\android-release-signed.apk
)
