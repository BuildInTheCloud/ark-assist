


# config.xml
reference: http://cordova.apache.org/docs/en/latest/config_ref/index.html

# windows 10
reference:

https://github.com/Microsoft/ionic2-typescript-sidemenu

https://github.com/Microsoft/azure-mobile-apps-with-ionic

<platform name="windows">
<preference name="windows-target-version" value="10.0"/>    
<preference name="windows-phone-target-version" value="10.0" />       
<preference name="Windows.Universal-MinVersion" value="10.0.10069.0" />    
<preference name="Windows.Universal-MaxVersionTested" value="10.0.10166.0" /> 
</platform>

# android release
1. ionic build android --release
2. androind-key-gen.bat (ONLY RUN ONCE)
3. androind-apk-sign.bat
4. androind-apk-zipalign.bat
5. login to https://play.google.com/apps
6. upload platforms\android\build\outputs\apk\android-release-signed.apk

# Donate
All apps take time to create. If you find this app useful, please donate so I can add more features.

https://PayPal.Me/buildinthecloud/

