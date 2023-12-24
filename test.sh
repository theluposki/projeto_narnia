# Obtenha os detalhes da sessão do servidor Socket.IO
SESSION_DETAILS=$(curl -X GET 'http://localhost:3001/socket.io/?transport=webtransport')

# Extraia o ID da sessão
SESSION_ID=$(echo $SESSION_DETAILS | sed -n 's/.*"sid":"\([^"]*\)".*/\1/p')

# Use o websocat para se conectar usando o ID da sessão
websocat "ws://localhost:3001/socket.io/?transport=websocket&EIO=4&sid=$SESSION_ID"
