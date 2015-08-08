#!/bin/bash

for file in `find ./full -iname \*.jpg`; do
  if test \! -f images/lg_`basename $file`; then
  convert -resize 25% "$file" lg_"`basename $file`"
  fi
  if test \! -f images/thumbs/t_`basename $file`; then
  convert -resize 12% "$file" thumbs/t_"`basename $file`"
  fi
done
