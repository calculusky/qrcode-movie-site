const getQrcodeFromServer = () => {
  const serverUrl = 'https://wombat-tie.cyclic.app';

  fetch(`${serverUrl}/qrcodes`)
    .then((resObj) => resObj.json())
    .then((resData) => {
      if (resData) {
        document.getElementById(
          'qrcode',
        ).innerHTML = `<img src="${resData.data}"/>`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
setInterval(getQrcodeFromServer, 10000);
