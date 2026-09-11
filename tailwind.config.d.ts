declare const _default: {
    content: string[];
    theme: {
        extend: {
            colors: {
                'lilac-veil': string;
                'ink-black': string;
                'warm-parchment': string;
                'ivory-mist': string;
                'brand-orange': string;
                'brand-red': string;
                'brand-blue': string;
                'brand-paper': string;
            };
            fontFamily: {
                'good-sans': [string];
                redaction: [string];
            };
            fontSize: {
                caption: [string, {
                    lineHeight: string;
                    letterSpacing: string;
                }];
                body: [string, {
                    lineHeight: string;
                    letterSpacing: string;
                }];
                subheading: [string, {
                    lineHeight: string;
                    letterSpacing: string;
                }];
                heading: [string, {
                    lineHeight: string;
                    letterSpacing: string;
                }];
                display: [string, {
                    lineHeight: string;
                    letterSpacing: string;
                }];
            };
            spacing: {
                5: string;
                10: string;
                15: string;
                20: string;
                30: string;
                60: string;
                80: string;
            };
            maxWidth: {
                page: string;
            };
            borderRadius: {
                card: string;
                badge: string;
                image: string;
                button: string;
            };
        };
    };
    plugins: any[];
};
export default _default;
