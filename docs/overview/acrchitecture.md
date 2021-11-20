---
sidebar_position: 1
---

# Architecture

### Overview
Wiretrustee is an open source platform consisting of a collection of components, responsible for handling peer-to-peer connections, tunneling, authentication, and network management (IPs, keys, ACLs, etc).

It uses open-source technologies like [WireGuard®](https://www.wireguard.com/), [Pion ICE (WebRTC)](https://github.com/pion/ice), [Coturn](https://github.com/coturn/coturn),
and [software](https://github.com/wiretrustee/wiretrustee) developed by Wiretrustee authors to make secure private networks deployment and management simple.

Wiretrustee relies on four components - **Client** (or agent), **Management**, **Signal** and **Relay** services.

The combination of these elements ensures that a direct point-to-point connections are established and only authenticated users (or machines) have access to the resources for which they are authorized.

A **Peer** is a machine or any device that is connected to the network. 
It can be a Linux server running in the cloud or on-premises, a personal laptop, or even your Raspberry PI.  

<p align="center">
    <img src="/img/architecture/high-level-dia.png" alt="high-level-dia" width="781"/>
</p>

With Wiretrustee clients installed and authorized on the Management service, your machines form a mesh network connecting to each other directly via an encrypted point-to-point Wireguard tunnel.

<p align="center">
    <img src="/img/architecture/mesh.png" alt="high-level-dia"/>
</p>

While it is possible to create a full mesh network, it might be not a desirable outcome. In this case, ACLs can be utilized to limit the access to certain machines.

Let's now take a closer look at each of Wiretrustee's components.

### Management Service

The Management service is the central coordination component for Wiretrustee with a UI dashboard.
It keeps the network state, authenticates and distributes network changes to peers.

The Management Service's responsibilities include:

* **Registering and authenticating new peers.**  Every new machine has to register itself in the network in order to connect to other machines. 
    After installation, Wiretrustee client requires login that can be done through Identity Provider (IDP) or with a setup key.
* **Keeping the network map.** The Management service stores information about all the registered peers including Wireguard public key that was sent during the registration process.    
* **Managing private IP addresses.** Each peer receives a unique private IP with which it can be identified in the network. 
  We use [Carrier Grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) address space with an allocated address block <em>100.64.0.0/10</em>.
* **Synchronizing network changes to peers.** The Management Service keeps a control channel open to each peer sending network updates. 
    Whenever a new peer joins the network, all other peers that are authorized to connect to it receive an update. 
    After that they are able to establish a connection to the new peer.
* **Creating and managing ACLs.** ACLs is a list of peers that given peer have access to.  <em>Coming Soon</em>.
* **Managing private DNS.** DNS allows referring to each of the peers with a fully qualified domain name (FQDN). <em>Coming Soon</em>.
* **Monitoring network activity.** <em>Coming Soon</em>.

The Management service runs in the cloud Wiretrustee-managed. It can also be self-hosted.

<p align="center">
    <img src="/img/architecture/management.png" alt="management-dia"/>
</p>

### Client Application

The Wiretrustee Client application (or agent) is a software that is installed on your machines and devices. 
