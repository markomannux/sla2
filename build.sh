#!/bin/sh

if [ -d dist ]
then
  rm -rf dist
fi

mkdir dist

cp img dist/ -r
cp blueprint dist/ -r
cp lib dist/ -r
cp index.html dist/
cp metadata.json dist/
