#!/bin/bash

CURRENT_UID=$(id -u):$(id -g) docker-compose -f ./server.yaml down --volumes

