# Building Management API

## Setup

```
cp .env.example .env
```

## Start service

```
yarn docker
yarn start:dev
```

## Debug

vscode config:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Local Debug",
      "protocol": "inspector",
      "address": "localhost",
      "port": 9229,
      "localRoot": "${workspaceFolder}",
      "remoteRoot": "${workspaceFolder}"
    }
  ]
}
```

```
yarn start:dev:debug
```
