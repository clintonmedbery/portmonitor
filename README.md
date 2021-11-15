# portmonitor
Just a simple tool to monitor ports and log them using zx.
Every 60 seconds this tool will check the ports running, and log them to `portlogs.txt`. If the port number is already log, it will not log it again. 

## Google ZX:
https://github.com/google/zx

## Instructions

Install zx `npm i -g zx`

Run `zx ./portMonitor.mjs`


