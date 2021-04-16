#!/bin/bash

echo "Running script: ${0} in: $( pwd ) using $( which bash )"

#copy required files to the dist DIR. Assume provided build DIRS are ALL required, only specified root files are included
BUILD_DIRS="models utils routes"
#$(ls | grep 'models\|utils\|routes')
ROOT_FILES="server.js package.json package-lock.json"

#the directory name we want to put the contents - by default this should be package.
BUILD_DIR_NAME="package"


#ensure the build dir exists
if [ ! -d build ]
then
    mkdir build/ && echo "$BUILD_DIR_NAME/ DIR created successfully" 
fi

echo "BDs: $BUILD_DIRS"


for DIR in $BUILD_DIRS
    do
        #check if the DIR is valid
        if [ ! -d $DIR ] 
        then 
            echo "WARN - $DIR is not a directory"
            continue
        else
            mkdir "$BUILD_DIR_NAME/$DIR" && echo "Created $BUILD_DIR_NAME/$DIR directory successfully " 
        fi

        #loop through each file in the DIR
        FILES=$( ls $DIR )
        for FILE in $FILES
            do  
                cp -r $DIR/$FILE $BUILD_DIR_NAME/$DIR/$FILE && echo "Copied $DIR/$FILE to $BUILD_DIR_NAME/$DIR/$FILE successfully" 
        done 
    
done

# Add additional files from project root 
for RF in $ROOT_FILES
    do
        cp $RF $BUILD_DIR_NAME/$RF && echo "Copied $RF to $BUILD_DIR_NAME/$RF successfully" 
done

