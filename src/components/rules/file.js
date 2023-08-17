module.exports = () => {
  return [
    {
      test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource'
    }
  ];
}
