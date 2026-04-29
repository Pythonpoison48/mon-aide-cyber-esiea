



docker network create reseau-mon-aide-cyber

docker compose up 

Copy-Item -Path ".\.env.local" -Destination "..\mon-aide-cyber-api\.env"

Copy-Item -Path ".\docker-compose.windows.yml" -Destination "..\docker-compose.yml"



