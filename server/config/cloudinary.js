const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'cloudalpha', 
    api_key: 117841221371935, 
    api_secret: 'XtjqEvs2yu53ksWsIGA_dnfBaYE'
  });

module.exports = {cloudinary};