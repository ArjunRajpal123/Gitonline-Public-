// import { createInstance, getInstance, deleteInstance } from '@/app/utils/gcloud.mjs';

// import { readFileSync } from 'fs';
// import readline from 'readline';

// import { Client } from 'ssh2';

// // const createDeleteInstance = async (instanceName) => {
// //     const createResponse = await createInstance(instanceName);
// //     console.log(createResponse);
// //     const getResponse = await getInstance(instanceName);
// //     console.log(getResponse);
// //     const deleteResponse = await deleteInstance(instanceName);
// //     console.log(deleteResponse);
// // };

// // const sshTest = () => {
// //     const conn = new Client();
// //     const rl = readline.createInterface({
// //         input: process.stdin,
// //         output: process.stdout
// //     });

// //     conn.on('ready', () => {
// //         console.log('Client :: ready');
// //         conn.shell((err, stream) => {
// //             if (err) { throw err; }
// //             stream.on('close', () => {
// //                 console.log('Stream :: close');
// //                 conn.end();
// //                 rl.close();
// //             }).on('data', (data) => {
// //                 console.log('OUTPUT: ' + data);
// //             });

// //             rl.on('line', (input) => {
// //                 stream.write(input + '\n');
// //             });
// //         });
// //     }).connect({
// //         host: '104.197.76.20',
// //         username: 'arjunrajpal1234',
// //         privateKey: readFileSync('/home/node/.ssh/gcloud')
// //     });
// // };

// const main = async () => {
//     // const instanceName = "test-instance";
//     // const createResponse = await createInstance(instanceName);
//     // await createDeleteInstance("test-instance");

//     // console.log(createResponse)
//     // const privateToken = "-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEAqzpo3wOLVC0Fgqp7mhpa0clw//4CcU6O8vtZKK3Irdoxtzv2dk4o5iMkJ1KunTC+gT1DHaSYS6T8UbXPfSQEtERWw6655AWqvaHpTCUL3RyI3pTsO3Gp2vuINSyYjLVSa1xOZlWdZYy/JHM5Xo2Dt1Zpt0XJ4OCGVa19Iu/8+fxQH8C/7COxZY9Dqm/jzs0DJ16ArgO9aS6ecL0wlGOde/yEs5T+aJX7W4wJX8kZSItE+uj3R2JzhhN4I6jpH9BOTjGgCcCch7bysFGMIkjdRkk9wprPHQNyR9Ain1tXzop3SxzS+RDs9W2M1K6RPT2Cy7V1vyRg6hBwvh093WWitwIDAQABAoIBAQCPAtTuVxZ6srOkg+GCPzrVdwsDNFMz8aohNV8tQ6CV2+SkJtfdzcAJHxamJT+kGD800EcLLhrpKx523IQ0/+1R5rYU8A1gbn9BrUaei16SSa/jP7zilTeJp4YG631qIFN7SfhNLnqsg1ZuCjLDTyzQ5sKbCRXo1X49dw5KLOk8nGpZX5XFDJirHjTbpZ13h7Hvk21htL6h3uq3Kap16OxZaVKVBc5Q8yR1DPJkiJ16jMeV1QL16npcSq4x4c5/moV4/ucKqgJRcN8w4b1Tp6lUej+NKNcYfKY6HiD/NUssvSyYH6yjREds6gtMbKk2FZj/txuGzVzAbaA2R3m1QRlRAoGBAOF44449IrVwnomTtU3tuYW2cJzu9tS7g9W+g/v72An77dm/lC5OCFTmRsZbxCzkBMoO0m2lQK3df2vw0+EN1b7NG83lOy0SIEvo/V35JUyBtfrVJr4MWHtc9ojcZI0bzJPWgM2Ao8pKYgdVESBMQMvl1RODlFmftY+uJlfl6uGZAoGBAMJpXOyrDNY5jk0scQf7KJN1cNawD3JmsUSiSGNyS7A5Z54ylUU88faekgktxRyRmaQNgtiyYwXm0FJGVblpe8+wDvDi0dxgtboBraOm9QtajAfiZAJ3iaNhJ8sYwrU7JZjv2XVXpW///B6SUXKhg2nqIJeFlHR1uOL/wXgndfjPAoGBAMIMO7PH8945vYfkAs69wMROXp8Bnpc5ht3nKEou1iDJnEuh8NLlP5Bp2xGOGskTuPd5SCsrZP39ulNYodF4CbQ7bCmIlqRUjE0oiR5edXZh0A+/cKdxkpkhSeBB5Zv4B9pYauPySYSo/bMXyDSGy+FvvTEdNgjoRecRV1igvMRJAoGAC3KO0TTFPbwH4A103mZwnjY1Hb8iObdISuVPY+OwB0FqE4ug9IHBMadmq/mw+JyuMlXFVaMzZ36O17lihNdsPe99AbwpZVOgf8JnihJjrXZ4dmJjRy3oweEPqcrcdDV2YkoFQP6XNEAbhWVSPHC8PzlVD/cCpdTkvSEYME4KiUsCgYBKI3cweX/iL2t2qhCzxCa143eUrNom/lrDtszd6JDFeUPYipvSJyC+ttZpydq3xvflOKgG3gjELAIFfDKl5wHv3txE8lwXxMRvSnZ79AARc85PMlzqiZ90Ko31iu3dsjWT8LwtyQToxn9guvDV10idcMn2cM5LiC+fCHfWKBx+4Q==-----END RSA PRIVATE KEY-----"
//     // let privateKey = Buffer.from(privateToken, 'utf-8');
//     // let ssh = new NodeSSH()

//     // sshTest()
// };

// await main();

// // Path: test_scripts/test_vpc.js
