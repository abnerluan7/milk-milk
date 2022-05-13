module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            Components: './src/components',
            Libs: './src/libs',
            Services: './src/services',
            Types: './src/types',
            Providers: './src/providers',
            Schemas: './src/schemas',
            Screens: './src/screens',
          },
        },
      ],
      'inline-dotenv',
    ],
  };
};
