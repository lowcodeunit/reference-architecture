#!/bin/bash

DEST_PATH=src/assets
INPUT_PATH=$DEST_PATH/theming/custom-themes/


echo Building custom theme scss files.

# Get the files
FILES=$(find src/assets/theming/custom-themes -name "*.scss")

for FILE in $FILES
do
  FILENAME=${FILE#$INPUT_PATH}
  BASENAME=${FILENAME%.scss}
  $(npm bin)/node-sass $FILE > $DEST_PATH/$BASENAME.css
done

echo Finished building CSS.