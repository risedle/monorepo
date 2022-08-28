FROM graphprotocol/graph-node:latest

RUN apt update -y && apt install nginx -y

COPY nginx/default /etc/nginx/sites-available/default
COPY nginx/graphiql /etc/nginx/sites-enabled/graphiql
COPY nginx/admin /etc/nginx/sites-enabled/admin
COPY nginx/metrics /etc/nginx/sites-enabled/metrics
COPY nginx/index_node /etc/nginx/sites-enabled/index_node

EXPOSE 80/tcp

COPY run-node .
CMD ["./run-node"]

