#!/bin/bash

echo "Running script: ${0} in: $( pwd ) using ${ which bash }"

#copy required files to the dist DIR. Assume provided build DIRS are ALL required, only specified root files are included
BUILD_DIRS="routes utils models"
ROOT_FILES="server.js package.json package-lock.json"

#ensure the build dir exists
if [ ! -d /build/]
then
    mkdir /build/ && echo "/build/ created  successfully" 
fi

#TODO: make this recursive for sub directories
for DIR in $BUILD_DIRS
    do
        #check if the DIR is valid
        [!-d $DIR] && echo "WARN - $DIR is not a directory"; continue;

        #loop through each file in the DIR
        FILES =$(ls $DIR)
        for FILE in $FILES
            do  
                cp -r $FILE /build/$DIR/$FILE && echo "Copied $FILE to build/$DIR/$FILE successfully" 
        done 
    
done

# Add additional files from project root 
for RF in $ROOT_FILES
    do
        cp $RF /build/$RF && echo "Copied $RF to build/$RF successfully" 
done


#make tarball
tar -czv app.tar.gz build && echo "tarball file created"
