
# Bhoang Web App

This web application displays web dev topics, galleries, an order-simulation form and a contact form. The order form will collect a user's choice of cuisine entree, compare user input with a data file to generate the total cost with a confirmation message. This application was deployed on an AWS EC2 instance and connected to a purchased domain through Route 53.


AWS EC2: https://webapp.bhoang.xyz/

Render: https://bhoang-webapp.onrender.com/

The application was created using Node and Express framework. The Order and Contact pages process data from an HTML form. It utilizes Express routes for GET and POST requests and uses JavaScript functions for client-side data.


## Built with:
Node, Express, Route 53, EC2


## Deployment

To deploy this project on local host, run:

```bash
  npm install
  node index.js
```

To deploy this project on EC2 instance, follow these steps:

1. Sign up for an AWS account, set up an EC2 and launch:
+ Give it a name (e.g. My App)
+ Choose an AMI (e.g. Ubuntu)
+ Pick an Architecture (64-bit x86)
+ Pick t2.micro for instance type (free tier)
+ Create a key pair to login into your instance securely
+ Network setting: allow SSH traffic from anywhere, allow both HTTP and HTTPS traffic
+ Launch instance

2. Connect to your instance via SSH client using your Terminal/Bash or command prompt:
+ Locate your private key file
+ Change permission for the key file (e.g. if you're using Linux then run command chmod 400 "key file")
+ Connect to your instance using its public DNS

3. Update and upgrade your EC2 by running these commands:

```bash
  sudo apt update
  sudo apt upgrade
```
4. Install Node.js in your EC2 instance:

```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
```

5. While still connected to your EC2, clone the Node API from this GitHub (or your GitHub if you created one) repository and install dependencies:
+ Inside your EC2, run:
```bash
  git clone 'https://github.com/hoang0711/Node-Express-app.git' or 'your repo link'
```
+ cd to the API app root folder and install dependencies:
```bash
  npm install
```

6. Manually deploy the Node app:
```bash
  node 'index.js' or 'your cloned folder'
```

7. Configure your EC2's security setting to allow access via the port where your Node app is running:
+ From your AWS console home, go to EC2, go to your launched instance, then click on the instance ID.
+ Go to the Security tab and click on your security group to edit its inbound rules.
+ Add a custom TCP rule, enter your Node app's port number, set 0.0.0.0/0 (anywhere) for CIDR blocks and save.
+ Copy your EC2 instance's public IPv4 address from the Details tab and paste it on the web browser. Enter your Node app's port # to view your app. E.g. if your EC2 address is 5.155.88.50 and your Node app's port is 3055, then enter 5.155.88.50:3055 in your web browser to view your application.

To allow this Node app to be accessed over HTTPS with a new Domain name, follow these steps:
1. Set up a Reverse Proxy by installing Caddy:
- Go to https://caddyserver.com/docs/install, select Debian, Ubuntu, Raspbian packages option, copy the commands and run these on your EC2 instance.
```bash
  sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
  sudo apt update
  sudo apt install caddy
```
- Edit the Caddyfile by changing the reverse_proxy localhost from 8080 to your Node app's port:
```bash
  sudo vim /etc/caddy/Caddyfile

  :80 {
      reverse_proxy localhost:'Node app's port'
  }
```
- Restart caddy:
```bash
  sudo systemctl restart caddy
```

2. Delete the custom TCP rule in your EC2's security group:
- In your AWS console, go back to your EC2 instance's security group to edit the inbound rules.
- Delete the custom TCP rule that you added earlier since the Node app will be accessed via HTTPS over the public internet and the TCP traffic will no longer be needed.

3. Purchase a Domain:
- You can purchase a domain from AWS or a third-party provider like www.namecheap.com for a cheaper price.
- Pick a name for your domain (e.g. banghoang.com)

4. Use AWS Route 53 to create a hosted zone:
- From your AWS console home, search for Route 53 service.
- Select 'Create hosted zone' option.
- Enter your newly bought domain for 'Domain Name' (e.g. banghoang.com)
- Select 'Public hosted zone' option and click Create.
- Look for the NS record and you should see a list of nameservers of your hosted zone.
- You will need these nameservers for step 5.

5. Set up custom DNS for your newly bought domain:
- Navigate to the Name Servers section for your new domain.
- Select the custom DNS option.
- Add a nameserver and enter your new hosted zone's nameservers from step 4, one by one.
- Click 'save'.
- This will point the new purchased domain towards AWS nameserver.
- You may have to wait 24 - 48 hours for all the nameservers to be updated globally.

6. Set up a subdomain:
- Go to your hosted zone, select your newly created domain.
- Select 'Create record' and choose 'Simple routing'.
- Select 'Define simple record':
    - Specify your subdomain name (e.g. 'webapp').
    - Record type = 'A - Routes traffic to an IPv4 address and some AWS resources'.
    - Endpoint = 'IP address or another value, depending on the record type'.
    - Copy your EC2 instance's IPv4 address and paste into the blank box below endpoint.
- Click 'Create record'.

7. Configure Caddy to use HTTPS:
- From your EC2 terminal, edit the Caddyfile to use your domain name instead of port 80 to enable HTTPS:
```bash
  sudo vim /etc/caddy/Caddyfile

  webapp.banghoang.com {
    reverse_proxy localhost:3000
}
```
- Restart caddy:
```bash
  sudo systemctl restart caddy
```

You should now be able to access your Node app publicly via HTTPS by going to your new domain (e.g. https://webapp.banghoang.com).

## Lessons Learned

- How to create a small web application using HTML, CSS, JavaScript and Express framework.
- Installed Node.js to deploy the app on the local host.
- First exposure to AWS cloud technologies.
- How to deploy the app on an AWS EC2 Instance and configure the security group's inbound rules.
- Set up and manage a custom domain through Route 53 DNS.
- How to install and configure a reverse proxy to allow HTTPS access.
