<?php

return [
    // Global settings
    '*' => [
        // If `devMode` is on, use webpack-dev-server to all for HMR (hot module reloading)
        'useDevServer' => true,
        // Enforce Absolute URLs on includes
        'useAbsoluteUrl' => true,
        // The JavaScript entry from the manifest.json to inject on Twig error pages
        // This can be a string or an array of strings
        'errorEntry' => '',
        // String to be appended to the cache key
        'cacheKeySuffix' => '',
       // Manifest file names
        'manifest' => [
            'legacy' => 'mix-manifest.json',
            'modern' => 'mix-manifest.json',
        ],
        // Public server config
        'server' => [
            'manifestPath' => '@webroot/assets/dist/',
            'publicPath' => '/assets/dist/',
        ],
        // webpack-dev-server config
        'devServer' => [
            'manifestPath' => 'http://127.0.0.1:8081/',
            'publicPath' => 'http://mannik-smith-2.test:8081/',
        ],
        // Bundle to use with the webpack-dev-server
        'devServerBuildType' => 'modern',
        // Whether to include a Content Security Policy "nonce" for inline
        // CSS or JavaScript. Valid values are 'header' or 'tag' for how the CSP
        // should be included. c.f.:
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#Unsafe_inline_script
        'cspNonce' => '',
        // Local files config
        // Local files config
        'localFiles' => [
            'basePath' => '@webroot/',
            'criticalPrefix' => 'dist/criticalcss/',
            'criticalSuffix' => '_critical.min.css',
        ],
    ],
    // Live (production) environment
    'live' => [
    ],
    // Staging (pre-production) environment
    'staging' => [
    ],
    // Development environment
    'dev' => [
        // If `devMode` is on, use webpack-dev-server to all for HMR (hot module reloading)
        'useDevServer' => true,
    ],
];
