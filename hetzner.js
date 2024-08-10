const sbUrl = 'https://www.hetzner.com/_resources/app/jsondata/live_data_sb.json?m=1723329686601';
const maxPrice = 60;

async function getBestValueStorageServer(url) {
  return fetch(url)
  .then((resp) => resp.json())
  .then(({ server: servers = [] }) => {
    const highest = {};
    let highestId = '';
    let highestValue = 0;
    servers.forEach((server) => {
      const { id, serverDiskData, price } = server;
      delete serverDiskData.general;
      if (price > maxPrice) return;
      const totalStorage = Object.values(serverDiskData).reduce((acc, disks) => acc + disks.reduce((sum, num) => sum + num, 0), 0);
      const storageValue = (totalStorage/1000) / price;
      const obj = {
        id,
        price,
        totalStorage,
        storageValue,
        serverDiskData,
      };
      if (storageValue > highestValue) {
        highestValue = storageValue;
        highestId = id;
      };
      highest[id] = obj;
    })
    console.log('highest', highest[highestId]);
  })
}

getBestValueStorageServer(sbUrl);