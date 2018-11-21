module.exports = {
  apps : [{
    name: 'live',
    script: 'live.js',
    autorestart: true,
    watch       : true,
  },
  {
    name: 'past',
    script: 'past.js',
    autorestart: true,
    watch       : true,
  }],

};
