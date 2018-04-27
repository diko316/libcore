


.PHONY: help


help:
	@cat docs/help.txt


image:
	@docker-compose down --rmi all && \
		docker-compose build

devel:
	@docker-compose down && \
		docker-compose up server

test:
	@docker-compose down && \
		docker-compose up test

build:
	@docker-compose down && \
		docker-compose up builder
