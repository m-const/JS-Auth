#!/bin/bash

echo "Running script: ${0} in: $( pwd ) using $( which bash )"

#copy required files to the dist DIR. Assume provided build DIRS are ALL required, only specified root files are included
BUILD_DIRS=$(ls | grep 'models\|utils\|routes')
ROOT_FILES="server.js package.json package-lock.json"

#ensure the build dir exists
if [ ! -d build ]
then
    mkdir build/ && echo "build/ DIR created successfully" 
fi
echo "run LS"
ls -ltr

echo "end ls"
#TODO: make this recursive for sub directories
for DIR in $BUILD_DIRS
    do
        #check if the DIR is valid
        [ ! -d $DIR ] && echo "WARN - $DIR is not a directory"; continue;

        #loop through each file in the DIR
        echo "LS $( ls $DIR )"
        FILES=$( ls $DIR )
        for FILE in $FILES
            do  
                cp -r $FILE build/$DIR/$FILE && echo "Copied $FILE to build/$DIR/$FILE successfully" 
        done 
    
done

# Add additional files from project root 
for RF in $ROOT_FILES
    do
        cp $RF build/$RF && echo "Copied $RF to build/$RF successfully" 
done


#make tarball
tar -czf app.tar.gz build && echo "tarball file created"
