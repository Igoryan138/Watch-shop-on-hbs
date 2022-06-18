function randomKey() {
  const simbols = 'ASDFGHJKLQWERTYUIOZXCVBNMzxcvbnmkjhgfdsaqwertyuiop1234567890';
  let key = '';
  for (let i = 0; i < 10; i++) {
    const random = Math.round(Math.random() * simbols.length - 1);
    key += simbols[random];
  }
  return key;
}

module.exports = randomKey;
