---
sidebar_position: 1
---

# Architecture

Wiretrustee is an open source platform consisting of a collection of components, responsible for handling peer-to-peer connections, tunneling, authentication, and network management (IPs, keys, ACLs, etc).

It uses open-source technologies like [WireGuard®](https://www.wireguard.com/), [Pion ICE (WebRTC)](https://github.com/pion/ice), [Coturn](https://github.com/coturn/coturn),
and [software](https://github.com/wiretrustee/wiretrustee) developed by Wiretrustee authors to make secure private networks deployment and management simple.

Wiretrustee relies on four components - **Clients** (or agents), **Management**, **Signal** and **Relay** services.

The combination of these elements ensures that a direct point-to-point connections are established and only authenticated users (or machines) have access to the resources for which they are authorized.

<p align="center">
    <img src="/img/architecture/high-level-dia.png" alt="high-level-dia" width="781"/>
</p>

With Wiretrustee clients installed and authorized on the Management service, your machines form a mesh network connecting to each other directly via an encrypted point-to-point Wireguard tunnel.

<p align="center">
    <img src="/img/architecture/mesh.png" alt="high-level-dia"/>
</p>

While it is possible to create a full mesh network, it might be not a desirable outcome. In this case, ACLs can be utilized to limit the access to certain machines. 


