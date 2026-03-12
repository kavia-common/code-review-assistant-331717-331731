#!/bin/bash
cd /home/kavia/workspace/code-generation/code-review-assistant-331717-331731/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

