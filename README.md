# Ark Assist
Ark Assist is a ARK: Survival Evolved app for copying admin/cheat commands to your xbox one console.

#App Links
1. Android: https://play.google.com/store/apps/details?id=com.buildinthecloud.arkassist
2. Windows/XBOX: https://www.microsoft.com/en-us/store/p/ascendant-ark-assist/9ndkxd5r1m70

# Suggestions
1. provide a pull request if you have improvements
2. post a suggestion https://github.com/BuildInTheCloud/ark-assist/issues

# Donate
All apps take time to create. If you find this app useful, please donate so I can add more features.

https://PayPal.Me/buildinthecloud/

#reference
1. http://ark.gamepedia.com/Engrams_(Primitive%2B)
2. http://ark.gamepedia.com/Item_IDs

#Android
1. Enabling USB connected device
    1. https://developer.android.com/studio/run/device.html#rsa

#Windows
1. npm install --global --production windows-build-tools
2. (optional) Install Python https://www.python.org/downloads/release/python-2713/
3. User Variables
    1. _JAVA_OPTIONS `-Xmx512M`
    2. ANDROID_HOME `C:\Program Files (x86)\Android\android-sdk`
    3. GYP_MSVS_VERSION `2015`
    4. JAVA_HOME `C:\Program Files (x86)\Java\jdk1.8.0_92`
    5. GRADLE_HOME `C:\gradle\gradle-3.5`
4. System Variables
    1. ANDROID_HOME `C:\Program Files (x86)\Android\android-sdk`
5. Path
    1. %ANDROID_HOME%\tools;
    2. %ANDROID_HOME%\build-tools;
    3. %ANDROID_HOME%\platform-tools;
    4. %GRADLE_HOME%\bin;

#npm
1. npm list -g --depth=0

#using latest ionic
1. existing project
    1. npm install -g ionic
    2. npm install --save-dev @ionic/cli-plugin-ionic-angular @ionic/cli-plugin-cordova
    4. ionic info
2. edge
    1. npm install --typecheck
    2. npm install --save ionic-angular@nightly
3. ionic plugin add cordova-plugin-admobpro@2.28.4


