#!/bin/bash

# deploy commands script

configuration=$1

if [[ "$configuration" == "global" ]]
then
    echo "Monty deploying commands: Global..."
    node ./src/deploy/deploy-commands-global.js
    echo "Monty sucessfully deployed global commands."
elif [[ "$configuration" == "guild" ]]
then
    echo "Monty deploying commands: Guild (Local)..."
    node ./src/deploy/deploy-commands-guild.js
    echo "Monty sucessfully deployed guild (local) commands."
else
    echo "Monty could not find deploy with configuration $configuration..."
fi