#!/bin/bash

DEST_PATH=src/assets
INPUT_PATH=$DEST_PATH/prebuilt-themes/


echo Building custom theme scss files.

# Get the files
FILES=$(find projects/demo/src/assets/prebuilt-themes -name "*.scss")
# echo $FILES

for FILE in $FILES
do
  # FILENAME=ivy  
  FILENAME=${FILE#$INPUT_PATH}
  echo FILENAME: $FILENAME  
  echo INPUTPATH: $INPUT_PATH

  # Remove .scss extension
  BASENAME=${FILENAME%.scss}
  echo BASENAME: $BASENAME
  echo FILE: $FILE
  echo DEST: $DEST_PATH
  echo DESTPATH AND BASENAME: $DEST_PATH/$BASENAME.css
  echo NPM: $(npm bin)/node-sass
  $(npm bin)/node-sass $FILE > $DEST_PATH/$BASENAME.css
done

echo Finished building CSS.