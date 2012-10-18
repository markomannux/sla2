#!/bin/sh

if [ -d dist ]
then
  rm -rf dist
fi

mkdir dist

cp public dist/ -r
cp node_modules dist/ -r
cp app.js dist/
