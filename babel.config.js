module.exports = (api) => {
  api.cache(() => process.env.NODE_ENV); // Rebuild Babel if NODE_ENV changes
  api.cache.invalidate(() => process.env.NODE_ENV === 'production'); // Invalidate cache if enviorment changes

  // Use Babel preset for the current node version
  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ];

  const plugins = [];

  return { presets, plugins };
};
