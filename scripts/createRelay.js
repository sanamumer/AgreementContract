const {RelayClient} = require('defender-relay-client');
const { writeFileSync, appendFileSync } = require('fs');

run = async() => {
    require('dotenv').config();
 
    const {TEAM_API_KEY: apiKey, TEAM_API_SECRET: apiSecret} = process.env;
    const relayClient = new RelayClient({apiKey,apiSecret});
    
    const requestParams = {
        name:'MetaTxRelayer',
        network:'goerli',
        minBalance:BigInt(1e17).toString(),
    };

    const relayer = await relayClient.create(requestParams);
    
    writeFileSync('relay.json',JSON.stringify({relayer},null,2));
    console.log('Relayer ID: ', relayer.relayerId);

    const {apiKey: relayerKey, secretKey: relayerSecret} = await relayClient.createKey(relayer.relayerId);
    appendFileSync('.env', `\nRELAYER_API_KEY=${relayerKey}\nRELAYER_API_SECRET=${relayerSecret}`);

}

run().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
