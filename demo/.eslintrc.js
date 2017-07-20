module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "My_Lib": false,
        "THREE": false
     },
    "rules": {
        "no-extra-boolean-cast": ["off"],
        "no-console": ["off"],
        "no-mixed-spaces-and-tabs": ["off"],
        "no-extra-semi": ["off"],
        "no-unused-vars": ["off"],
        "indent": [
            "off",
            "tab"
        ],
        "linebreak-style": [
            "off",
            "windows"
        ],
        "quotes": [
            "off",
            "double"
        ],
        "semi": [
            "off",
            "always"
        ]
    }
};