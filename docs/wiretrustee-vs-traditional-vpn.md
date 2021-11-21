---
id: wiretrustee-vs-traditional-vpn
title: Wiretrustee vs. Traditional VPN
sidebar_position: 3
---

# Wiretrustee vs. Traditional VPN

In the traditional VPN model, everything converges on a centralized, protected network where all the clients are connecting to a central VPN server.

An increasing amount of connections can easily overload the VPN server.
Even a short downtime of a server can cause expensive system disruptions, and a remote team's inability to work.

Centralized VPNs imply all the traffic going through the central server causing network delays and increased traffic usage.

Such systems require an experienced team to set up and maintain.
Configuring firewalls, setting up NATs, SSO integration, and managing access control lists can be a nightmare.

Traditional centralized VPNs are often compared to a [castle-and-moat](https://en.wikipedia.org/wiki/Moat) model
in which once accessed, user is trusted and can access critical infrastructure and resources without any restrictions.

Wiretrustee decentralizes networks using direct point-to-point connections, as opposed to traditional models.
Consequently, network performance is increased since traffic flows directly between the machines bypassing VPN servers or gateways.
To achieve this, Wiretrustee client applications employ signalling servers to find other machines and negotiate connections.
These are similar to the signaling servers used in [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling#the_signaling_server)

Thanks to [NAT traversal techniques](https://en.wikipedia.org/wiki/NAT_traversal),
outlined in the [Why Wireguard with Wiretrustee](/why-wireguard-with-wiretrustee) section,
Wiretrustee installation doesn't require complex network and firewall configuration.
It just works, minimising the maintenance effort.

Finally, each machine or device in the Wiretrustee network verifies incoming connections accepting only the trusted ones.
This is ensured by Wireguard's [Crypto Routing concept](https://www.wireguard.com/#cryptokey-routing).