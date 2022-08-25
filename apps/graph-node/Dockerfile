FROM graphprotocol/graph-node:v0.27.0

RUN apt update && apt install socat -y

COPY run-node .
CMD ["./run-node"]

