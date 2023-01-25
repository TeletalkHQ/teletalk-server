sudo apt update

sudo apt install lsb-release -y

curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

sudo apt-get update
sudo apt-get install redis -y

sudo systemctl stop redis-server.service
sudo mkdir /etc/redis/modules
sudo cp ./modules/redis/rejson.so /etc/redis/modules
sudo tee -a /etc/redis/redis.conf >/dev/null <<EOT
loadmodule /etc/redis/modules/rejson.so
EOT
sudo systemctl start redis-server.service
