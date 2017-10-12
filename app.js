/*
Copyright (C) 2016 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information
 
Abstract:
Sets up a simple Express HTTP server to host the example page, and handles requesting 
the Apple Pay merchant session from Apple's servers.
*/

import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import https from 'https';
import request from 'request';

/**
 * IMPORTANT
 * Change these paths to your own SSL and Apple Pay certificates,
 * with the appropriate merchant identifier and domain
 * See the README for more information.
 */
const APPLE_PAY_CERTIFICATE_PATH = "./certificates/applePayCert.pem";
const SSL_CERTIFICATE_PATH = "./certificates/cert.pem";
const SSL_KEY_PATH = "./certificates/key.pem";
const MERCHANT_IDENTIFIER = "52C1BF7C450F270F8A14E411533D6A9BEDDA6EF95539F563D3681C84907BF2D8";
const MERCHANT_DOMAIN = "wemall.xiaojingxiuxiu.com";

try {
    fs.accessSync(APPLE_PAY_CERTIFICATE_PATH);
    fs.accessSync(SSL_CERTIFICATE_PATH);
    fs.accessSync(SSL_KEY_PATH);
} catch (e) {
    throw new Error('You must generate your SSL and Apple Pay certificates before running this example.');
}

const sslKey = fs.readFileSync(SSL_KEY_PATH);
const sslCert = fs.readFileSync(SSL_CERTIFICATE_PATH);
const applePayCert = fs.readFileSync(APPLE_PAY_CERTIFICATE_PATH);

/**
 * Set up our server and static page hosting
 */
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());


/**
 * A POST endpoint to obtain a merchant session for Apple Pay.
 * The client provides the URL to call in its body.
 * Merchant validation is always carried out server side rather than on
 * the client for security reasons.
 */
app.post('/getApplePaySession', function(req, res) {

    // We need a URL from the client to call
    if (!req.body.url) return res.sendStatus(400);

    // We must provide our Apple Pay certificate, merchant ID, domain name, and display name
    const options = {
        url: req.body.url,
        cert: applePayCert,
        key: applePayCert,
        method: 'post',
        body: {
            merchantIdentifier: MERCHANT_IDENTIFIER,
            domainName: MERCHANT_DOMAIN,
            displayName: 'My Store',
        },
        json: true,
    }

    // Send the request to the Apple Pay server and return the response to the client
    request(options, function(err, response, body) {
        if (err) {
            console.log('Error generating Apple Pay session!');
            console.log(err, response, body);
            res.status(500).send(body);
        }
        // 如果支付失败，看下 apple 返回信息
        // console.log(body);
        res.send(body);
    });
});

/**
 * Start serving the app.
 */
https.createServer({
    key: sslKey,
    cert: sslCert,
}, app).listen(443);