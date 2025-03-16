s:
	docker compose down server
	docker compose up server -d
w:
	docker compose down website
	docker compose up website -d
pw:
	docker compose -f docker-compose.prod.yml down
	npx nx build website --skip-nx-cache
	docker compose -f docker-compose.prod.yml up -d
