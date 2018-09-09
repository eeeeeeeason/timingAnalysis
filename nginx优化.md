- 0.js按需加载css分离
- 1.nginx开启gzip
gzip on;
gzip_min_length  5k;
gzip_buffers     4 16k;
#gzip_http_version 1.0;
gzip_comp_level 3;
gzip_types   text/plain application/x-javascript application/javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
gzip_vary on;	
- 2.
