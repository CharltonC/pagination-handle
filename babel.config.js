module.exports = {
    plugins: [
        /**
         * For ES6 Class property defined on top of `constructor`
         */
        ['@babel/plugin-proposal-class-properties', { 'loose': true }]
    ],
    presets: [
        '@babel/preset-env',
        '@babel/preset-typescript'
    ]
};