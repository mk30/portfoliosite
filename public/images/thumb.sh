#!/bin/bash
#for file in `find ./full -iname \*.jpg`; do
#  rename '$_=lc' "$file"
#done

i=0; for x in full/*.*;
do mv $x full/`printf '%04d' $i`.jpg;
i=$((i+1));done

for file in `find ./full -iname \*.jpg`; do
  if test \! -f images/large/`basename $file`; then
  convert -resize 25% "$file" "large/`basename $file`"
  fi
  if test \! -f images/thumbs/t_`basename $file`; then
  convert -resize 12% "$file" thumbs/t_"`basename $file`"
  fi
done
