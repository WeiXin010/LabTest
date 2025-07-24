import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';
import os from 'os';
import path from 'path';
import assert from 'assert';

async function testHomePage() {
    const options = new chrome.Options().addArguments('--ignore-certificate-errors');

    const remoteUrl = process.env.SELENIUM_HOST || 'http://localhost:4444/wd/hub';
    const appUrl = process.env.APP_URL || 'http://localhost:5555';

    console.log(remoteUrl);
    console.log(appUrl);

    let driver = await new Builder().forBrowser('chrome').usingServer(remoteUrl).setChromeOptions(options).build();
    try {
        // Navigate to your React app URL
        await driver.get(appUrl);

        let loginButton = await driver.wait(until.elementLocated(By.xpath('//button[text()="Login"]')), 5000);
        const loginVisible = await loginButton.isDisplayed();
        const loginEnabled = await loginButton.isEnabled();

        let userField = await driver.findElement(By.name('username'), 5000);
        const userVisible = await userField.isDisplayed();

        let passwordField = await driver.findElement(By.name('password'), 5000);
        const passwordVisible = await passwordField.isDisplayed();

        if (!userVisible || !passwordVisible) {
            throw new Error('Username or Password input not visible');
        }
        if (!loginVisible) {
            throw new Error('Login button not visible');
        }
        if (!loginEnabled) {
            throw new Error('Login button is disabled');
        }

        console.log('✅ Login Page is ready');

        // --- Test 1: Invalid Login --- //
        // Clear and enter test data
        await userField.clear();
        await userField.sendKeys('marty');

        await passwordField.clear();
        await passwordField.sendKeys('asdasd');
        await loginButton.click();

        let currentUrl = await driver.getCurrentUrl();
        console.log('Current URL after login:', currentUrl);
        await driver.wait(until.urlContains('/login'), 10000);

        // Wait for error message to appear
        let errorMsg = await driver.wait(until.elementLocated(By.linkText("Try again")), 5000);
        await driver.wait(
            until.elementIsVisible(errorMsg),
            5000
        );
        await errorMsg.click();

        // Return to Login Page
        // Wait until URL goes back to login page (e.g., ends with '/')
        await driver.wait(until.urlIs(appUrl), 5000);
        currentUrl = await driver.getCurrentUrl();
        console.log('Current URL clicking Try again:', currentUrl);

        console.log('✅ Login behavior test passed for invalid credentials');


        // --- Test 2: Valid Login --- //
        // Refresh page before testing
        await driver.navigate().refresh();

        await driver.wait(until.elementLocated(By.xpath('//button[text()="Login"]')), 10000);

        userField = await driver.findElement(By.name('username'), 10000);
        passwordField = await driver.findElement(By.name('password'), 10000);
        loginButton = await driver.findElement(By.xpath('//button[text()="Login"]'), 10000);

        // Clear and enter test data
        await userField.clear();
        await userField.sendKeys('admin');

        await passwordField.clear();
        await passwordField.sendKeys('password123');
        await loginButton.click();

        currentUrl = await driver.getCurrentUrl();
        console.log('Current URL after login:', currentUrl);

        // Wait for URL to change to /login
        await driver.wait(until.urlContains('/welcome'), 10000);

        console.log('✅ Login successful');


    } catch (err) {
        console.log('Test failed: ', err);
    } finally {
        await driver.quit();
    }
}

testHomePage();