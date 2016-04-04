#!/bin/bash
#for file in `find ./full -iname \*.jpg`; do
#  rename '$_=lc' "$file"
#done

#rename all files in folder
##i=0; for x in full/*.*;
##do mv $x full/`printf '%04d' $i`.jpg;
##i=$((i+1));done

#make large version & thumb version
for file in `find ./full -iname \*.png`; do
  if test \! -f large/`basename $file`; then
  convert -resize 800 "$file" large/"`basename $file`"
  fi
  if test \! -f thumbs/t_`basename $file`; then
  convert -resize 400 "$file" thumbs/t_"`basename $file`"
  fi
done
