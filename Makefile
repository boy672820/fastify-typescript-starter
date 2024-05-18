.PHONY: build-local
build-local: ## Build the local docker image.
	docker compose -f docker/local/docker-compose.yml build

.PHONY: start-local
start-local: ## Start the local docker container.
	docker compose -f docker/local/docker-compose.yml up -d

.PHONY: stop-local
stop-local: ## Stop the local docker container.
	docker compose -f docker/local/docker-compose.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker/production/docker-compose.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/production/docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/production/docker-compose.yml down