const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias.set('@assets', '@/assets'); // assets klasörü için alias ekliyoruz
  },
});
