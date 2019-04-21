FROM blog

COPY ./MiniServer/lumen5.5 /usr/local/nginx/html/mini.itellyou.site/
COPY ./MiniServer/etc/nginx/conf.d/mini.itellyou.site.conf /etc/nginx/conf.d/mini.itellyou.site.conf

RUN chmod 777 -R /usr/local/nginx/html/mini.itellyou.site/storage

EXPOSE 80
CMD ["/usr/bin/supervisord"]
 
