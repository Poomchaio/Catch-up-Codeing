const randomImage = () => {
  const index = parseInt(Math.random() * 9) + 1;
  return 'https://assets.skooldio.com/icon/face0' + index.toString() + '_b.svg';
};
const imgSrc = randomImage();
export default imgSrc;
