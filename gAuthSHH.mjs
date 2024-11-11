import osLogin from '@google-cloud/os-login';
import { generateKeyPairSync } from 'crypto';
import {getConfig } from './gcloud.js'
import fs from 'fs';

const client = new osLogin.OsLoginServiceClient();
const getConfig = getFullConfig();

export const create_ssh_key = async (userId) => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  fs.writeFileSync('/path/to/privateKey.pem', privateKey);
  fs.writeFileSync('/path/to/publicKey.pem', publicKey);

  const [loginProfile] = await client.getLoginProfile({
    name: client.userPath(projectId, userId),
  });

  const sshPublicKeys = loginProfile.sshPublicKeys || {};
  sshPublicKeys['key-id'] = {
    key: publicKey,
    expirationTimeUsec: '2147483647000000',
  };

  await client.updateSshPublicKey({
    name: client.sshPublicKeyNamePath(projectId, userId, 'key-id'),
    sshPublicKey: sshPublicKeys['key-id'],
  });

  return '/path/to/privateKey.pem';
}

async function get_login_profile(userId) {
    const [loginProfile] = await client.getLoginProfile({
      name: client.userPath('[YOUR_PROJECT_ID]', userId),
    });
  
    return loginProfile.posixAccounts[0].username;
  }