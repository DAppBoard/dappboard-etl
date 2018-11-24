module.exports = {
  apps : [{
    name: 'live',
    script: 'live.js',
    autorestart: true,
  },
  {
    name: 'past',
    script: 'past.js',
    autorestart: true,
  },
  {
    name: 'contracts',
    script: 'verifiedContracts.js',
    autorestart: true,
  }],

};
