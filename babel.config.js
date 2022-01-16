module.exports = function (api) {
  api.cache(true);
  if (process.env.ENV === 'prod') {
    console.log(process.env.ENV);
  }
  return {
    presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript'],
    plugins: [
      [
        'inline-dotenv',
        {
          path: './.env', // See motdotla/dotenv for more options
        },
      ],
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.svg', '.png', '.jpg'],
          alias: {
            assets: './src/assets',
            components: './src/components',
            atoms: './src/components/atoms',
            molecules: './src/components/molecules',
            organisms: './src/components/organisms',
            navigations: './src/navigations',
            screens: './src/screens',
            services: './src/services',
            styles: './src/styles',
            hooks: './src/hooks',
            utils: './src/utils',
          },
        },
      ],
    ],
  };
};
