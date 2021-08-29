rm -rf onehourtutor
git clone https://github.com/manassorn/onehourtutor.git
mkdir onehourtutor/conf
cp *.json onehourtutor/conf/
cp .env onehourtutor/conf/
cd onehourtutor
npm install

pkill -f bin/www
PORT=8080 nohup npm start &