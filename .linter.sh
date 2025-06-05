#!/bin/bash
cd /home/kavia/workspace/code-generation/kitchenwise-26221-6bd7fd56/kitchenwise_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

