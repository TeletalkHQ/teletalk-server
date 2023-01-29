#!/bin/sh

# http://download.redis.io/releases/

VERSION="7.0.0"
INIT_PATH=$(dirname "$0")
TEMP_PATH=$( (cd "$INIT_PATH/../../temp" && pwd))

echo "temp path:::"
echo $TEMP_PATH

cd $TEMP_PATH

rm -rf redis-portable

wget -O redis-$VERSION.tar.gz "http://download.redis.io/releases/redis-$VERSION.tar.gz"
tar xzf redis-$VERSION.tar.gz

cd redis-$VERSION
make
mkdir redis-portable
find src/ -perm /a+x -exec cp {} redis-portable/ \;

cp -r redis-portable $TEMP_PATH

cd $TEMP_PATH

rm -rf redis-$VERSION
rm redis-$VERSION.tar.gz

sudo apt update
sudo apt install tmux -y
tmux new -d "redis-portable/redis-server --loadmodule ../modules/redis/rejson.so"
