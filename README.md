# 使用说明

## 1. 生成 applePayCert.pem 流程比较麻烦

在 apple 开发者 认证支付网站地址后
生成 merchant id certificate ，先在 mac 上用钥匙串助手生成 什么 request CSR
然后下载 cer 回来，导出 xx.p12 ，再运行 
openssl pkcs12 -in xx.p12 -out applePayCert.pem -nodes -clcerts
生成 applePayCert.pem 才可以使用
 [参考文档1](https://github.com/norfolkmustard/ApplePayJS/blob/master/README.md)
 [参考文档2](https://github.com/datatrans/apple-pay-web-sample)

## 2.app.js 中的 MERCHANT_IDENTIFIER 
不是 apple 开发者网站上填写的字符串而是    52C1BF7C450F270F8A14E411533D6A9BEDDA6EF95539F563D3681C84907BF2D8
这样的东西，第一次支付失败后 log 一下 request body
    {
        "statusMessage": "Payment Services Exception merchantId=52C1BF7C450F270F8A14E411533D6A9BEDDA6EF95539F563D3681C84907BF2D8 unauthorized to service on behalf of merchantId=C0F35917C380EF195EA9913CF458FA57648E26B35CAB29CB0EE066D86E4481E8 reason=\"The latter is not registered for Apple Pay on the web\"",
        "statusCode": "417"
    }

# Emporium Web
This is a simple one page site designed to show you how to request and handle Apple Pay payments on the web. With Apple Pay you can offer customers an easy, secure, and private way to pay in Safari on both macOS and iOS.
 
Apple Pay on the web consists of both a client-side and server-side component. You request payment on the client, and validate yourself as a merchant on your web server. This node.js example shows you how to carry out both the payment request and the merchant validation.
 
## Requirements
This example is a self-contained project that uses node.js and Express to run a small web server. If you don't have Node installed you can download a pre-built installer from https://nodejs.org, or obtain it through a suitable package manager.
 
## Getting Started
 
#### Generate your Apple Pay Certificates
Apple Pay requires a merchant identifier and two certificates - a *session* certificate and a *rewrap* certificate. The merchant identifier uniquely identifies you as an Apple Pay merchant. The *rewrap* certificate is used to encrypt your Apple Pay payments, and the *session* certificate is used to authenticate your website.
 
Create your Apple Pay merchant identifier at https://developer.apple.com, and register your web domain against it. Convert your session certificate and key to `PEM` format, and place it in this example's `Emporium/certificates` directory.
 
#### Set up SSL
Apple Pay requires your site to be hosted over HTTPS. Generate your SSL certificate, and place the certificate and key in this example's `Emporium/certificates` directory.
 
#### Run the example
First, install all the required dependencies by running the following command from the `Emporium` directory:
    
    npm install
 
Then, start the example:
 
    npm start
 
## Resources
A number of resources are available to help you with Apple Pay. 
 
  * Apple Pay Developer Site - https://developer.apple.com/apple-pay/
  * Apple Pay on the web WWDC Session Video - https://developer.apple.com/videos/play/wwdc2016/703/
  * Apple Pay Domain Verification - https://developer.apple.com/support/apple-pay-domain-verification/
 
## ES6
This example is written in ES6. The server-side code is transpiled using Babel, but since the latest version of Safari supports ES6 natively the client-side code is not.
 
Copyright (C) 2016 Apple Inc. All rights reserved.