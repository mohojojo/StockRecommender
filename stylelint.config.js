/* global module */

// http://stylelint.io/user-guide/rules/

module.exports = {
    "plugins": [
        "stylelint-selector-bem-pattern"
    ],
    "rules": {
        "plugin/selector-bem-pattern": {
            "componentName": "(([a-z0-9]+(?!-$)-?)+)",
            "componentSelectors": {
              "initial": "\\.{componentName}(((__|_)(([a-z0-9\\[\\]'=]+(?!-$)-?)+))+)?$"
            },
            "ignoreSelectors": [
              ".*\\.no-js.*",
              ".*\\.js-.*",
              ".*\\.lt-ie.*"
            ]
        },

        // "at-rule-blacklist": Specify a blacklist of disallowed at-rules.
        // "at-rule-empty-line-before": Require or disallow an empty line before at-rules.
        "at-rule-name-case": "lower", // Specify lowercase or uppercase for at-rules names.
        // "at-rule-name-newline-after": Require a newline after at-rule names.
        // "at-rule-name-space-after": Require a single space after at-rule names.
        //"at-rule-no-unknown": true, // Disallow unknown at-rules.
        // "at-rule-no-vendor-prefix": Disallow vendor prefixes for at-rules.
        "at-rule-semicolon-newline-after": "always", // Require a newline after the semicolon of at-rules.
        // "at-rule-whitelist": Specify a whitelist of allowed at-rules.
        // "block-closing-brace-empty-line-before": Require or disallow an empty line before the closing brace of blocks.
        // "block-closing-brace-newline-after": Require a newline or disallow whitespace after the closing brace of blocks.
        // "block-closing-brace-newline-before": Require a newline or disallow whitespace before the closing brace of blocks.
        // "block-closing-brace-space-after": Require a single space or disallow whitespace after the closing brace of blocks.
        // "block-closing-brace-space-before": Require a single space or disallow whitespace before the closing brace of blocks.
        "block-no-empty": true, // Disallow empty blocks.
        // "block-no-single-line": Disallow single-line blocks.
        // "block-opening-brace-newline-after": Require a newline after the opening brace of blocks.
        // "block-opening-brace-newline-before": Require a newline or disallow whitespace before the opening brace of blocks.
        // "block-opening-brace-space-after": Require a single space or disallow whitespace after the opening brace of blocks.
        // "block-opening-brace-space-before": Require a single space or disallow whitespace before the opening brace of blocks.
        // "color-hex-case": Specify lowercase or uppercase for hex colors.
        // "color-hex-length": Specify short or long notation for hex colors.
        // "color-named": Require (where possible) or disallow named colors.
        // "color-no-hex": Disallow hex colors.
        "color-no-invalid-hex": true, // Disallow invalid hex colors.
        // "comment-empty-line-before": Require or disallow an empty line before comments.
        "comment-no-empty": true, // Disallow empty comments.
        "comment-whitespace-inside": "always", // Require or disallow whitespace on the inside of comment markers.
        "font-family-no-duplicate-names": true, // Disallow duplicate font family names.
        // "comment-word-blacklist": Specify a blacklist of disallowed words within comments.
        // "custom-media-pattern": Specify a pattern for custom media query names.
        // "custom-property-empty-line-before": Require or disallow an empty line before custom properties.
        // "custom-property-no-outside-root": Disallow custom properties outside of :root rules.
        // "custom-property-pattern": Specify a pattern for custom properties.
        // "declaration-bang-space-after": Require a single space or disallow whitespace after the bang of declarations.
        // "declaration-bang-space-before": Require a single space or disallow whitespace before the bang of declarations.
        // "declaration-block-no-duplicate-properties": Disallow duplicate properties within declaration blocks.
        // "declaration-block-no-ignored-properties": Disallow property values that are ignored due to another property value in the same rule.
        "declaration-block-no-redundant-longhand-properties": true, // Disallow longhand properties that can be combined into one shorthand property.
        // "declaration-block-no-shorthand-property-overrides": Disallow shorthand properties that override related longhand properties within declaration blocks.
        // "declaration-block-properties-order": Specify the order of properties within declaration blocks.
        // "declaration-block-semicolon-newline-after": Require a newline or disallow whitespace after the semicolons of declaration blocks.
        // "declaration-block-semicolon-newline-before": Require a newline or disallow whitespace before the semicolons of declaration blocks.
        // "declaration-block-semicolon-space-after": Require a single space or disallow whitespace after the semicolons of declaration blocks.
        // "declaration-block-semicolon-space-before": Require a single space or disallow whitespace before the semicolons of declaration blocks.
        // "declaration-block-single-line-max-declarations": Limit the number of declaration within single line declaration blocks.
        // "declaration-block-trailing-semicolon": Require or disallow a trailing semicolon within declaration blocks.
        // "declaration-colon-newline-after": Require a newline or disallow whitespace after the colon of declarations.
        // "declaration-colon-space-after": Require a single space or disallow whitespace after the colon of declarations.
        // "declaration-colon-space-before": Require a single space or disallow whitespace before the colon of declarations.
        // "declaration-empty-line-before": Require or disallow an empty line before declarations.
        // "declaration-no-important": Disallow !important within declarations.
        // "declaration-property-unit-blacklist": Specify a blacklist of disallowed property and unit pairs within declarations.
        // "declaration-property-unit-whitelist": Specify a whitelist of allowed property and unit pairs within declarations.
        // "declaration-property-value-blacklist": Specify a blacklist of disallowed property and value pairs within declarations.
        // "declaration-property-value-whitelist": Specify a whitelist of allowed property and value pairs within declarations.
        // "font-family-name-quotes": Specify whether or not quotation marks should be used around font family names.
        // "font-weight-notation": Require numeric or named (where possible) font-weight values.
        // "function-blacklist": Specify a blacklist of disallowed functions.
        "function-calc-no-unspaced-operator": true, // Disallow an unspaced operator within calc functions.
        // "function-comma-newline-after": Require a newline or disallow whitespace after the commas of functions.
        // "function-comma-newline-before": Require a newline or disallow whitespace before the commas of functions.
        // "function-comma-space-after": Require a single space or disallow whitespace after the commas of functions.
        // "function-comma-space-before": Require a single space or disallow whitespace before the commas of functions.
        "function-linear-gradient-no-nonstandard-direction": true, // Disallow direction values in linear-gradient() calls that are not valid according to the standard syntax.
        // "function-max-empty-lines": Limit the number of adjacent empty lines within functions.
        "function-name-case": "lower", // Specify lowercase or uppercase for function names.
        // "function-parentheses-newline-inside": Require a newline or disallow whitespace on the inside of the parentheses of functions.
        // "function-parentheses-space-inside": Require a single space or disallow whitespace on the inside of the parentheses of functions.
        // "function-url-data-uris": Require or disallow data URIs for urls.
        // "function-url-no-scheme-relative": Disallow scheme-relative urls.
        "function-url-quotes": "always", // Require or disallow quotes for urls.
        // "function-url-scheme-whitelist": Specify a whitelist of allowed url schemes.
        // "function-whitelist": Specify a whitelist of allowed functions.
        "function-whitespace-after": "always", // Require or disallow whitespace after functions.
        "indentation": 4, // Specify indentation.
        // "keyframe-declaration-no-important": Disallow !important within keyframe declarations.
        // "length-zero-no-unit": Disallow units for zero lengths.
        "max-empty-lines": 1, // Limit the number of adjacent empty lines.
        "max-line-length": 160, // Limit the length of a line.
        // "max-nesting-depth": Limit the depth of nesting.
        // "media-feature-colon-space-after": Require a single space or disallow whitespace after the colon in media features.
        // "media-feature-colon-space-before": Require a single space or disallow whitespace before the colon in media features.
        // "media-feature-name-blacklist": Specify a blacklist of disallowed media feature names.
        "media-feature-name-case": "lower", // Specify lowercase or uppercase for media feature names.
        // "media-feature-name-no-unknown": Disallow unknown media feature names.
        // "media-feature-name-no-vendor-prefix": Disallow vendor prefixes for media feature names.
        // "media-feature-name-whitelist": Specify a whitelist of allowed media feature names.
        // "media-feature-no-missing-punctuation": Disallow missing punctuation for non-boolean media features.
        // "media-feature-parentheses-space-inside": Require a single space or disallow whitespace on the inside of the parentheses within media features.
        // "media-feature-range-operator-space-after": Require a single space or disallow whitespace after the range operator in media features.
        // "media-feature-range-operator-space-before": Require a single space or disallow whitespace before the range operator in media features.
        // "media-query-list-comma-newline-after": Require a newline or disallow whitespace after the commas of media query lists.
        // "media-query-list-comma-newline-before": Require a newline or disallow whitespace before the commas of media query lists.
        // "media-query-list-comma-space-after": Require a single space or disallow whitespace after the commas of media query lists.
        // "media-query-list-comma-space-before": Require a single space or disallow whitespace before the commas of media query lists.
        // "no-browser-hacks": Disallow browser hacks that are irrelevant to the browsers you are targeting.
        // "no-descending-specificity": Disallow selectors of lower specificity from coming after overriding selectors of higher specificity.
        "no-duplicate-selectors": true, // Disallow duplicate selectors.
        "no-empty-source": true, // Disallow empty sources.
        // "no-eol-whitespace": Disallow end-of-line whitespace.
        "no-extra-semicolons": true, // Disallow extra semicolons.
        // "no-indistinguishable-colors": Disallow colors that are suspiciously close to being identical.
        // "no-invalid-double-slash-comments": Disallow double-slash comments (//...) which are not supported by CSS.
        "no-missing-end-of-source-newline": true, // Disallow missing end-of-source newlines.
        // "no-unknown-animations": Disallow animation names that do not correspond to a @keyframes declaration.
        // "no-unsupported-browser-features": Disallow features that are unsupported by the browsers that you are targeting.
        // "number-leading-zero": Require or disallow a leading zero for fractional numbers less than 1.
        // "number-max-precision": Limit the number of decimal places allowed in numbers.
        // "number-no-trailing-zeros": Disallow trailing zeros in numbers.
        // "property-blacklist": Specify a blacklist of disallowed properties.
        "property-case": "lower", // Specify lowercase or uppercase for properties.
        "property-no-unknown": true, // Disallow unknown properties.
        // "property-no-vendor-prefix": Disallow vendor prefixes for properties.
        // "property-whitelist": Specify a whitelist of allowed properties.
        // "root-no-standard-properties": Disallow standard properties inside :root rules.
        // "rule-nested-empty-line-before": Require or disallow an empty line before nested rules.
        // "rule-non-nested-empty-line-before": Require or disallow an empty line before non-nested rules.
        "selector-attribute-brackets-space-inside": "never", // Require a single space or disallow whitespace on the inside of the brackets within attribute selectors.
        // "selector-attribute-operator-blacklist": Specify a blacklist of disallowed attribute operators.
        // "selector-attribute-operator-space-after": Require a single space or disallow whitespace after operators within attribute selectors.
        // "selector-attribute-operator-space-before": Require a single space or disallow whitespace before operators within attribute selectors.
        // "selector-attribute-operator-whitelist": Specify a whitelist of allowed attribute operators.
        // "selector-attribute-quotes": Require or disallow quotes for attribute values.
        // "selector-class-pattern": Specify a pattern for class selectors.
        // "selector-combinator-space-after": Require a single space or disallow whitespace after the combinators of selectors.
        // "selector-combinator-space-before": Require a single space or disallow whitespace before the combinators of selectors.
        // "selector-descendant-combinator-no-non-space": Disallow non-space characters for descendant combinators of selectors.
        // "selector-id-pattern": Specify a pattern for id selectors.
        // "selector-list-comma-newline-after": Require a newline or disallow whitespace after the commas of selector lists.
        // "selector-list-comma-newline-before": Require a newline or disallow whitespace before the commas of selector lists.
        // "selector-list-comma-space-after": Require a single space or disallow whitespace after the commas of selector lists.
        // "selector-list-comma-space-before": Require a single space or disallow whitespace before the commas of selector lists.
        // "selector-max-compound-selectors": Limit the number of compound selectors in a selector.
        "selector-max-empty-lines": 0, // Limit the number of adjacent empty lines within selectors.
        // "selector-max-specificity": Limit the specificity of selectors.
        // "selector-nested-pattern": Specify a pattern for the selectors of rules nested within rules.
        // "selector-no-attribute": Disallow attribute selectors.
        // "selector-no-combinator": Disallow combinators in selectors.
        // "selector-no-empty": Disallow empty selectors.
        // "selector-no-id": Disallow id selectors.
        // "selector-no-qualifying-type": Disallow qualifying a selector by type.
        // "selector-no-type": Disallow type selectors.
        // "selector-no-universal": Disallow the universal selector.
        // "selector-no-vendor-prefix": Disallow vendor prefixes for selectors.
        // "selector-pseudo-class-blacklist": Specify a blacklist of disallowed pseudo-class selectors.
        // "selector-pseudo-class-case": Specify lowercase or uppercase for pseudo-class selectors.
        // "selector-pseudo-class-no-unknown": Disallow unknown pseudo-class selectors.
        // "selector-pseudo-class-parentheses-space-inside": Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors.
        // "selector-pseudo-class-whitelist": Specify a whitelist of allowed pseudo-class selectors.
        // "selector-pseudo-element-case": Specify lowercase or uppercase for pseudo-element selectors.
        // "selector-pseudo-element-colon-notation": Specify single or double colon notation for applicable pseudo-elements.
        // "selector-pseudo-element-no-unknown": Disallow unknown pseudo-element selectors.
        // "selector-root-no-composition": Disallow the composition of :root in selectors.
        "selector-type-case": "lower", // Specify lowercase or uppercase for type selector.
        "selector-type-no-unknown": true, // Disallow unknown type selectors.
        // "shorthand-property-no-redundant-values": Disallow redundant values in shorthand properties.
        // "string-no-newline": Disallow (unescaped) newlines in strings.
        "string-quotes": "single", //Specify single or double quotes around strings.
        // "stylelint-disable-reason": Require a reason comment before or after stylelint-disable comments.
        // "time-no-imperceptible": Disallow animation and transition less than or equal to 100ms.
        // "unit-blacklist": Specify a blacklist of disallowed units.
        "unit-case": "lower", // Specify lowercase or uppercase for units.
        "unit-no-unknown": true, // Disallow unknown units.
        // "unit-whitelist": Specify a whitelist of allowed units.
        "value-keyword-case": "lower", // Specify lowercase or uppercase for keywords values.
        // "value-list-comma-newline-after": Require a newline or disallow whitespace after the commas of value lists.
        // "value-list-comma-newline-before": Require a newline or disallow whitespace before the commas of value lists.
        // "value-list-comma-space-after": Require a single space or disallow whitespace after the commas of value lists.
        // "value-list-comma-space-before": Require a single space or disallow whitespace before the commas of value lists.
        // "value-list-max-empty-lines": Limit the number of adjacent empty lines within value lists.
        // "value-no-vendor-prefix": Disallow vendor prefixes for values.
    }
};
