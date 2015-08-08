#!/bin/bash

for file in *.[jJ][pP][gG] 
do
  convert -resize 25% "$file" lg_"$file"
done
