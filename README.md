
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

2. Connect to your instance via SSH client:
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
