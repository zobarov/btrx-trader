
# On AWS enable redirecting:

---Enable ip4 forwarding to set to 1:

sudo nano sysctl.conf
---Refresh configs:
sudo sysctl -p /etc/sysctl.conf

[ec2-user@ip-172-31-30-82 etc]$ sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
[ec2-user@ip-172-31-30-82 etc]$ sudo iptables -A INPUT -p tcp -m tcp --sport 80 -j ACCEPT
[ec2-user@ip-172-31-30-82 etc]$ sudo iptables -A OUTPUT -p tcp -m tcp --dport 80 -j ACCEPT

--- Persist IP tables (for Amazon Linux):
sudo service iptables save

---from anywhere your pem is:
ssh -i "btrx-trader-simple-v1.pem" ec2-user@ec2-52-208-30-7.eu-west-1.compute.amazonaws.com



#Used modules:
npm install winston --save
npm install properties-reader --save
npm install node-schedule --save
npm install request --save
npm install nonce --save