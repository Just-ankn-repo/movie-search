/* global fetch */

export default async (text) => {
  const apiKey = 'trnsl.1.1.20200426T205451Z.cdebaef0022405d2.87e68b130e6adc61649a078de0b4a054df782a19';
  const lang = 'ru-en';
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${apiKey}&text=${text}&lang=${lang}`;
  try {
    const response = await fetch(url, { method: 'POST' });
    return await response.json();
  } catch (error) {
    return error;
  }
};
