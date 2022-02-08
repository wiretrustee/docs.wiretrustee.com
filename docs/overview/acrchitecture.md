---
sidebar_position: 1
---

# Architecture

### Overview
Wiretrustee is an open source platform consisting of a collection of components, responsible for handling peer-to-peer connections, tunneling, authentication, and network management (IPs, keys, ACLs, etc).

It uses open-source technologies like [WireGuard®](https://www.wireguard.com/), [Pion ICE (WebRTC)](https://github.com/pion/ice), [Coturn](https://github.com/coturn/coturn),
and [software](https://github.com/wiretrustee/wiretrustee) developed by Wiretrustee authors to make secure private networks deployment and management simple.

Wiretrustee relies on four components - **Client** application (or agent), **Management**, **Signal** and **Relay** services.

The combination of these elements ensures that direct point-to-point connections are established and only authenticated users (or machines) have access to the resources for which they are authorized.

A **Peer** is a machine or any device that is connected to the network. 
It can be a Linux server running in the cloud or on-premises, a personal laptop, or even a Raspberry PI.  

<p align="center">
    <img src="/img/architecture/high-level-dia.png" alt="high-level-dia" width="781"/>
</p>

With Wiretrustee clients installed and authorized on the Management service, machines form a mesh network connecting to each other directly via an encrypted point-to-point Wireguard tunnel.

<p align="center">
    <img src="/img/architecture/mesh.png" alt="high-level-dia"/>
</p>

While it is possible to create a full mesh network, it might be not a desirable outcome. In this case, [ACLs](/overview/acls) can be utilized to limit the access to certain machines.

Let's now take a closer look at each of Wiretrustee's components.

### Management Service

The Management service is the central coordination component for Wiretrustee with a UI dashboard.
It keeps the network state, public Wireguard keys of the peers, authenticates and distributes network changes to peers.

The Management Service's responsibilities include:

* **Registering and authenticating new peers.**  Every new machine has to register itself in the network in order to connect to other machines. 
    After installation, Wiretrustee client requires login that can be done through Identity Provider (IDP) or with a [setup key](/overview/setup-keys).
* **Keeping the network map.** The Management service stores information about all the registered peers including Wireguard public key that was sent during the registration process.    
* **Managing private IP addresses.** Each peer receives a unique private IP with which it can be identified in the network. 
  We use [Carrier Grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) address space with an allocated address block <em>100.64.0.0/10</em>.
* **Synchronizing network changes to peers.** The Management Service keeps a control channel open to each peer sending network updates. 
    Whenever a new peer joins the network, all other peers that are authorized to connect to it receive an update. 
    After that, they are able to establish a connection to the new peer.
* **Creating and managing ACLs.** ACL is a list of peers that a given peer has access to. <em>Coming Soon</em>.
* **Managing private DNS.** [DNS](/overview/dns) allows referring to each of the peers with a fully qualified domain name (FQDN). <em>Coming Soon</em>.
* **Monitoring network activity.** <em>Coming Soon</em>.
* **Wireguard key rotation.** <em>Coming Soon</em>.

The Management service runs in the cloud Wiretrustee-managed. It can also be self-hosted.

<p align="center">
    <img src="/img/architecture/management.png" alt="management-dia"/>
</p>

### Client Application

The Wiretrustee Client application (or agent) is a software that is installed on your machines. 
It is an entry point to you private network that makes it possible for machines to communicate with each other.
Once installed and registered, a machine becomes a peer in the network.

The Client's roles are the following:

* **Generating private and public Wireguard keys.** These keys are used for packet encryption between peers and for [Wireguard Cryptokey Routing](https://www.wireguard.com/#cryptokey-routing).
  To accept the incoming connections, peers have to know each other, therefore, the generated public keys have to be pre-shared on the machines. The client application sends its public key to the Management service which then distributes it to the authorized peers.
* **Handling peer registration and authentication.**  Each peer has to be authenticated and registered in the system. The client application requests a user to log in with an Identity Provider (IDP) or a [setup key](/overview/setup-keys) so that the peer can be associated with the organization's account.
* **Receiving network updates from the Management service.**
  Each peer receives initial configuration and a list of peers with corresponding public keys and IP addresses so that it can establish a peer-to-peer connection.
* **Establishing peer-to-peer Wireguard connection.** To establish a connection with a remote peer, the Client first discovers the most suitable connection candidate, or simply address (IP:port) that other peer can use to connect to it. 
  Then sends it to the remote peer via Signal. This message is encrypted with the peer's private key and a public key of the remote peer.
    The remote peer does the same and once the peers can reach each other, they establish an encrypted Wireguard tunnel.

:::important

The **private key**, generated by the Client, **never leaves the machine**, ensuring that only the machine that owns the key can decrypt traffic addressed to it.

:::

### Signal Service

The Signal Service or simply Signal is a lightweight piece of software that helps peers to negotiate direct connections. 
It does not store any data and no traffic passes through it.

The only Signal's responsibility is:
* **Serve as a notification mechanism for peers.** Before a connection can be established, peers need to find each other and exchange the most suitable connection candidates.
  This is done through Signal. After a connection has been established, Signal steps out.

<p align="center">
    <img src="/img/architecture/signal.png" alt="signal-dia"/>
</p>

:::important

**Messages** sent over Signal are **peer-to-peer encrypted**, so Signal can't read them.

:::

Wiretrustee Signal is very similar to the signaling servers used in [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling#the_signaling_server).
It runs in the cloud Wiretrustee-managed and can be self-hosted.

### Relay Service

The Relay service is a [TURN server](https://webrtc.org/getting-started/turn-server) in WebRTC terminology.
In fact, we use an open-source implementation called [Coturn](https://github.com/coturn/coturn).
The purpose of this service is to be a "plan B" and relay traffic between peers in case a peer-to-peer connection isn't possible.

Similarly to the Signal Service, traffic that flows through the Relay can't be decrypted due to the same Wireguard peer-to-peer encryption.

<p align="center">
    <img src="/img/architecture/relay.png" alt="relay-dia"/>
</p>

:::important

Similar to the Signal, traffic that flows through the Relay can't be decrypted due to the **Wireguard peer-to-peer encryption**.

:::

It runs in the cloud or can be self-hosted.

### STUN (NAT Traversal)
