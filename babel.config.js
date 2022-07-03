module.exports = {
    env: {
        test: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current'
                        },
                        modules: 'auto'
                    }
                ],
                '@babel/preset-react',
                '@babel/preset-typescript'
            ]
        },
        test_coverage: {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            node: 'current'
                        },
                        modules: 'auto'
                    }
                ],
                '@babel/preset-react',
                '@babel/preset-typescript'
            ]
        }
    }
}